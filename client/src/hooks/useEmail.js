/**
 * useEmail.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */

import { useState } from 'react';
import axios from "axios";
import { requestConfig } from "../lib";
import config from "../../config";


const { mailerUrl } = config;

export const useEmail = () =>
{
    const [ emailStatus, setEmailStatus ] = useState({
        data: null,
        sending: false,
        error: false,
        complete: false
    });
    
    const sendEmail = async(data) =>
    {
        setEmailStatus(prevState => ({ ...prevState, sending: true, }));
        try
        {
            const tmp = await axios.post(mailerUrl, data, requestConfig());
            await setEmailStatus(prevState => ({
                ...prevState,
                data: tmp.data,
                sending: false,
                complete: true
            }));
        } catch(error)
        {
            await setEmailStatus(prevState => ({
                ...prevState,
                error: error.response,
                sending: false,
                complete: true,
            }));
        }
    };
    
    return { emailStatus, sendEmail };
}