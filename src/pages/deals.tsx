import Head from "next/head";
import Content from "@/components/Content";
import { DealsInfo } from "@/api/data";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useMetaMask } from "@/contexts/MetaMaskContext";
import DealsInfoCard from "@/components/DealsInfoCard";
import { connectPlatformContract } from "@/api/api";
import { MsgDialog } from "@/components/MsgDialog";

// const TEST_DEALS_INFO: DealsInfo[] = [
//     {
//         buyer: "Buyer 1",
//         seller: "Seller 1",
//         item: "item_1",
//         price: ethers.parseEther("10"),
//     },
//     {
//         buyer: "Buyer 2",
//         seller: "Seller 2",
//         item: "item_1",
//         price: ethers.parseEther("20"),
//     },
//     {
//         buyer: "Buyer 3",
//         seller: "Seller 3",
//         item: "item_2",
//         price: ethers.parseEther("30"),
//     },
//     {
//         buyer: "Buyer 4",
//         seller: "Seller 4",
//         item: "item_3",
//         price: ethers.parseEther("40"),
//     },
// ];

export default function Deals() {
    const metaMask = useMetaMask();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [confirmId, setConfirmId] = useState<string>();
    const [dealsInfo, setDealsInfo] = useState<DealsInfo[]>();

    useEffect(() => {
        if (metaMask.isConnected) {
            // const asyncFunction = async () => {
            //     const contract = await connectPlatformContract();
            //     if (contract) {
            //         const userDeals = await contract.getUserDeals();
            //         const dealsInfo: DealsInfo[] = userDeals.map((i) => {
            //             return {
            //                 buyer: i.Buyer,
            //                 seller: i.Seller,
            //                 item: i.item,
            //                 price: i.price,
            //             };
            //         });
            //         setDealsInfo(dealsInfo);
            //     }
            // };
            // asyncFunction().catch(console.log);
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
                        };
                    });
                    setDealsInfo(dealsInfo);
                }
            };
            asyncFunction().catch(console.log);

            // setDealsInfo(TEST_DEALS_INFO);
        }
    }, [metaMask.isConnected]);

    const onConfirm = async (choice: boolean) => {
        if (confirmId) {
            const contract = await connectPlatformContract();
            if (contract) {
                const tx = await contract.confirmation(choice, confirmId);
                await tx.wait();
            }
        }
    };

    return (
        <>
            <Head>
                <title>Deals</title>
            </Head>
            <MsgDialog
                show={showConfirmDialog}
                msg={"Have you received the goods and confirmed that they are correct?"}
                onAction={onConfirm}
                onClose={() => setShowConfirmDialog(false)}
            />
            <Content>
                <div className={"flex flex-col items-center justify-center p-6"}>
                    <h1 className={"w-full items-start py-4 text-4xl font-bold"}>All deals</h1>
                    {dealsInfo ? (
                        <div className={"gird grid-col-1 mx-8 mt-2 w-full space-y-4"}>
                            {dealsInfo.map((data, i) => (
                                <DealsInfoCard
                                    key={i}
                                    data={data}
                                    actionLabel={"Confirm"}
                                    onAction={() => {
                                        // Use id
                                        setConfirmId(data.item);
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
