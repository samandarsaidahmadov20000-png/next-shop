"use client";

import React, { useEffect, useRef, useState } from "react";
import { conversations } from "@/services/conversations.service";

import {
  useQueryClient,
  useQuery,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import { io } from "socket.io-client";

function Message() {
  const socketRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const [messageId, setMessageId] = useState<string | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("useEffect запустился");
    const token = localStorage.getItem("token");
    console.log("токен:", token);
    socketRef.current = io("https://shop-api-ks6p.onrender.com", {
      auth: { token },
    });

    socketRef.current.on("connect", () => {
      console.log("✅ ПОДКЛЮЧЁН!", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("❌ ОШИБКА:", err.message);
    });

    socketRef.current.on("receiveMessage", (message: any) => {
      queryClient.setQueryData(
        ["message", message.conversationId],
        (old: any) => ({
          message: [...(old?.message || []), message],
        }),
      );
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [queryClient]);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["conversation"],
    queryFn: conversations.conversationsGet,
  });

  const { data: messagesData } = useQuery({
    queryKey: ["message", messageId],
    queryFn: () => conversations.getUsersDialog(messageId),
    enabled: !!messageId,
  });

  function sendMessage(text: string) {
    if (socketRef.current && messageId) {
      socketRef.current.emit("sendMessage", { text, userId: messageId });
    }
  }

  return (
    <div className="flex h-[calc(100vh-72px-4rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex w-72 shrink-0 flex-col gap-3 border-r border-border bg-card">
        <div className="shrink-0 border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">Чаты</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Диалоги с покупателями
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 pb-3">
          {data?.conversations?.map((item) => (
            <button
              key={item._id}
              onClick={() => {
                setMessageId(item._id);
                socketRef.current.emit("joinConversation", item._id);
              }}
              className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                messageId === item._id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase ${
                  messageId === item._id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item?.email?.charAt(0)}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {item?.email}
                </span>
                <span
                  className={`block truncate text-xs ${
                    messageId === item._id
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  Открыть диалог
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            #
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              Диалог
            </p>
            <p className="text-xs text-muted-foreground">
              Выберите чат слева, чтобы прочитать сообщения
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-6 py-6">
          {messagesData?.message?.map((item: any) => (
            <div
              key={item._id}
              className={`flex w-full ${
                item.isFromAdmin ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`w-fit max-w-[70%] break-words rounded-2xl border border-border bg-card px-4 py-2.5 text-sm leading-relaxed text-foreground shadow-sm ${
                  item.isFromAdmin ? "rounded-br-md" : "rounded-bl-md"
                }`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-border bg-card px-6 py-4">
          <div className="flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2 focus-within:ring-2 focus-within:ring-ring/40">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Напишите сообщение…"
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
              type="button"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
