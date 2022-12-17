import Image from "next/legacy/image"
import { useState } from "react";
import HeadHTML from "../components/Head"
import {useForm,SubmitHandler} from 'react-hook-form'
import useAuth from "../hooks/useAuth";

interface Inputs {
    email:string;
    password:string;
}
    const optionsEmail={
        required: true,
    }
    const optionsPassword={
        required:true,
        minLength:10
    }

const Login = () => {
    const [login, setLogin] = useState(false);
    const {register,handleSubmit,formState:{errors}} = useForm<Inputs>();
    const {signIn,signUp} = useAuth();
    const onSubmit: SubmitHandler<Inputs> = async ({email,password}) => {
        if(login){
            await signIn(email,password)
        }else{
            await signUp(email,password)
        }
    };
    

    return (
        <div className="relative felx h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent">
        <HeadHTML />
        <Image
        src={'https://rb.gy/p2hphi'}
        layout='fill'
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        />

        <img src="https://rb.gy/ulxxee" alt="MobFlix"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
        />
        <div className="h-screen  w-screen flex flex-col justify-center  items-center">
            <form  
            onSubmit={handleSubmit(onSubmit)}
            className="relative space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className=" space-y-4 text-black ">
                    <label className="inline-block w-full">
                        <input
                         {...register('email',optionsEmail)}
                        type="email" placeholder="Email"  className="input"/>
                        {errors.email && <p className="error">Ingresa Un Correo Valido</p>}
                    </label>
                    <label className=" inline-block w-full" >
                        <input 
                        {...register('password',optionsPassword)}
                        type="password" placeholder="Password" className="input" />
                        {errors.password && <p className="error">Ingresa Una contraseña valida</p>}
                    </label>
                </div>
                <button className="w-full rounded bg-[#e50914] py-3 font-semibold" 
                onClick={() => setLogin(true)}>
                    Sign in
                </button>

                <div className="text-[gray]">
                    New to netflix?
                    <button type="submit"
                    onClick={() => setLogin(false)}
                    className="text-white hover:underline ml-1"> 
                        Sign up now
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login

