import { GoodsItem } from "@/api/data";
import Image from "next/image";
import Link from "next/link";

export default function GoodsItemCard(props: { data: GoodsItem }) {
    const goodsItemUrl = {
        pathname: "/detail",
        query: { item: props.data.item },
    };

    return (
        <div className="w-full">
            <div className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
                <Link href={goodsItemUrl}>
                    <figure className={"h-40 w-full p-2"}>
                        <Image
                            className="h-full w-full rounded-t-lg object-contain object-center"
                            src={props.data.cover}
                            alt={"Cover"}
                            width={100}
                            height={100}
                            priority={true}
                        />
                    </figure>
                </Link>
                <div className="p-5">
                    <Link href={goodsItemUrl}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {props.data.name}
                        </h5>
                    </Link>
                </div>
            </div>
        </div>
    );
}
