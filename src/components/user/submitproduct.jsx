import {useEffect, useState} from "react";
import client from '../../interceptor/axios';


export const SubmitProduct = async (newProduct) => {
        try {
            const requestData = {
            refresh_token: localStorage.getItem('refresh_token'),
            name: newProduct.name,
            brand: newProduct.brand,
            condition: newProduct.condition,
            size: newProduct.size,
            gender: newProduct.gender,
            category: newProduct.category,
            product_img: newProduct.product_img,
            };
            console.log(newProduct.product_img)
            const headers = {
            'Content-Type': 'multipart/form-data', // Set the correct content type
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
            };

            /* console.log('Request Data:', requestData);
            console.log('Headers:', headers); */
            console.log('NEW REQUEST FROM FUNCTION')

            const { data } = await client.post(
            'you/',
            requestData,
            {
                headers,
                withCredentials: true
            }
            );

            //localStorage.clear();
            //window.location.href = 'reango-frontend#/you';
        } catch (e) {
            //window.location.href = '/reango-frontend/you';
            console.log('logout not working', e);
            window.location.href = '/reango-frontend/login';
        }
}