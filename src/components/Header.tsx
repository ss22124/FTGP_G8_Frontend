import { useMetaMask } from "@/contexts/MetaMaskContext";
import { Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdOutlineReceiptLong, MdOutlineSell } from "react-icons/md";

export default function Header() {
    const metaMask = useMetaMask();
    const router = useRouter();

    return (
        <Navbar fluid={true} rounded={true} className={"shadow"}>
            <Navbar.Brand as={Link} href={"/"}>
                <span className="whitespace-nowrap text-xl">GoTrade</span>
            </Navbar.Brand>
            <div className="flex items-center justify-center gap-4 md:order-2">
                {metaMask.isConnected ? (
                    <Dropdown label={<FaUserCircle size={20} />} arrowIcon={false} dismissOnClick={false}>
                        <Dropdown.Item
                            icon={() => <MdOutlineSell size={18} />}
                            onClick={async () => router.push("/sell")}
                            className={"gap-2"}
                        >
                            Sell
                        </Dropdown.Item>
                        <Dropdown.Item
                            icon={() => <MdOutlineReceiptLong size={18} />}
                            onClick={async () => router.push("/deals")}
                            className={"gap-2"}
                        >
                            Deals
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Button onClick={metaMask.connectMetaMask}>Connect Wallet</Button>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link as={Link} href={"/"}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} href="/about">
                    About
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
