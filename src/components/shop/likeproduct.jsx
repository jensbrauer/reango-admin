import {useEffect, useState} from "react";
import client from '../../interceptor/axios';



export const LikeProduct = async (productSlug) => {
        try {
            const requestData = {
            refresh_token: localStorage.getItem('refresh_token'),
            slug: productSlug
            };

            const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
            };

            console.log('Request Data:', requestData);
            console.log('Headers:', headers);

            const { data } = await client.post(
            'like/',
            requestData,
            {
                headers,
                withCredentials: true
            }
            );

            //localStorage.clear();
            //window.location.href = '/reango-frontend/you';
        } catch (e) {
            //window.location.href = '/reango-frontend/you';
            console.log('logout not working', e);
            window.location.href = '/reango-frontend/login';
        }
}

export const CartProduct = async (productSlug) => {
    try {
        const requestData = {
        refresh_token: localStorage.getItem('refresh_token'),
        slug: productSlug
        };

        const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
        };

        console.log('Request Data:', requestData);
        console.log('Headers:', headers);

        const { data } = await client.post(
        'cart/',
        requestData,
        {
            headers,
            withCredentials: true
        }
        );

        //localStorage.clear();
        //window.location.href = '/reango-frontend/you';
    } catch (e) {
        //window.location.href = '/reango-frontend/you';
        console.log('logout not working', e);
        window.location.href = '/reango-frontend/login';
    }
}