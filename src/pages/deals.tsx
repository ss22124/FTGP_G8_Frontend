import Head from "next/head";
import Content from "@/components/Content";
import { DealsInfo } from "@/api/data";
import { useEffect, useState } from "react";
import { useMetaMask } from "@/contexts/MetaMaskContext";
import DealsInfoCard from "@/components/DealsInfoCard";
import { connectPlatformContract } from "@/api/api";

export default function Deals() {
    const metaMask = useMetaMask();
    const [dealsInfo, setDealsInfo] = useState<DealsInfo[]>();

    useEffect(() => {
        if (metaMask.isConnected) {
            const asyncFunction = async () => {
                const contract = await connectPlatformContract();
                if (contract) {
                    const userDeals = await contract.getUserDeals();
                    const dealsInfo: DealsInfo[] = userDeals.map((i) => {
                        return {
                            buyer: i.Buyer,
                            seller: i.Seller,
                            item: i.item,
                            price: i.price,
                            id: i.id,
                        };
                    });
                    setDealsInfo(dealsInfo);
                }
            };
            asyncFunction().catch(console.log);
        }
    }, [metaMask.isConnected]);

    return (
        <>
            <Head>
                <title>Deals</title>
            </Head>
            <Content>
                <div className={"flex flex-col items-center justify-center p-6"}>
                    <h1 className={"w-full items-start py-4 text-4xl font-bold"}>All deals</h1>
                    {dealsInfo ? (
                        <div className={"gird grid-col-1 mx-8 mt-2 w-full space-y-4"}>
                            {dealsInfo.map((data, i) => (
                                <DealsInfoCard key={i} data={data} />
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
