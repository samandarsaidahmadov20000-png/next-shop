import { Mail } from "lucide-react";

function Footer() {
  return (
    <footer>
      {/* Newsletter card — top half sits on white, bottom half on the grey footer */}
      <div className="bg-[linear-gradient(#ffffff_0_50%,#F0F0F0_50%_100%)]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-8 rounded-[20px] bg-black px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,551px)_349px] lg:items-center lg:justify-between lg:px-16 lg:py-11">
            <h2 className="font-display text-[28px] uppercase leading-[1.1] tracking-tight text-white sm:text-[32px] lg:text-[40px]">
              Stay upto date about our latest offers
            </h2>

            <div className="w-full lg:max-w-[349px] lg:justify-self-end">
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-black/40"
                  strokeWidth={2}
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-full bg-white pr-4 pl-12 text-sm text-black outline-none placeholder:text-black/40"
                />
              </div>

              <button
                type="button"
                className="mt-3 h-12 w-full cursor-pointer rounded-full bg-white text-sm font-medium text-black transition hover:bg-white/90"
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-[#F0F0F0]">
        <div className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 lg:pt-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 lg:grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,1fr))] lg:gap-x-8">
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <a
                href="/"
                className="font-display text-[26px] uppercase leading-none tracking-tight text-black lg:text-[33px]"
              >
                Shop.co
              </a>

              <p className="mt-5 max-w-[248px] text-sm leading-relaxed text-black/60">
                We have clothes that suits your style and which you&apos;re
                proud to wear. From women to men.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  aria-label="Twitter"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:bg-black hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
                  </svg>
                </a>

                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-black bg-black text-white transition hover:opacity-80"
                >
                  <svg
                    viewBox="0 0 320 512"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M80 299.3V512h116V299.3h86.5l18-97.8H196v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4.4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8h66z" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:bg-black hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                  </svg>
                </a>

                <a
                  href="https://github.com"
                  aria-label="GitHub"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:bg-black hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>

            <nav>
              <h3 className="text-sm font-medium tracking-[0.18em] text-black uppercase lg:text-base">
                Company
              </h3>
              <ul className="mt-5 space-y-3 lg:mt-6 lg:space-y-4">
                <li>
                  <a
                    href="/about"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/features"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/works"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Works
                  </a>
                </li>
                <li>
                  <a
                    href="/career"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Career
                  </a>
                </li>
              </ul>
            </nav>

            <nav>
              <h3 className="text-sm font-medium tracking-[0.18em] text-black uppercase lg:text-base">
                Help
              </h3>
              <ul className="mt-5 space-y-3 lg:mt-6 lg:space-y-4">
                <li>
                  <a
                    href="/support"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Customer Support
                  </a>
                </li>
                <li>
                  <a
                    href="/delivery"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>

            <nav>
              <h3 className="text-sm font-medium tracking-[0.18em] text-black uppercase lg:text-base">
                Faq
              </h3>
              <ul className="mt-5 space-y-3 lg:mt-6 lg:space-y-4">
                <li>
                  <a
                    href="/account"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href="/deliveries"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a
                    href="/orders"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/payments"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Payments
                  </a>
                </li>
              </ul>
            </nav>

            <nav>
              <h3 className="text-sm font-medium tracking-[0.18em] text-black uppercase lg:text-base">
                Resources
              </h3>
              <ul className="mt-5 space-y-3 lg:mt-6 lg:space-y-4">
                <li>
                  <a
                    href="/ebooks"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a
                    href="/tutorial"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/playlist"
                    className="text-sm text-black/60 transition hover:text-black"
                  >
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col gap-5 border-t border-black/10 py-5 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
            <p className="text-xs text-black/60 lg:text-sm">
              Shop.co © 2000-2023, All Rights Reserved
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex h-[30px] w-[46px] items-center justify-center rounded-[5px] border border-black/10 bg-white">
                <span className="font-serif text-[13px] font-bold text-[#1A1F71] italic">
                  VISA
                </span>
              </span>

              <span className="flex h-[30px] w-[46px] items-center justify-center rounded-[5px] border border-black/10 bg-white">
                <span className="flex items-center">
                  <span className="h-4 w-4 rounded-full bg-[#EB001B]" />
                  <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#F79E1B] mix-blend-multiply" />
                </span>
              </span>

              <span className="flex h-[30px] w-[46px] items-center justify-center rounded-[5px] border border-black/10 bg-white">
                <span className="text-[11px] font-bold italic">
                  <span className="text-[#253B80]">Pay</span>
                  <span className="text-[#179BD7]">Pal</span>
                </span>
              </span>

              <span className="flex h-[30px] w-[46px] items-center justify-center gap-0.5 rounded-[5px] border border-black/10 bg-white">
                <svg
                  viewBox="0 0 384 512"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-3 w-3 text-black"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <span className="text-[10px] font-medium text-black">Pay</span>
              </span>

              <span className="flex h-[30px] w-[46px] items-center justify-center gap-0.5 rounded-[5px] border border-black/10 bg-white">
                <span className="text-[11px] font-bold">
                  <span className="text-[#4285F4]">G</span>
                </span>
                <span className="text-[10px] font-medium text-black/70">
                  Pay
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
