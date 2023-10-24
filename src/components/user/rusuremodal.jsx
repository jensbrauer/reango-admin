import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubmitProduct } from './submitproduct';

function RUSureModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    SubmitProduct(props.product)
    };
  const handleShow = () => setShow(true);
    //console.log(props.formdata)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.product.name}{props.product.description}{props.product.product_img.name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RUSureModal;
