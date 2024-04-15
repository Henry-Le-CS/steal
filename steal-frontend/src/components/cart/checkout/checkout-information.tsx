import React, { memo } from 'react';
import * as Form from '@radix-ui/react-form';
import clsx from 'clsx';
import { FORM_CONTROL_CLASSES, FORM_FIELD_CLASSES } from './constants';
import { CiUser } from 'react-icons/ci';

const CheckoutInformationComponent = () => {
    return <div className="w-full grid grid-rows-6 gap-2">
        <div className='grid grid-cols-2 gap-8'>
            <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="firstName" >
                <Form.Label>First name</Form.Label>
                <Form.Control
                    className={clsx([
                        ...FORM_CONTROL_CLASSES,
                    ])}
                    type="text"
                    required
                />
                <Form.Message className="text-[13px] text-[red] opacity-[0.8]" match="valueMissing">
                    Please enter your first name
                </Form.Message>
            </Form.Field>

            <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="lastName" >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    className={clsx([
                        ...FORM_CONTROL_CLASSES,
                    ])}
                    type="text"
                    required
                />
                <Form.Message className="text-[13px] text-[red]" match="valueMissing">
                    Please enter your last name
                </Form.Message>
            </Form.Field>
        </div>

        <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="city" >
            <Form.Label>Province / City</Form.Label>
            <Form.Control
                className={clsx([
                    ...FORM_CONTROL_CLASSES,
                ])}
                type="text"
                required
            />
        </Form.Field>

        <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="address" >
            <Form.Label>Address</Form.Label>
            <Form.Control
                className={clsx([
                    ...FORM_CONTROL_CLASSES,
                ])}
                type="text"
                required
            />
        </Form.Field>

        <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="phone" >
            <Form.Label>Phone</Form.Label>
            <Form.Control
                className={clsx([
                    ...FORM_CONTROL_CLASSES,
                ])}
                type="text"
                required
            />
        </Form.Field>


        <Form.Field className={clsx([...FORM_FIELD_CLASSES, 'relative'])} name="email" >
            <Form.Label>Email</Form.Label>
            <Form.Control
                className={clsx([
                    ...FORM_CONTROL_CLASSES,

                ])}
                type="email"
                required
            />

            <Form.Message className="absolute top-0 left-0 text-[13px] text-[red] " match="valueMissing">
                Please enter your email
            </Form.Message>
        </Form.Field>

        <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="note" >
            <Form.Label>Note</Form.Label>
            <Form.Control
                className={clsx([
                    ...FORM_CONTROL_CLASSES,
                ])}
                type="text"
                required
            />
        </Form.Field>
    </div>
};




export const CheckoutInformation = memo(CheckoutInformationComponent);