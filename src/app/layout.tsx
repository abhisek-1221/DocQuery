import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/components/themeprovider";
import { ActiveThemeProvider } from "@/components/dashboard/active-theme";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Thritfwise",
  description: "Ecommerce Web Search SaaS Engine",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : ""
        )}
      >
        <ClerkProvider>
          <Providers>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            {children}
          </ActiveThemeProvider>
        </ThemeProvider>
        </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
