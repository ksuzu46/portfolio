/**
 * Contact.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import {
    Alert, Button, Container, Form, FormControl, FormGroup, FormLabel
} from "react-bootstrap";


const Contact = React.forwardRef(({ res, sendEmail }, ref) =>
{
    const [ name, setName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ message, setMessage ] = useState(null);
    
    const onSubmit = e =>
    {
        e.preventDefault()
        const form = e.currentTarget;
        if(form.checkValidity() === true)
        {
            sendEmail({ name, email, message });
        }
    };
    
    return (
        <Container ref={ ref } className="contact">
            <h3 className="contact-heading">Contact</h3>
            <Form
                className="contact-form"
                onSubmit={ onSubmit }
            >
                <FormGroup controlId="nameValidation">
                    <FormLabel> Your Name </FormLabel>
                    <FormControl
                        required
                        onChange={ e => setName(e.target.value) }
                        type="text"
                        placeholder="Your Name"
                    />
                    <FormControl.Feedback type="invalid">
                        Please enter your name.
                    </FormControl.Feedback>
                </FormGroup>
                <FormGroup controlId="emailValidation">
                    <FormLabel> Your Email </FormLabel>
                    <FormControl
                        required
                        onChange={ e => setEmail(e.target.value) }
                        type="email"
                        placeholder="Your email"
                    />
                    <FormControl.Feedback type="invalid">
                        Please enter valid email address.
                    </FormControl.Feedback>
                </FormGroup>
                <FormGroup controlId="messageValidation">
                    <FormLabel> Your Message </FormLabel>
                    <FormControl
                        required
                        onChange={ e => setMessage(e.target.value) }
                        as="textarea"
                        placeholder="Please write your message here"
                    />
                    <FormControl.Feedback type="invalid">
                        Please enter your message.
                    </FormControl.Feedback>
                </FormGroup>
                {
                    res.sending ? <Alert className="contact-alert" variant="info"> Sending...</Alert> : (
                        res.error ?
                        <Alert className="contact-alert" variant="danger">
                            Sorry, something went wrong. Please try again.
                        </Alert> : res.complete &&
                                   <Alert className="contact-alert" variant="success">
                                       Successfully sent!
                                   </Alert>
                    )
                }
                <Button className="contact-button" type="submit">
                    Send email
                </Button>
                
            </Form>
        </Container>
    )
});

export default Contact;