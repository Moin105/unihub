import React from "react";
import './modal.css'
function Modal(props) {
  return (
    <div className='overlay'>
      <div className="modal">{props.message}</div>
    </div>
  );
}

export default Modal;