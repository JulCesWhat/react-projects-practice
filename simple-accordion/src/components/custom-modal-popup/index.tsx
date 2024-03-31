import { useState } from "react";
import "./styles.css";

interface ICustomModalProps {
  id?: string;
  header?: string;
  content?: JSX.Element;
  footer?: string;
  onClose?: () => void;
}

const CustomModal = ({
  id,
  header,
  content,
  footer,
  onClose,
}: ICustomModalProps) => {
  return (
    <div id={id || "modal"} className="modal">
      <div className="modal-content">
        <div className="header">
          <span className="close-modal-icon" onClick={onClose}>
            &times;
          </span>
          <h2>{header ? header : "Header"}</h2>
        </div>
        <div className="body">
          {content ? (
            content
          ) : (
            <div>
              <p>This is our modal content. :)</p>
            </div>
          )}
        </div>
        <div className="footer">{footer ? footer : <h2>Footer</h2>}</div>
      </div>
    </div>
  );
};

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOnClick = () => {
    setShowModal((state) => !state);
  };
  const handleOnClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <button onClick={handleOnClick}>Open Modal</button>
      {showModal && <CustomModal onClose={handleOnClose} />}
    </div>
  );
};
export default Modal;
