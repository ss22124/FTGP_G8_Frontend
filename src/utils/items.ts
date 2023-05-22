import { GoodsItem } from "@/api/data";
import GoodsCover from "@/assets/images/goods.png";
import Dragon_Lore from "@/assets/images/Dragon_Lore.png";
import Eye_of_Horus from "@/assets/images/Eye_of_Horus.png";
import Gold_Arabesque from "@/assets/images/Gold_Arabesque.png";
import Gungnir from "@/assets/images/Gungnir.png";
import Howl from "@/assets/images/Howl.png";
import Hedge_Maze from "@/assets/images/Hedge_Maze.png";
import Karambit_Emerald from "@/assets/images/Karambit_Emerald.png";
import Karambit_Sapphire from "@/assets/images/Karambit_Sapphire.png";
import Vice from "@/assets/images/Vice.png";
import Wild_Lotus from "@/assets/images/Wild_Lotus.png";

export const GOODS_ITEMS: GoodsItem[] = [
    {
        name: "Dragon Lore",
        item: "dragon_lore",
        cover: Dragon_Lore,
    },
    {
        name: "Eye of Horus",
        item: "eye_of_horus",
        cover: Eye_of_Horus,
    },
    {
        name: "Gold Arabesque",
        item: "gold_arabesque",
        cover: Gold_Arabesque,
    },
    {
        name: "Gungnir",
        item: "gungnir",
        cover: Gungnir,
    },
    {
        name: "Hedge Maze",
        item: "hedge_maze",
        cover: Hedge_Maze,
    },
    {
        name: "Howl",
        item: "Howl",
        cover: Howl,
    },
    {
        name: "Karambit Emerald",
        item: "Karambit_Emerald",
        cover: Karambit_Emerald,
    },
    {
        name: "Karambit Sapphire",
        item: "Karambit_Sapphire",
        cover: Karambit_Sapphire,
    },
    {
        name: "Vice",
        item: "Vice",
        cover: Vice,
    },
    {
        name: "Wild Lotus",
        item: "Wild_Lotus",
        cover: Wild_Lotus,
    },
];

export function findGoodsItem(item: string | undefined) {
    if (item !== undefined) return GOODS_ITEMS.find((i) => i.item === item);
}
