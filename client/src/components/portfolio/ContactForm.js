/**
 * ContactForm.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import { FormControl, FormGroup } from "react-bootstrap";
import { capitalize } from "../../lib";


const inputSections = [ 'firstName', 'lastName', 'email', 'message' ];

export const ContactForm = (props) =>
{
    const onChange = ((section, e) =>
    {
        switch(section)
        {
            case 'firstName':
                return props.setFirstName(e.target.value);
            case 'lastName'  :
                return props.setLastName(e.target.value);
            case 'email':
                return props.setEmail(e.target.value);
            case 'message':
                return props.setMessage(e.target.value);
        }
    });
    
    return (
        <>
            {
                inputSections.map((section) =>
                    <FormGroup
                        key={ section }
                        controlId={ `${ section }Validation` }
                        className="contact-form-group">
                        { section !== 'message' ? <>
                            <FormControl
                                required
                                className="contact-form-control"
                                onChange={ e => onChange(section, e) }
                                type={ section === 'email' ? 'email' : 'text' }
                                placeholder={ `Your ${ capitalize(section) }` }
                            />
                            <FormControl.Feedback type="invalid">
                                { `Please type your ${ section }` }
                            </FormControl.Feedback>
                        </> : <>
                              <FormControl
                                  required
                                  className="contact-form-control
                                             contact-form-control-textarea"
                                  onChange={ e => onChange(section, e) }
                                  as="textarea"
                                  placeholder="Please write your message here"
                              />
                              <FormControl.Feedback type="invalid">
                                  Your message is empty
                              </FormControl.Feedback>
                          </> }
                    </FormGroup>
                )
            }
        </>
    
    )
}
