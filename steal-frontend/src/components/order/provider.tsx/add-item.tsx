import { FormEvent, memo, useState } from "react";
import * as Form from '@radix-ui/react-form';
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation";
import { signIn } from "@/apis/auth";
import { Button } from "primereact/button";
import { LuType } from "react-icons/lu";
import { GiConvergenceTarget } from "react-icons/gi";
import { MdAttachMoney, MdProductionQuantityLimits, MdOutlineDescription, MdFormatListBulletedAdd } from "react-icons/md";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { postProduct } from "@/apis";
export const AddItemForm = memo(function AddItemFormComponent() {
    const router = useRouter()
    const cookie = useCookies();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setIsLoading(true);

            const formData = new FormData(e.currentTarget);
            const userId = cookie.get('id');

            const categories = formData.get('categories') as string;

            formData.set('categories', `'${categories.split(',').map((c) => c.trim()).join(',')}'`);

            if (!userId) {
                router.push('/login')
                return;
            }

            formData.append('providerId', userId);

            const { data } = await postProduct(formData)

            const productId = data?.productId;

            if (!productId) {
                throw new Error('Cannot post product')
            }

            const userConfirm = window.confirm('Product has been posted successfully. Do you want to view it?');

            if (!userConfirm) {
                return;
            }

            router.push(`/product/${productId}`)
        }
        catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || JSON.stringify(err);
            window.alert(msg);
        }
        finally {
            setIsLoading(false);
        }
    }
    return <>
        <Form.Root onSubmit={onSubmit} className="w-[60%] flex flex-col items-center justify-center gap-8 mx-[20%]">
            <div className="w-full flex items-center justify-between gap-8">
                <Form.Field className="w-full" name="name">
                    <div className="relative flex p-1 text-[black] items-center justify-start gap-1 border border-[black] rounded-sm">
                        <LuType className="font-light ml-3" size={32} />
                        <Form.Control asChild>
                            <input
                                placeholder="Product's name"
                                className={
                                    clsx([
                                        "p-2 bg-inherit w-full text-black shadow-none outline-none placeholder:text-[black] placeholder:text-opacity-60",
                                    ])
                                }
                                required
                            />
                        </Form.Control>

                        <Form.Message className="absolute -top-[24px] right-0 text-sm text-[red] opacity-[0.8]" match="valueMissing">
                            Please enter your product&apos;s name
                        </Form.Message>
                    </div>
                </Form.Field>

                <Form.Field className="w-full" name="categories">
                    <div className="relative flex p-1 text-black items-center justify-start gap-1 border border-[black] rounded-sm">
                        <GiConvergenceTarget className="ml-3 font-light" size={32} />
                        <Form.Control asChild>
                            <input
                                placeholder="Category: e.g. 'electronics, fashion'"
                                className="p-2 bg-inherit w-full text-black shadow-none outline-none placeholder:text-[black] placeholder:text-opacity-60"
                                required
                            />
                        </Form.Control>

                        <Form.Message className="absolute -top-[24px] right-0 text-sm text-red opacity-[0.8]" match="valueMissing">
                            Please enter your product&apos;s categories
                        </Form.Message>
                    </div>
                </Form.Field>
            </div>

            <div className="w-full flex items-center justify-between gap-8">
                <Form.Field className="w-full" name="price">
                    <div className="relative flex p-1 text-[black] items-center justify-start gap-1 border border-[black] rounded-sm">
                        <MdAttachMoney className="font-light ml-3" size={32} />
                        <Form.Control asChild>
                            <input
                                placeholder="Product's price"
                                className={
                                    clsx([
                                        "p-2 bg-inherit w-full text-black shadow-none outline-none placeholder:text-[black] placeholder:text-opacity-60",
                                    ])
                                }
                                required
                            />
                        </Form.Control>

                        <Form.Message className="absolute -top-[24px] right-0 text-sm text-[red] opacity-[0.8]" match="valueMissing">
                            Please enter your product&apos;s price
                        </Form.Message>
                    </div>
                </Form.Field>

                <Form.Field className="w-full" name="amount">
                    <div className="relative flex p-1 text-black items-center justify-start gap-1 border border-[black] rounded-sm">
                        <MdProductionQuantityLimits className="ml-3 font-light" size={32} />
                        <Form.Control asChild>
                            <input
                                placeholder="Product's amount"
                                className="p-2 bg-inherit w-full text-black shadow-none outline-none placeholder:text-[black] placeholder:text-opacity-60"
                                required
                            />
                        </Form.Control>

                        <Form.Message className="absolute -top-[24px] right-0 text-sm text-red opacity-[0.8]" match="valueMissing">
                            Please enter your product&apos;s amount
                        </Form.Message>
                    </div>
                </Form.Field>
            </div>

            <Form.Field className="w-full" name="description">
                <div className="relative flex p-1 text-black items-center justify-start gap-1 border border-[black] rounded-sm">
                    <MdOutlineDescription className="ml-3 font-light" size={32} />
                    <Form.Control asChild>
                        <input
                            placeholder="Product's description"
                            className="p-2 bg-inherit w-full text-black shadow-none outline-none placeholder:text-[black] placeholder:text-opacity-60"
                            type="text"
                            required
                        />
                    </Form.Control>

                    <Form.Message className="absolute -top-[24px] right-0 text-sm text-red opacity-[0.8]" match="valueMissing">
                        Please enter your product&apos;s description
                    </Form.Message>
                </div>
            </Form.Field>

            <Form.Field className="w-full" name="additionalInformation">
                <div className="relative flex p-1 text-black items-center justify-start gap-1 border border-[black] rounded-sm">
                    <MdFormatListBulletedAdd className="ml-3 font-light" size={32} />
                    <Form.Control asChild>
                        <input
                            placeholder="Product's additional information"
                            className="p-2 bg-inherit w-full text-black shadow-none outline-none placeholder:text-[black] placeholder:text-opacity-60"
                            type="text"
                        />
                    </Form.Control>

                    <Form.Message className="absolute -top-[24px] right-0 text-sm text-red opacity-[0.8]" match="valueMissing">
                        Please enter your product&apos;s additional information
                    </Form.Message>
                </div>
            </Form.Field>

            <Form.Field className="w-full" name="file">
                <div className="relative flex text-black items-center justify-start gap-1 border border-[black] rounded-sm">
                    <Form.Control asChild>
                        <Input id="" type="file" />
                    </Form.Control>

                    <Form.Message className="absolute -top-[24px] right-0 text-sm text-red opacity-[0.8]" match="valueMissing">
                        Please input your file
                    </Form.Message>
                </div>
            </Form.Field>


            <Form.Submit className="relative" asChild>
                <Button loading={isLoading} className="w-full text-[#D06227] border shadow-lg bg-white px-2 py-2" label="POST PRODUCT">
                </Button>
            </Form.Submit>
        </Form.Root></>
})