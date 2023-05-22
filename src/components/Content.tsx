import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Content(props: PropsWithChildren) {
    return (
        <main className={inter.className}>
            <Header />
            <div className={"container mx-auto min-h-screen overflow-auto"}>{props.children}</div>
        </main>
    );
}
