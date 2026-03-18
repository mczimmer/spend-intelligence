import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import Shell from "@/components/Shell";
import { initPostHog, posthog } from "@/lib/posthog";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initPostHog();

    const handleRouteChange = () => {
      posthog.capture("$pageview");
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Spend Intelligence — M{"\u00e6"}rsk {"\u00d7"} Valtech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Shell>
        <Component {...pageProps} />
      </Shell>
      <Analytics />
    </>
  );
}
