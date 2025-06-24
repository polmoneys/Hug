import { RequireAtLeastOne } from '../../Hug/interfaces';

type ModalProps = RequireAtLeastOne<{
    content?: React.ReactNode;
    render?: () => React.ReactNode;
}> & { isOpen: boolean; onClose: () => void };

export default function Modal({
    content,
    render,
    isOpen,
    onClose,
}: ModalProps) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-body">{render ? render() : content}</div>
        </div>
    );
}
