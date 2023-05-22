import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function MsgDialog(props: {
    show: boolean;
    msg: string;
    onAction: (choice: boolean) => void;
    onClose: () => void;
}) {
    return (
        <Modal show={props.show} size="md" popup={true} onClose={props.onClose}>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                    <h3 className=" mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{props.msg}</h3>
                    <div className=" flex items-center justify-center gap-4">
                        <Button className={"w-20"} color="failure" onClick={() => props.onAction(true)}>
                            Yes
                        </Button>
                        <Button className={"w-20"} onClick={() => props.onAction(false)}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
