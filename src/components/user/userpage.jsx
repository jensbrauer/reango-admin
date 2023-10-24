// Import the react JS packages
import {useEffect, useState} from "react";
import client from '../../interceptor/axios';
import { SubmitProduct } from "./submitproduct";
import RUSureModal from './rusuremodal'
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ProductModal from "../shop/productmodal";
import productplaceholder from "../../static/images/productplaceholder.png"
import Ratio from 'react-bootstrap/Ratio';


// Define the Login function.
export const UserPage = () => {
     const [items, setItems] = useState('');
     //console.log(items)

    console.log('Request being made:');
    console.log('URL: /you/');
    console.log('Headers:', {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
    console.log('withCredentials: true');

     useEffect(() => {
        /* console.log(localStorage.getItem('access_token'))
        console.log(localStorage.getItem('refresh_token')) */
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/reango-frontend/login'
        }
        else{
         (async () => {
           try {
             const {data} = await client.get(   
                            'you/', {
                             headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                             },
                             withCredentials: true
                           }
                           );
             setItems(data);
             //const products = data
             /* console.log('RETRY REQUEST')
             console.log(`Bearer ${localStorage.getItem('access_token')}`) */
          } catch (e) {
            console.log('not auth')
            console.log(e)
          }
         })()};
     }, []);

     const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        condition: '',
        size: '',
        gender: '',
        category: '',
        product_img: '',
    });

    const handleChange = (e) => {
        /* console.log(e.target) */
        const { name, value } = e.target;
        /* console.log(name)
        console.log(value) */
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData)
    };

/*     const handleFormSubmit = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }; */
    const [imgPreview, setImgPreview] = useState(productplaceholder)

    function handleImageChange(event) {
        //const imagePreview = document.getElementById('imagePreview');
        const imageInput = document.getElementById('imageInput');
        
        if (imageInput.files && imageInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            setImgPreview(e.target.result);
          };
          
          reader.readAsDataURL(imageInput.files[0]);
          
            setFormData({
                ...formData,
                product_img: imageInput.files[0],
            });
        } else {
          setImgPreview(productplaceholder) // Clear the preview if no file is selected
        }
      }

     return (
        <div>
            

            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h4>Upload new product</h4></Accordion.Header>
                    <Accordion.Body>
                        <Ratio className="prod-img-upload" key={'4x3'} aspectRatio={'4x3'}>
                            <div className="prodimg_upload" style={{ backgroundImage: `url(${imgPreview})` }} />
                        </Ratio>
                        <Form>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" id="imageInput" onChange={handleImageChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} placeholder="Mannen" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}/>
                        </Form.Group>
                        <Form.Select aria-label="Brand" name="brand" onChange={handleChange}>
                            <option>Brand</option>
                            <option value="0">Nike</option>
                            <option value="1">Adidas</option>
                            <option value="2">GUCCI</option>
                        </Form.Select>
                        <Form.Select aria-label="Brand" name="gender" onChange={handleChange}>
                            <option>Gender</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                            <option value="2">Unisex</option>
                        </Form.Select>
                        <Form.Select aria-label="Brand" name="condition" onChange={handleChange}>
                            <option>Condition</option>
                            <option value="0">Worn</option>
                            <option value="1">Torn</option>
                            <option value="2">SCHMORN</option>
                        </Form.Select>
                        <Form.Select aria-label="Brand" name="size" onChange={handleChange}>
                            <option>Size</option>
                            <option value="0">S</option>
                            <option value="1">M</option>
                            <option value="2">L</option>
                        </Form.Select>
                        <Form.Select aria-label="Brand" name="category" onChange={handleChange}>
                            <option>Category</option>
                            <option value="0">Trousers</option>
                            <option value="1">Tops</option>
                            <option value="2">Hats</option>
                        </Form.Select>
                        </Form>
                <RUSureModal product={formData}/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header><h4>My Stuff</h4></Accordion.Header>
                    <Accordion.Body>
        <Row xs={1} md={2} lg={3} className="g-4">
        {items ? (
            items.map((item, id) => (
                <Col key={id}>
                <Card>
                    <Card.Img variant="top" src={item.product_img} />
                    <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        {item.brand}
                        <ProductModal name={item.name} slug={item.slug} />
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))
            ) : (
            <div>Loading</div>
            )}
        </Row>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header><h4>Liked Stuff</h4></Accordion.Header>
                    <Accordion.Body>
                        <p>Henlo fwend</p>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header><h4>Shoppingcart</h4></Accordion.Header>
                    <Accordion.Body>
                        <p>Henlo fwendlier</p>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </div>
        )
}