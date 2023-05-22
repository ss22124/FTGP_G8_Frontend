import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MetaMaskContextProvider } from "@/contexts/MetaMaskContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MetaMaskContextProvider>
            <Component {...pageProps} />
        </MetaMaskContextProvider>
    );
}
