'use client'
import { LOGIN_MAIN_COLOR, SIGNUP_MAIN_COLOR } from "@/common/constants/color";
import { AuthLayout } from "@/store/layout/auth";
import clsx from "clsx";
import * as Form from '@radix-ui/react-form';
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Button } from "primereact/button";

const SignUpPage = () => {
    const bgColor = `bg-[${SIGNUP_MAIN_COLOR}]`

    return (
        <AuthLayout shadowColor={SIGNUP_MAIN_COLOR}>
            <div className={
                clsx([
                    "h-full flex items-center justify-center w-full",
                    bgColor
                ])
            }>
                <Form.Root onSubmit={(e) => {
                    console.log(e);
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.currentTarget));

                    console.log(data)
                    window.alert('sign up')
                }} className="w-[320px] flex flex-col items-center justify-center gap-8">
                    <Form.Field className="w-full" name="username">
                        <div className="relative flex p-2 text-white items-center justify-start gap-1 border border-[white] rounded-sm">
                            <CiUser size={32} />
                            <Form.Control asChild>
                                <input
                                    placeholder="USERNAME"
                                    className={
                                        clsx([
                                            "p-2 bg-inherit w-full text-white shadow-none outline-none placeholder:text-white",
                                            bgColor
                                        ])
                                    }
                                    required
                                />
                            </Form.Control>

                            <Form.Message className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]" match="valueMissing">
                                Please enter your username
                            </Form.Message>

                            <Form.Message className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]" match="typeMismatch">
                                Please provide a valid email
                            </Form.Message>
                        </div>

                    </Form.Field>

                    <Form.Field className="w-full" name="email">
                        <div className="relative flex p-2 text-white items-center justify-start gap-1 border border-[white] rounded-sm">
                            <CiUser size={32} />
                            <Form.Control asChild>
                                <input
                                    placeholder="EMAIL"
                                    className={
                                        clsx([
                                            "p-2 bg-inherit w-full text-white shadow-none outline-none placeholder:text-white",
                                            bgColor
                                        ])
                                    }
                                    type="email"
                                    required
                                />
                            </Form.Control>

                            <Form.Message className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]" match="valueMissing">
                                Please enter your email
                            </Form.Message>

                            <Form.Message className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]" match="typeMismatch">
                                Please provide a valid email
                            </Form.Message>
                        </div>

                    </Form.Field>

                    <Form.Field className="w-full" name="password">
                        <div className="relative flex p-2 text-white items-center justify-start gap-1 border border-[white] rounded-sm">
                            <CiLock size={32} />
                            <Form.Control asChild>
                                <input
                                    placeholder="PASSWORD"
                                    className="p-2 bg-inherit w-full text-white shadow-none outline-none placeholder:text-white"
                                    type="password"
                                    required
                                />
                            </Form.Control>

                            <Form.Message className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]" match="valueMissing">
                                Please enter your password
                            </Form.Message>
                        </div>
                    </Form.Field>

                    {/* <Form.Field className="w-full" name="confirm-password">
                        <div className="relative flex p-2 text-white items-center justify-start gap-1 border border-[white] rounded-sm">
                            <CiLock size={32} />
                            <Form.Control asChild>
                                <input
                                    placeholder="CONFIRM PASSWORD"
                                    className="p-2 bg-inherit w-full text-white shadow-none outline-none placeholder:text-white"
                                    type="password"
                                    required
                                />
                            </Form.Control>

                            <Form.Message className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]" match="valueMissing">
                                Please confirm your password
                            </Form.Message>

                            <Form.Message
                                className="absolute -top-[24px] right-0 text-sm text-white opacity-[0.8]"
                                match={
                                    (value, values: any) => {
                                        console.log(value, values)
                                        return true;
                                    }
                                }
                            >
                                Confirmed password does not match
                            </Form.Message>
                        </div>
                    </Form.Field> */}

                    <Form.Submit asChild>
                        <Button className="w-full text-[#D06227] border shadow-lg bg-white px-2 py-2" label="REGISTER" />
                    </Form.Submit>
                </Form.Root>
            </div>
        </AuthLayout>
    );
}

export default SignUpPage;