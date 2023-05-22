import Head from "next/head";
import Content from "@/components/Content";

export default function About() {
    return (
        <>
            <Head>
                <title>About</title>
            </Head>
            <Content>
                <div className={"flex min-h-screen flex-col items-center justify-center"}>
                    <div className={"max-w-lg text-center"}>
                        <h2 className={"text-5xl font-bold"}>Hi, We are GoTrade !!!</h2>
                        <p className={"pt-14 text-lg"}>
                            Our team is committed to building a secure, low-fee, flexible platform that helps players
                            trade with ease.
                        </p>
                        <p className={"pt-4 text-lg"}>
                            The platform uses virtual currencies for trading and users need to connect to their own meta
                            mask wallets before trading through the platform.
                        </p>
                        <p className={"pt-10 text-xl font-bold"}>Development Team:</p>
                        <div className={"space-y-2 pt-5"}>
                            <p>Xinyu Lin</p>
                            <p>Ziyi Liu</p>
                            <p>Haotian Xia</p>
                            <p>Yu Bai</p>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
