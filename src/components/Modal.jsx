import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "50%"
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

export const Modal = ({ show = false, onHide = ()=>{}, closeButton = true, children }) => {

  return (
    <div>
      <ReactModal
        isOpen={show}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onHide}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {
          closeButton && 
          <div className='flex justify-end'>
            <div className="h-6 w-6 bg-slate-500 text-white flex justify-center items-center rounded-full cursor-pointer" onClick={onHide}>
              <div style={{ marginTop: -4, marginLeft: -1 }}>x</div>
            </div>
          </div>
        }
        {children}
      </ReactModal>
    </div>
  );
}