import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";
import { getSettings } from "@/sanity/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const name = settings?.name ?? "Portfolio";

  return {
    title: {
      default: settings?.role ? `${name} — ${settings.role}` : name,
      template: `%s — ${name}`,
    },
    description: settings?.bio,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      {/* Browser extensions (Grammarly et al.) inject attributes on <body>,
          which React otherwise reports as a hydration mismatch. */}
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
