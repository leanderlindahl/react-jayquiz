import React from 'react';

const Modal = props => {
  const { handleClose, show, children } = this.props;
  {show ? (
  return (
    
    
    <div>
      <section className="modal-main">
        Modal
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  )
  ) : null}
};

export default Modal;
