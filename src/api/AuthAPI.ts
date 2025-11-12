import api from "../lib/axios";
import { isAxiosError } from "axios";
import { userSchema, type CheckPasswordForm, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const { data } = await api.post<string>('/auth/create-account', formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const { data } = await api.post<string>('/auth/confirm-account', formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const { data } = await api.post<string>('/auth/request-code', formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const { data } = await api.post<string>('/auth/login', formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const { data } = await api.post<string>('/auth/forgot-password', formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const { data } = await api.post<string>('/auth/validate-token', formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePassword( {formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}) {
    try {
        const { data } = await api.post<string>(`/auth/update-password/${token}`, formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api('/auth/user')
        const response = userSchema.safeParse(data)
        console.log(response)
        if(response.success) {
            return response.data
        }
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData : CheckPasswordForm) {
    try {
        const url = '/auth/check-password'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch(error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


