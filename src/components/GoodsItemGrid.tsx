import GoodsItemCard from "@/components/GoodsItemCard";
import { GoodsItem } from "@/api/data";

export default function GoodsItemGrid(props: { data: GoodsItem[] }) {
    return (
        <div className={"m-4 grid w-full max-w-7xl grid-cols-4 gap-6"}>
            {props.data.map((data, i) => (
                <GoodsItemCard key={i} data={data} />
            ))}
        </div>
    );
}
