import { getEthersProvider } from "@/api/metamask";
import { Platform__factory } from "@/api/types";

const CONTRACT_ADDRESS = "0xf11c8FEa7C7E21856333aE39dd8d2625b1ff2C57";

export async function connectPlatformContract() {
    const provider = await getEthersProvider();
    if (provider) {
        return Platform__factory.connect(CONTRACT_ADDRESS, await provider.getSigner());
    } else {
        return null;
    }
}
