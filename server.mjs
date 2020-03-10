/**
 * server.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 * @description Express app serving nodemailer and react frontend
 */

require('dotenv').config();
import express from 'express';
import path from 'path';
import  bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { fetchGhData } from './ghGraphQL.mjs';

const app = express();
const api = express();
const publicPath = path.resolve(__dirname, 'client', 'public');
const port = process.env.PORT;
app.use(express.static(publicPath));
api.use(bodyParser.urlencoded({ extended: true }));

api.use(bodyParser.json());
api.get('/', (req, res) =>
{
    res.send('api root');
})

api.get('/gh', async (req, res) => {
    try{
        const response = await fetchGhData();
        const data = await response.data;
        res.send(data);
    } catch(error) {
        res.send(error);
    }
})

api.post('/mailer', (req, res) =>
{
    const data = req.body;
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
    
    const mailOptions = {
        from: data.email,
        to: process.env.EMAIL_TO,
        subject: `Message from ${ data.name }`,
        html: `<p>Name: ${ data.name }</p>
               <p>${ data.message }</p>
               <p>Replay to: ${ data.email }</p>`
    };
    
    transport.sendMail(mailOptions, (error, response) =>
    {
        console.log(error, response);
        error ? res.send(error) : res.send(response);
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

