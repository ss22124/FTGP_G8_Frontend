import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { getEthersProvider } from "@/api/metamask";
import { JsonRpcSigner } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

interface WalletState {
    signer: JsonRpcSigner;
    chainId: bigint;
}

interface MetaMaskContextData {
    wallet: WalletState | null;
    isConnected: boolean;
    isConnecting: boolean;
    hasMetaMask: boolean | null;
    connectMetaMask: () => void;
}

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export function MetaMaskContextProvider(props: PropsWithChildren<{ onConnectFailed?: () => void }>) {
    const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [wallet, setWallet] = useState<WalletState | null>(null);

    const _updateWallet = useCallback(async (providedSigners?: JsonRpcSigner[]) => {
        try {
            const provider = await getEthersProvider();
            if (provider) {
                let signers = providedSigners;
                if (!signers || signers.length === 0) {
                    signers = await provider.listAccounts();
                }
                if (signers && signers.length !== 0) {
                    const chainId = await provider.getNetwork().then((n) => n.chainId);
                    setIsConnected(true);
                    setWallet({ signer: signers[0], chainId });
                } else {
                    setIsConnected(false);
                    setWallet(null);
                }
            } else {
                setIsConnected(false);
                setWallet(null);
            }
        } catch (_) {
            // Ignore
        }
    }, []);

    const updateWalletAndAccounts = useCallback(() => _updateWallet(undefined), [_updateWallet]);
    const updateWallet = useCallback((signer: JsonRpcSigner[]) => _updateWallet(signer), [_updateWallet]);

    useEffect(() => {
        (async () => {
            const provider = await detectEthereumProvider();
            setHasMetaMask(provider !== null);
            if (provider) {
                setIsConnecting(true);
                await updateWalletAndAccounts();
                try {
                    await provider.on("accountsChanged", updateWallet);
                    await provider.on("chainChanged", updateWalletAndAccounts);
                } catch (_) {
                    // Ignore
                } finally {
                    setIsConnecting(false);
                }
            }
        })().catch(() => {
            setWallet(null);
        });

        return () => {
            (async () => {
                const provider = await detectEthereumProvider();
                if (provider) {
                    await provider.removeListener("accountsChanged", updateWallet);
                    await provider.removeListener("chainChanged", updateWalletAndAccounts);
                }
            })().catch(() => {
                // Ignore
            });
        };
    }, [updateWallet, updateWalletAndAccounts]);

    const connectMetaMask = async () => {
        const provider = await getEthersProvider();
        if (provider) {
            setIsConnecting(true);
            try {
                const signer = (await provider.getSigner()) as unknown;
                if (Array.isArray(signer)) {
                    await updateWallet(signer as Array<JsonRpcSigner>);
                } else {
                    await updateWallet([signer as JsonRpcSigner]);
                }
            } catch (_) {
                props.onConnectFailed?.();
            } finally {
                setIsConnecting(false);
            }
        } else {
            props.onConnectFailed?.();
        }
    };

    const data: MetaMaskContextData = {
        wallet,
        isConnected,
        isConnecting,
        hasMetaMask,
        connectMetaMask,
    };

    return <MetaMaskContext.Provider value={data}>{props.children}</MetaMaskContext.Provider>;
}

export function useMetaMask() {
    const context = useContext(MetaMaskContext);
    if (context === undefined) {
        throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"');
    }
    return context;
}
