import React, { memo } from 'react';
import * as Form from '@radix-ui/react-form';
import clsx from 'clsx';
import { FORM_CONTROL_CLASSES, FORM_FIELD_CLASSES } from './constants';

const CheckoutInformationComponent = () => {
    return <div className="w-full grid grid-rows-6 gap-2">
        <div className='grid grid-cols-2 gap-8'>
            <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="fullname" >
                <Form.Label>Full name</Form.Label>
                <Form.Control
                    className={clsx([
                        ...FORM_CONTROL_CLASSES,
                    ])}
                    type="text"
                    required
                />
            </Form.Field>

            <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="lastname" >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    className={clsx([
                        ...FORM_CONTROL_CLASSES,
                    ])}
                    type="text"
                    required
                />
            </Form.Field>
        </div>

        <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="province" >
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


        <Form.Field className={clsx(FORM_FIELD_CLASSES)} name="email" >
            <Form.Label>Email</Form.Label>
            <Form.Control
                className={clsx([
                    ...FORM_CONTROL_CLASSES,
                ])}
                type="email"
                required
            />
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