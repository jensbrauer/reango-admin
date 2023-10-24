
import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function GenderFilter(props) {
  return <div>
    <button onClick={() => props.returnFunction(0)}>Male</button>
    <button onClick={() => props.returnFunction(1)}>FEMALE</button>
    <button onClick={() => props.returnFunction(2)}>Unisex</button>
    </div>;
}

function BrandFilter(props) {
  return <div>
  <button onClick={() => props.returnFunction(0)}>Other</button>
  <button onClick={() => props.returnFunction(1)}>Nike</button>
  <button onClick={() => props.returnFunction(2)}>Adidas</button>
  <button onClick={() => props.returnFunction(3)}>GUCCI</button>
  </div>;
}

function PrizeFilter(props) {
    const [formData, setFormData] = useState({ prize_min: 0, prize_max: 10000 });
    const handleSubmit = (e) => {
      e.preventDefault();
      props.returnFunction(formData)
      console.log("Form data submitted:", formData);
    };
  
    // Function to update form data when inputs change
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <Form onSubmit={handleSubmit}> {/* Attach the onSubmit event */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrizeMin">
          <Form.Label column sm="2">
            Lowest Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="prize_min"
              type="prize_min"
              value={formData.prize_min}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrizeMax">
          <Form.Label column sm="2">
            Highest Prize
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="prize_max"
              type="prize_max"
              value={formData.prize_max}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
  
        <button type="submit" className="btn btn-primary">
          Set Prize Range
        </button>
      </Form>
    );}

export { GenderFilter, BrandFilter, PrizeFilter };

