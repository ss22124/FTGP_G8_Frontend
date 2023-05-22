import detectEthereumProvider from "@metamask/detect-provider";
import { Eip1193Provider, ethers } from "ethers";

export async function getEthersProvider() {
    const metaMaskProvider = await detectEthereumProvider<Eip1193Provider>({
        silent: true,
    });
    if (metaMaskProvider) {
        return new ethers.BrowserProvider(metaMaskProvider);
    } else {
        return null;
    }
}
