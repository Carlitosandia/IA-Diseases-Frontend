import Styles from "../styles/Modal.module.css";

const Modal = ({ children, isOpen, onClose }) => {
    console.log(children);
    if (!isOpen) {
        return null;
    }

    return (
        <div className={Styles.modal}>
            <div className={Styles.modalcontent}>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
