/**
 * Contact.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import {
    Alert, Button, Container, Form, FormControl, FormGroup, FormLabel
} from "react-bootstrap";


const Contact = React.forwardRef(({ emailStatus, sendEmail }, ref) =>
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
        <Container ref={ ref } className="contact">
            <h3 className="contact-heading">Contact</h3>
            <Form
                className="contact-form"
                onSubmit={ onSubmit }
            >
                <FormGroup
                    controlId="firsNameValidation"
                    className="contact-form-group"
                >
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel> Last Name </FormLabel>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Message</FormLabel>
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
                {
                    emailStatus.sending ?
                    <Alert className="contact-alert" variant="info">
                        Sending...
                    </Alert> :
                    (
                        emailStatus.error ?
                        <Alert className="contact-alert" variant="danger">
                            Sorry, something went wrong. Please try again.
                        </Alert> : emailStatus.complete &&
                                   <Alert className="contact-alert"
                                          variant="success">
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