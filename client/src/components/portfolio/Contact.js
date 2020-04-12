/**
 * Contact.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Element } from "react-scroll";
import { ContactForm } from "./ContactForm";


const Contact = ({ emailStatus, sendEmail }) =>
{
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ message, setMessage ] = useState(null)
    
    const status = emailStatus.sending ? 'sending' : (
        emailStatus.error ? 'error' : (
            !emailStatus.error && emailStatus.complete ?
            'submitted' : 'default'
        ));
    
    const onSubmit = e =>
    {
        e.preventDefault()
        const form = e.currentTarget;
        if(form.checkValidity() === true)
        {
            sendEmail({ firstName, lastName, email, message });
        }
    };
    
    const getButtonText = (status) =>
    {
        let text = 'Send Message';
        switch(status)
        {
            case 'sending':
                text = 'sending';
                break;
            case 'error'  :
                text = 'Sorry, something went wrong. Please try again later.';
                break;
            case 'submitted':
                text = 'Successfully sent!';
                break;
            default :
                break;
        }
        return text;
    }
    
    return (
        <div className="contact">
            <Container>
                <Form
                    className="contact-form"
                    onSubmit={ onSubmit }
                >
                    <Element name="contact">
                        <h3 className="contact-heading">Contact</h3>
                    </Element>
                    <ContactForm
                        setFirstName={ setFirstName }
                        setLastName={ setLastName }
                        setEmail={ setEmail }
                        setMessage={ setMessage }
                    />
                    <Button
                        className={ `contact-button__${ status }` }
                        type="submit"
                        disabled={ status === 'sending' || status ===
                                   'submitted' }>
                        { getButtonText(status) }
                    </Button>
                </Form>
            </Container>
        </div>
    )
};

export default Contact;