import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { ThemeProvider } from 'next-themes';
import { ContextProvider } from "@context/ContextProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ContextProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <SessionProvider session={session}>
          <SkeletonTheme baseColor="#ced4da" highlightColor="#fff">
            <Component {...pageProps} />
          </SkeletonTheme>
        </SessionProvider>
      </ThemeProvider>
    </ContextProvider>
  );
};

export default trpc.withTRPC(MyApp);
