'use client'

import { z } from 'zod';
import './style.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextField from '../components/inputTextController/inputController';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import { handleFormSubmit } from '@/app/utils/userRegisterUtil';
import PasswordCustomTextField from '../components/inputPasswordController/passwordInputController';
import useUserStore from '@/app/stores/userStorage';

const schema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    name: z.string().min(1, { message: 'Nome inválido' }),
    password: z.string().min(1, { message: 'Senha inválida' }).max(100, { message: 'Senha deve ter no máximo 100 caracteres' }),
});

type Inputs = z.infer<typeof schema>;

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const setUser = useUserStore((state) => state.setUser)
    const [isLoading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        handleFormSubmit({ data, event, setLoading, setUser });
    };

    return (
        <>
            <div className='register-main-cointainer'>
                <div className='form-register-cointainer'>
                    <div className='text-register-container'>
                        <h1>Cadastre-se na
                            <div>
                                <Typewriter
                                    words={['E-Prime']}
                                    loop={100}
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </div>
                        </h1>
                        <div>Cadastre-se para desbloquear ofertas exclusivas e desfrutar de vantagens especiais.</div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='inputs-register-container'>
                            <CustomTextField label="Primeiro Nome:" register={register('name')} errors={errors.name} />
                            <CustomTextField label="Email:" register={register('email')} errors={errors.email} />
                            <PasswordCustomTextField label="Senha:" register={register('password')} errors={errors.password} />
                        </div>
                        <button type="submit">
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Cadastrar'}
                        </button>
                        <div className='link'>
                            <Link href={'/pages/auth/login'}>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
