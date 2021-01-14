/**
 * ContactForm.js
 * @author [Keisuke Suzuki](https://github.com/ksuzu46)
 */

import React from 'react';
import { FormControl, FormGroup } from "react-bootstrap";
import { capitalize } from "../../lib";


const inputSections = [ 'firstName', 'lastName', 'email', 'message' ];
const jpInputSections = ['名', '姓', 'Eメール', 'メッセージ']

export const ContactForm = (props) =>
{
    const { isEnglish } = props;
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
                isEnglish ? inputSections.map((section) =>
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
                ): jpInputSections.map((section) =>
                    <FormGroup
                        key={ section }
                        controlId={ `${ section }Validation` }
                        className="contact-form-group">
                        { section !== 'message' ? <>
                            <FormControl
                                required
                                className="contact-form-control"
                                onChange={ e => onChange(section, e) }
                                type={ section === 'Eメール' ? 'email' : 'text' }
                                placeholder={ section }
                            />
                            <FormControl.Feedback type="invalid">
                                { `${ section }を入力してください` }
                            </FormControl.Feedback>
                        </> : <>
                            <FormControl
                                required
                                className="contact-form-control
                                             contact-form-control-textarea"
                                onChange={ e => onChange(section, e) }
                                as="textarea"
                                placeholder="メッセージを入力してください"
                            />
                            <FormControl.Feedback type="invalid">
                                メッセージを入力してください
                            </FormControl.Feedback>
                        </> }
                    </FormGroup>
                )
            }
        </>
    
    )
}
