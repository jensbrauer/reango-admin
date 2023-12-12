import React, { useEffect, useState } from "react";
import { LikeProduct } from "./likeproduct";

import Button from 'react-bootstrap/Button';


import '../../index.css'

function LikeButton(props) {
    const { is_liked } = props;
    const { slug } = props;
    
  
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {setIsAuth(true); }
    }, [isAuth]);

    const [liked, setLiked] = useState([])




    function handleLike(slug) {
      if (isAuth) {
        LikeProduct(slug);
      
        if (liked.includes(slug)) {
          setLiked(liked.filter((item) => item !== slug));
        } else {
          setLiked([...liked, slug]);
        }
      }
    }



    return (
            <Button id="like-button" variant="white" style={{color: liked.includes(slug) ? is_liked ? '#495057' : '#FF6B6B' : is_liked ? '#FF6B6B' : '#495057'}} onClick={() => handleLike(slug)}>
                <i class="fa-solid fa-heart"></i>
            </Button>
    );
}

export default LikeButton;
