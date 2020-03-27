/**
 * Contact.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import {
    Alert, Button, Container, Form, FormControl, FormGroup, FormLabel
} from "react-bootstrap";
import { Element } from "react-scroll";


const Contact = ({ emailStatus, sendEmail }) =>
{
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ message, setMessage ] = useState(null);
    
    const onSubmit = e =>
    {
        e.preventDefault()
        const form = e.currentTarget;
        if(form.checkValidity() === true)
        {
            sendEmail({ firstName, lastName, email, message });
        }
    };
    
    return (
        <Element id="contact" className="contact">
            <Container>
                <h3 className="contact-heading">Contact</h3>
                <Form
                    className="contact-form"
                    onSubmit={ onSubmit }
                >
                    <FormGroup
                        controlId="firsNameValidation"
                        className="contact-form-group"
                    >
                        <FormControl
                            required
                            className="contact-form-control"
                            onChange={ e => setFirstName(e.target.value) }
                            type="text"
                            placeholder="Your First Name"
                        />
                        <FormControl.Feedback type="invalid">
                            Please enter your first name.
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup
                        controlId="lastNameValidation"
                        className="contact-form-group"
                    >
                        <FormControl
                            required
                            className="contact-form-control"
                            onChange={ e => setLastName(e.target.value) }
                            type="text"
                            placeholder="Your Last Name"
                        />
                        <FormControl.Feedback type="invalid">
                            Please enter your last name.
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup
                        controlId="emailValidation"
                        className="contact-form-group"
                    >
                        <FormControl
                            className="contact-form-control"
                            required
                            onChange={ e => setEmail(e.target.value) }
                            type="email"
                            placeholder="Your email"
                        />
                        <FormControl.Feedback type="invalid">
                            Please enter valid email address.
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup
                        className="contact-form-group"
                        controlId="messageValidation"
                    >
                        <FormControl
                            required
                            className="contact-form-control
                                   contact-form-control-textarea"
                            onChange={ e => setMessage(e.target.value) }
                            as="textarea"
                            placeholder="Please write your message here"
                        />
                        <FormControl.Feedback type="invalid">
                            Please enter your message.
                        </FormControl.Feedback>
                    </FormGroup>
                    <Button
                        className="contact-button"
                        type="submit"
                        disabled={ emailStatus.sending }>
                        { emailStatus.sending ? 'Sending...' : 'Send Message' }
                    </Button>
                    {
                        emailStatus.error ?
                        <Alert className="contact-alert--danger">
                            Sorry, something went wrong. Please try again.
                        </Alert> : emailStatus.complete &&
                                   <Alert className="contact-alert--success">
                                       Successfully sent!
                                   </Alert>
                    }
                </Form>
            </Container>
        </Element>
    )
};

export default Contact;