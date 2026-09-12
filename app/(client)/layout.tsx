import Footer from "./components/footer";
import Header from "./components/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
