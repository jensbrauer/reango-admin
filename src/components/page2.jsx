import React, { Component } from "react";
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class Page2 extends Component {

    state = { details: [], }

    componentDidMount() {
        let data;
        axios.get('https://reango-48565de87753.herokuapp.com/createproduct/').then(res => {
            data = res.data;
            this.setState({
                details: data
            })
        }).catch(err => {})
    }
    render() {
        return (
            <Row xs={1} md={2} className="g-4">
                {this.state.details.map((products, id) => (
                    <Col key={id}>
                    <Card>
                        <Card.Body>
                        <Card.Title>{products.name}</Card.Title>
                        <Card.Text>
                            {products.brand}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        )
    }
}
