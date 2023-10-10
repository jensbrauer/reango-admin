import React, { Component } from "react";
import client from '../interceptor/axios';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductModal from "./modal";

export default class Page2 extends Component {

    state = { details: [], }

    componentDidMount() {
        let data;
        client.get('/createproduct/').then(res => {
            data = res.data;
            this.setState({
                details: data
            })
        }).catch(err => {})
    }
    render() {
        return (
            <Row xs={1} md={2} lg={3} className="g-4">
                {this.state.details.map((products, id) => (
                    <Col key={id}>
                    <Card>
                        <Card.Img variant="top" src={products.product_img} />
                        <Card.Body>
                            <Card.Title>
                                {products.name}
                            </Card.Title>
                            <Card.Text>
                                {products.brand}
                                <ProductModal name={products.name} slug={products.slug}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        )
    }
}
