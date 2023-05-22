import { DealsInfo } from "@/api/data";
import { ethers } from "ethers";
import { MdPerson, MdPersonOutline } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { findGoodsItem } from "@/utils/items";
import Image from "next/image";
import Link from "next/link";

export default function DealsInfoCard(props: { data: DealsInfo }) {
    const goodsItem = findGoodsItem(props.data.item);
    const goodsItemUrl = {
        pathname: "/detail",
        query: { item: props.data.item },
    };

    if (goodsItem) {
        return (
            <div className={"flex w-full items-center justify-between rounded-xl p-4 shadow"}>
                <div className={"flex flex-grow items-center justify-between space-x-8"}>
                    <Link href={goodsItemUrl} className={"h-auto w-1/5 p-2"}>
                        <Image
                            className="h-full w-full object-cover object-center"
                            src={goodsItem.cover}
                            alt={"Cover"}
                            width={100}
                            height={100}
                            priority={true}
                        />
                    </Link>
                    <div className={"flex-grow space-y-2"}>
                        <Link href={goodsItemUrl}>
                            <div className={"py-2 text-xl font-bold"}>Item: {goodsItem.name}</div>
                        </Link>
                        <div className={"flex items-center gap-2"}>
                            <MdPersonOutline size={24} />
                            <p>Seller: {props.data.seller}</p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <MdPerson size={24} />
                            <p>Buyer: {props.data.buyer}</p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <FaEthereum size={24} />
                            <p>Price: {ethers.formatEther(props.data.price)} ETH</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
