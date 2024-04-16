import { axiosInstance } from ".";
import { ResponseData } from "./types";

export type LoginDto = {
    email: string;
    password: string;
}

export type LoginResponse = {
    username: string;
    email: string;
    id: string;
}

export const signIn = async (payload: LoginDto): Promise<ResponseData<LoginResponse>> => {
    const {data} = await axiosInstance.post('/auth-service/sign-in', payload)

    return data
}

export type RegisterDto = {
    email: string;
    password: string;
    username: string;
}

export type RegisterResponse = {
    username: string;
    email: string;
}

export const signUp = async (payload: RegisterDto): Promise<ResponseData<RegisterResponse>> => {
    const {data} = await axiosInstance.post('/auth-service/sign-up', payload)

    return data
}