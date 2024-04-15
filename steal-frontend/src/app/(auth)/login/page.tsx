'use client'
import { LOGIN_MAIN_COLOR } from "@/common/constants/color";
import { AuthLayout } from "@/store/layout/auth";
import clsx from "clsx";
import * as Form from '@radix-ui/react-form';
import { CiUser } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Button } from "primereact/button";
import { signIn } from "@/apis/auth";
import { FormEvent, use, useState } from "react";
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation";
const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
    const cookie = useCookies();

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);

            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            const { data, message } = await signIn({ email, password });

            if (!data || message) {
                setError(message || 'Invalid email or password');

                window.alert('Invalid email or password');
                return;
            }

            cookie.set('username', data.username, {
                expires: 3400
            });

            router.push('/home')

            setError(null);
        }
        catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || JSON.stringify(err);
            window.alert('Invalid email or password');
            setError(msg);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <AuthLayout shadowColor={LOGIN_MAIN_COLOR}>
            <div className={
                clsx([
                    "h-full flex items-center justify-center w-full",
                    `bg-[#036147]`
                ])
            }>
                <Form.Root onSubmit={onSubmit} className="w-[320px] flex flex-col items-center justify-center gap-8">
                    <Form.Field className="w-full" name="email">
                        <div className="relative flex p-2 text-white items-center justify-start gap-1 border border-[white] rounded-sm">
                            <CiUser size={32} />
                            <Form.Control asChild>
                                <input
                                    placeholder="EMAIL"
                                    className={
                                        clsx([
                                            "p-2 bg-inherit w-full text-white shadow-none outline-none placeholder:text-white",
                                            `bg-[#036147]`
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
                                Please enter a valid email
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

                    <Form.Submit className="relative" asChild>
                        <Button loading={isLoading} className="w-full text-[#036147] border shadow-lg bg-white px-2 py-2" label="LOGIN">
                        </Button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </AuthLayout>
    );
}

export default LoginPage;