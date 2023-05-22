import Head from "next/head";
import Content from "@/components/Content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { findGoodsItem } from "@/utils/items";
import Image from "next/image";
import { GoodsItem, UploadGoods } from "@/api/data";
import UploadGoodsCard from "@/components/UploadGoodsCard";
import { useMetaMask } from "@/contexts/MetaMaskContext";
import { connectPlatformContract } from "@/api/api";

export default function Detail() {
    const metaMask = useMetaMask();
    const router = useRouter();
    const [goodsItem, setGoodsItem] = useState<GoodsItem>();
    const [uploadGoods, setUploadGoods] = useState<UploadGoods[]>();

    useEffect(() => {
        if (metaMask.isConnected && router.isReady) {
            const goodsItem = findGoodsItem(router.query.item as string);
            const asyncFunction = async () => {
                const contract = await connectPlatformContract();
                if (contract && goodsItem) {
                    setGoodsItem(goodsItem);
                    const allProducts = await contract.getGoodsByItem(goodsItem.item);
                    const uploadGoods: UploadGoods[] = allProducts.map((i) => {
                        return {
                            seller: i.Seller,
                            item: i.item,
                            price: i.price,
                            id: i.id,
                            enableAction: true,
                        };
                    });
                    setUploadGoods(uploadGoods);
                }
            };
            asyncFunction().catch(console.log);
        }
    }, [metaMask.isConnected, router]);

    const onBuyGoods = async (goods: UploadGoods) => {
        const contract = await connectPlatformContract();
        if (contract) {
            const tx = await contract.Buy(goods.id, { value: goods.price });
            await tx.wait();
        }
    };

    return (
        <>
            <Head>
                <title>Goods</title>
            </Head>
            <Content>
                <div className={"flex flex-col items-center justify-center p-6"}>
                    {goodsItem ? (
                        <>
                            <div className={"flex items-center justify-center gap-20"}>
                                <figure className={"w-2/5"}>
                                    <Image
                                        src={goodsItem.cover}
                                        alt={"Cover"}
                                        width={200}
                                        height={200}
                                        priority={true}
                                    />
                                </figure>
                                <div className={"flex flex-grow flex-col"}>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {goodsItem.name}
                                    </h5>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    <div className={"mx-8 my-8 h-0.5 w-full bg-gray-300"} />
                    {uploadGoods ? (
                        <div className={"gird grid-col-1 mx-8 w-full space-y-4"}>
                            {uploadGoods.map((data, i) => (
                                <UploadGoodsCard
                                    key={i}
                                    data={data}
                                    showCover={false}
                                    actionLabel={"Buy"}
                                    onAction={onBuyGoods}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={"py-20 text-xl text-gray-600"}>No data</div>
                    )}
                </div>
            </Content>
        </>
    );
}
