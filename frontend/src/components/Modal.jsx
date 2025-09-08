import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const Modal = ({ children, visible, setVisible, btnTxt, title, size, position }) => {
  return (
    <CModal
      backdrop="static"
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="StaticBackdropExampleLabel"
      alignment={position}
      // scrollable
      size={size}
    >
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {children}
      </CModalBody>
      {/* <CModalFooter className='border-0'>
        <CButton color="danger" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary">{btnTxt}</CButton>
      </CModalFooter> */}
    </CModal>
  );
};

export default Modal;
