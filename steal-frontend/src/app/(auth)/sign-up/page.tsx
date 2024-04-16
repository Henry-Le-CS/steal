'use client'
import { LOGIN_MAIN_COLOR, SIGNUP_MAIN_COLOR } from "@/common/constants/color";
import { AuthLayout } from "@/store/layout/auth";
import clsx from "clsx";
import * as Form from '@radix-ui/react-form';
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Button } from "primereact/button";
import { FormEvent, useState } from "react";
import { signUp } from "@/apis/auth";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const bgColor = `bg-[#D06227]`
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.currentTarget));

            const { data, message } = await signUp(formData as any);

            if (!data || message) {
                setError(message || 'Invalid email or password');
                window.alert(message);
                return;
            }

            window.alert(`Successfully registered with username: ${data.username} and email: ${data.email}`);

            router.push('/login');
        }
        catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || JSON.stringify(err);
            window.alert(msg);
            setError(msg);
        }
        finally {
            setIsLoading(false)
        }
        e.preventDefault();



    }
    return (
        <AuthLayout shadowColor={SIGNUP_MAIN_COLOR}>
            <div className={
                clsx([
                    "h-full flex items-center justify-center w-full",
                    bgColor
                ])
            }>
                <Form.Root onSubmit={onSubmit} className="w-[320px] flex flex-col items-center justify-center gap-8">
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

                    <Form.Submit asChild>
                        <Button className="w-full text-[#D06227] border shadow-lg bg-white px-2 py-2" label="REGISTER" >
                            <span className={
                                clsx([
                                    'absolute bottom-0 left-0 right-0 text-center text-white text-sm',
                                    error ? 'opacity-100' : 'opacity-0'
                                ])
                            }>{error}</span>
                        </Button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </AuthLayout>
    );
}

export default SignUpPage;