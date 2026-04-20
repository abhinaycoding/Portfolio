import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Abhinay — Funky Product Engineer",
  description: "Product Engineer building high-energy, performant systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#050505] text-white antialiased font-['Nunito',sans-serif]">
        <SmoothScroll>
          <div className="fixed inset-0 pointer-events-none z-[60] noise-overlay opacity-30" />
          <Sidebar />
          <div className="relative z-10 md:pr-28 lg:pr-32">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
