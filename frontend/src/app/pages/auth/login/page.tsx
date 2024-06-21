'use client'

import './style.scss'
import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import useUserStore from '@/app/stores/userStorage';
import { Typewriter } from 'react-simple-typewriter'
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomTextField from '../components/inputController';
import { handleFormSubmit } from '@/app/utils/userLoginUtil';
import PasswordCustomTextField from '../components/passwordInputController';
import { Checkbox, CircularProgress, FormControlLabel, FormGroup } from '@mui/material';

const schema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(1, { message: 'Senha é obrigatória' }).max(100, { message: 'Senha deve ter no máximo 100 caracteres' }),
});

type Inputs = z.infer<typeof schema>;

export default function Login() {

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
            <div className='login-main-cointainer'>
                <div className='form-login-cointainer'>
                    <div className='text-login-container'>
                        <h1>Conecte-se na
                            <div>
                                <Typewriter
                                    words={['E-Prime']}
                                    loop={100}
                                    cursorStyle='_'
                                    typeSpeed={100}
                                    deleteSpeed={100}
                                    delaySpeed={1000}
                                />
                            </div>
                        </h1>
                        <div>Conecte-se para desbloquear ofertas exclusivas e desfrutar de vantagens especiais.</div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='inputs-login-container'>
                            <CustomTextField label="Email:" register={register('email')} errors={errors.email} />
                            <PasswordCustomTextField label="Senha:" register={register('password')} errors={errors.password} />
                        </div>
                        <div className='checkbox-forgot-container'>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        sx={{
                                            color: '#ff7e33',
                                            '&.Mui-checked': {
                                                color: '#ff7e33',
                                            },
                                        }} defaultChecked />}
                                    label="Lembrar senha" />
                            </FormGroup>
                            <div>Esqueceu sua senha?</div>
                        </div>
                        <button type="submit">
                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                        </button>
                        <div className='link'>
                            <Link href={'/pages/auth/register'}>Cadastrar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
