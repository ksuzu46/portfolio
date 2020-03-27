/**
 * server.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 * @description Express app serving nodemailer and react frontend
 */

import {} from 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import memCache from 'memory-cache';
import nodemailer from 'nodemailer';
import  bodyParser from 'body-parser';
import { confirmationContent, messageContent } from './email';
import { fetchGhData } from './ghGraphQL.mjs';

const app = express();
const api = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, 'client', 'build');
const port = process.env.PORT;

app.use(compression())
app.use(express.static(publicPath));

// For Node mailer
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());


// Root
api.get('/', (req, res) =>
{
    res.send('api root');
})

// TODO:
//  1. move text processing on blog entries server side and cache them
//  2. find away to check if new deployment happened to last cache.

// Gh-gql-api
// Cache data until next request
api.get('/gh', async (req, res) => {
    const cachedBody = memCache.get('ghData');
    if(cachedBody)
    {
        res.send(cachedBody);
    }
    try{
        const newData = await fetchGhData();
        if(!cachedBody)
        {
            console.log("")
            res.send(newData.data);
        }
        await memCache.put('ghData', newData.data);
    } catch(error) {
        res.send(error);
        memCache.del('ghData');
    }
    
})


// Mailer
api.post('/mailer', (req, res) =>
{
    const data = req.body;
    const { firstName, lastName, email, message } = data;
    const confirmationSubject = `Thank you for your message`;
    console.log(data);
    console.log("requested");
    
    const transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        secure: true
    });
    
    const toMe = {
        from: email,
        to: process.env.EMAIL_TO,
        subject: `Message from ${ firstName }`,
        html: messageContent(firstName, lastName, message, email)
    };
    
    const toSender = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: confirmationSubject,
        html: confirmationContent(firstName, lastName, confirmationSubject),
    }
    
    transport.sendMail(toMe, (error, response) =>
    {
        console.log(error, response);
        if(!error)
        {
            res.send(response);
            transport.sendMail(toSender);
        } else
        {
            res.send(error);
        }
    });
    transport.close();
})

// Define api
app.use('/api', api);

// Fall back to html
app.get('/', (req, res) =>
{
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log(`Node is running on ${ port }`));

