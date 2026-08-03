import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title: "Rubiolo Book Studio",
    description: "De una captura CAD a una historia que vende. Prototipo conceptual para crear books comerciales personalizados.",
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: "Rubiolo Book Studio",
      description: "De una captura CAD a una historia que vende.",
      type: "website",
      locale: "es_AR",
      images: [{ url: ogImage, width: 1792, height: 1024, alt: "Rubiolo Book Studio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rubiolo Book Studio",
      description: "De una captura CAD a una historia que vende.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
