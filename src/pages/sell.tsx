import Head from "next/head";
import Content from "@/components/Content";
import { UploadGoods } from "@/api/data";
import { ethers } from "ethers";
import { useMetaMask } from "@/contexts/MetaMaskContext";
import { useEffect, useState } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import UploadGoodsCard from "@/components/UploadGoodsCard";
import { GOODS_ITEMS } from "@/utils/items";
import { FaEthereum } from "react-icons/fa";
import { connectPlatformContract } from "@/api/api";
import { useRouter } from "next/router";

export default function Sell() {
    const metaMask = useMetaMask();
    const router = useRouter();
    const [inputSellItem, setInputSellItem] = useState(GOODS_ITEMS[0].item);
    const [inputSellPrice, setInputSellPrice] = useState("");
    const [uploadGoods, setUploadGoods] = useState<UploadGoods[]>();

    useEffect(() => {
        if (metaMask.isConnected) {
            const asyncFunction = async () => {
                const contract = await connectPlatformContract();
                if (contract) {
                    const userGoods = await contract.getUserSellings();
                    const uploadGoods: UploadGoods[] = await Promise.all(
                        userGoods.map(async (i) => {
                            return {
                                seller: i.Seller,
                                item: i.item,
                                price: i.price,
                                id: i.id,
                                enableAction: await contract.get_whether_can_be_cancelled(i.id),
                            };
                        })
                    );
                    setUploadGoods(uploadGoods);
                }
            };
            asyncFunction().catch(console.log);
        }
    }, [metaMask.isConnected]);

    const onSell = async () => {
        const contract = await connectPlatformContract();
        if (contract) {
            const tx = await contract.record(inputSellItem, ethers.parseEther(inputSellPrice));
            const receipt = await tx.wait();
            if (receipt?.status === 1) {
                router.reload();
            } else {
                alert("Sell failed!");
            }
        }
    };

    const onCancel = async (data: UploadGoods) => {
        const contract = await connectPlatformContract();
        if (contract) {
            await contract.cancel(data.id);
        }
    };

    return (
        <>
            <Head>
                <title>Sell</title>
            </Head>
            <Content>
                <div className={"flex w-full flex-col items-center justify-center p-6"}>
                    <div className="flex w-full flex-col gap-4">
                        <h1 className={"py-4 text-4xl font-bold"}>Sell</h1>
                        <Label htmlFor="sellGoodsItem">Choose one item</Label>
                        <Select
                            id="sellGoodsItem"
                            required={true}
                            defaultValue={inputSellItem}
                            onChange={(e) => setInputSellItem(e.target.value)}
                        >
                            {GOODS_ITEMS.map((item, i) => (
                                <option key={i} value={item.item}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                        <Label htmlFor="sellGoodsPrice">Price</Label>
                        <TextInput
                            type="number"
                            id="sellGoodsPrice"
                            placeholder="Enter price"
                            required={true}
                            addon={<p className={"font-bold"}>Ethers</p>}
                            icon={() => <FaEthereum />}
                            onChange={(e) => setInputSellPrice(e.target.value)}
                        />
                        <Button type="submit" className={"mt-6"} onClick={onSell}>
                            Sell
                        </Button>
                    </div>
                    <div className={"mx-8 my-8 h-0.5 w-full bg-gray-300"} />
                    <h1 className={"w-full items-start py-4 text-4xl font-bold"}>History</h1>
                    <div className={"flex w-full flex-col items-center justify-center p-6"}>
                        {uploadGoods ? (
                            <div className={"gird grid-col-1 mx-8 w-full space-y-4"}>
                                {uploadGoods.map((data, i) => (
                                    <UploadGoodsCard
                                        key={i}
                                        data={data}
                                        showCover={true}
                                        actionLabel={"Cancel"}
                                        onAction={onCancel}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={"py-20 text-xl text-gray-600"}>No data</div>
                        )}
                    </div>
                </div>
            </Content>
        </>
    );
}
