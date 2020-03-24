import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';


const Modal = ({ children }) => {
  const elRef = useRef(null); // refer to the same thing

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  // useEffect - returning a function = clean up function
  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current); // appending this div to have all the children

    return () => modalRoot.removeChild(elRef.current); // will only run this function when the modal closes
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;