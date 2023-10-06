import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../interceptor/axios';

function ProductModal(props) {
  const { slug } = props;
  const { name } = props
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    // Make an API call when the modal is shown
    fetchProductDetails();
  };
  useEffect(() => {
    // You can put any initialization code here that runs when the component mounts
  }, []);
  const fetchProductDetails = async () => {
    try {
      console.log(slug)
      const response = await axios.get(`http://localhost:8000/createproduct/?slug=${slug}`);
      const data = response.data;
      setProductData(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {productData ? (
            <div>
              <p>Name: {productData.name}</p>
              {/* Add more product details here */}
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </Modal.Body>
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

export default ProductModal;