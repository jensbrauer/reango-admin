import React, { useEffect, useState } from "react";
import { CartProduct } from "./likeproduct";

import Button from 'react-bootstrap/Button';


import '../../index.css'

function CartButton(props) {
    const { is_carted } = props;
    const { slug } = props;
    
  
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);

    const [carted, setCarted] = useState([])




    function handleCart(slug) {
      if (isAuth) {
        CartProduct(slug);
      
        if (carted.includes(slug)) {
          setCarted(carted.filter((item) => item !== slug));
        } else {
          setCarted([...carted, slug]);
        }
      }
    }



    return (
            <Button variant="white" style={{color: carted.includes(slug) ? is_carted ? '#495057' : 'red' : is_carted ? 'red' : '#495057'}} onClick={() => handleCart(slug)}>
                <h6><i class="fa-solid fa-cart-shopping"></i> add to cart</h6>
            </Button>
    );
}

export default CartButton;
