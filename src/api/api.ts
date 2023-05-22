import { getEthersProvider } from "@/api/metamask";
import { Platform__factory } from "@/api/types";

const CONTRACT_ADDRESS = "0x8bBc5f9028ccD19dEC472475307d038E04B14c55";

export async function connectPlatformContract() {
    const provider = await getEthersProvider();
    if (provider) {
        return Platform__factory.connect(CONTRACT_ADDRESS, await provider.getSigner());
    } else {
        return null;
    }
}
