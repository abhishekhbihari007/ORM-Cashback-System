import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SocialSidebar } from "@/components/layout/social-sidebar";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimationProvider } from "@/contexts/AnimationContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Cashback ORM Platform",
  description:
    "Unified brand, user, and admin dashboards to scale compliant marketplace reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} bg-white text-slate-900`}>
        <QueryProvider>
          <AuthProvider>
            <AnimationProvider>
              <SocialSidebar />
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
            </AnimationProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
