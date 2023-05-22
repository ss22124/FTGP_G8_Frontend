import Head from "next/head";
import Content from "@/components/Content";
import GoodsItemGrid from "@/components/GoodsItemGrid";
import { GOODS_ITEMS } from "@/utils/items";

export default function Home() {
    return (
        <>
            <Head>
                <title>GoTrade</title>
            </Head>
            <Content>
                <div className={"flex justify-center"}>
                    <GoodsItemGrid data={GOODS_ITEMS} />
                </div>
            </Content>
        </>
    );
}
