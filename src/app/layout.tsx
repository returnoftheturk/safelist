import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { GiFeatheredWing } from "react-icons/gi";

export const metadata: Metadata = {
  title: "OFAC Screener",
  description: "Screen customers against OFAC",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="relative top-0 w-full bg-[#2e026d] px-8 py-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <GiFeatheredWing className="text-2xl" />
              <a href="/" className="text-4xl font-semibold">
                bree
              </a>
            </div>
            <div className="text-lg">
              The quickest way to screen customers against OFAC
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
