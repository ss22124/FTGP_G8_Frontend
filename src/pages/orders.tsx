import Head from "next/head";
import Content from "@/components/Content";
import { useEffect, useState } from "react";
import { useMetaMask } from "@/contexts/MetaMaskContext";
import { MsgDialog } from "@/components/MsgDialog";
import { connectPlatformContract } from "@/api/api";
import { WaitingListGoods } from "@/api/data";
import OrderDealsGoodsCard from "@/components/OrderDealsGoodsCard";

export default function Orders() {
    const metaMask = useMetaMask();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [confirmId, setConfirmId] = useState<string>();
    const [waitingListGoods, setWaitingListGoods] = useState<WaitingListGoods[]>();

    useEffect(() => {
        if (metaMask.isConnected) {
            const asyncFunction = async () => {
                const contract = await connectPlatformContract();
                if (contract) {
                    const waitingListGoods = await contract.getwaitinglist();
                    const waitingGoods: WaitingListGoods[] = await Promise.all(
                        waitingListGoods.map(async (i) => {
                            return {
                                buyer: i.buyer,
                                seller: i.seller,
                                item: i.item,
                                price: i.price,
                                id: i.id,
                            };
                        })
                    );
                    setWaitingListGoods(waitingGoods);
                }
            };
            asyncFunction().catch(console.log);
        }
    }, [metaMask.isConnected]);

    const onConfirm = async (choice: boolean) => {
        const contract = await connectPlatformContract();
        if (contract && confirmId) {
            const tx = await contract.confirmation(choice, confirmId);
            await tx.wait();
            setShowConfirmDialog(false);
        }
    };

    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <MsgDialog
                show={showConfirmDialog}
                msg={"Have you received the goods and confirmed that they are correct?"}
                onAction={onConfirm}
                onClose={() => setShowConfirmDialog(false)}
            />
            <Content>
                <div className={"flex flex-col items-center justify-center p-6"}>
                    <h1 className={"w-full items-start py-4 text-4xl font-bold"}>All waiting orders</h1>
                    {waitingListGoods ? (
                        <div className={"gird grid-col-1 mx-8 mt-2 w-full space-y-4"}>
                            {waitingListGoods.map((data, i) => (
                                <OrderDealsGoodsCard
                                    key={i}
                                    data={data}
                                    actionLabel="Confirm"
                                    onAction={() => {
                                        setConfirmId(data.id);
                                        setShowConfirmDialog(true);
                                    }}
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
