// https://react.dev/reference/react/useImperativeHandle
// useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.

import React, { useState, useRef, useImperativeHandle } from "react";

function Modal({ open, onClose }, ref) {
  const closeRef = useRef();
  const confirmRef = useRef();
  const denyRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      closeBtn: closeRef.current,
      confirmBtn: confirmRef.current,
      denyBtn: denyRef.current
    };
  });

  if (!open) return null;

  return (
    <div className="modal">
      <button className="button" ref={closeRef} onClick={onClose}>
        &times;
      </button>
      <h1>Title</h1>
      <div>
        <button className="button" ref={confirmRef}>Confirm</button>
        <button className="button" ref={denyRef}>Deny</button>
      </div>
    </div>
  );
}

const CustomModal = React.forwardRef(Modal);

export default function UseImperativeHandle() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <button onClick={() => modalRef.current.closeBtn.focus()}>
        Focus Close Btn
      </button>
      <button onClick={() => modalRef.current.confirmBtn.focus()}>
        Focus Confirm Btn
      </button>
      <button onClick={() => modalRef.current.denyBtn.focus()}>
        Focus Deny Btn
      </button>
      <CustomModal ref={modalRef} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
