import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
    // primero validar el token
    const [token, setTtoken] = useState<ConfirmToken['token']>('')
    const [isValidToken, setIsValidToken] = useState(false) // Simulando que el token es inválido inicialmente



    
    return ( 
    <>
    <h1 className="text-5xl font-black text-white">Restablecer tu Contraseña</h1>
    <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibiste {''}
        <span className=" text-fuchsia-500 font-bold">por email</span>
    </p>

    {!isValidToken ? 
    <NewPasswordToken token={token} setToken={setTtoken} setIsValidToken={setIsValidToken}/> : 
    <NewPasswordForm token={token}/> }
    </>
    );
}

