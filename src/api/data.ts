import { StaticImageData } from "next/image";

export type GoodsItem = {
    name: string;
    item: string;
    cover: StaticImageData;
};

export type UploadGoods = {
    seller: string;
    item: string;
    price: bigint;
    id: string;
    enableAction: boolean;
};

export type DealsInfo = {
    buyer: string;
    seller: string;
    item: string;
    price: bigint;
    id: string;
};

export type WaitingListGoods = {
    buyer: string;
    seller: string;
    item: string;
    price: bigint;
    id: string;
};
