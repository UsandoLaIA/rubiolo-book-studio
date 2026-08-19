import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `https://usandolaia.github.io${basePath}/`;
const ogImage = `${siteUrl}og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rubiolo Book Studio",
  description: "De una captura CAD a una historia que vende. Prototipo conceptual para crear books comerciales personalizados.",
  icons: { icon: `${basePath}/favicon.svg` },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
