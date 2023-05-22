import { getEthersProvider } from "@/api/metamask";
import { Platform__factory } from "@/api/types";

const CONTRACT_ADDRESS = "0x5992372f81E77213Ed6fd55CE43c0E0B897B9905";

export async function connectPlatformContract() {
    const provider = await getEthersProvider();
    if (provider) {
        return Platform__factory.connect(CONTRACT_ADDRESS, await provider.getSigner());
    } else {
        return null;
    }
}
