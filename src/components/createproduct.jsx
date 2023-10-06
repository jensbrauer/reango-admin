// Import the react JS packages
import {useEffect, useState} from "react";
import axios from '../interceptor/axios';
// Define the Login function.
export const CreateProduct = () => {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/reango-frontend/login'
        }
        else{
         (async () => {
           try {
             const {data} = await axios.get(   
                            'http://localhost:8000/home/', {
                             headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('access_token')}`
                             }}
                           );
             setMessage(data.message);
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);
     return (<div className="form-signin mt-5 text-center">
          <h3>Hi {message}</h3>
        </div>)
}