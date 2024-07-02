
import React from 'react';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface CustomTextFieldProps {
    label: string;
    register: any;
    errors: any;
}

export default function PasswordCustomTextField({ label, register, errors }: CustomTextFieldProps) {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <FormControl
                sx={{ background: "transparent", border: 0 }} variant="filled">
                <InputLabel
                    style={{ fontSize: '1rem', left: -13, color: "#1a1a1abd" }}
                    htmlFor="filled-adornment-password">Senha:</InputLabel>
                <FilledInput
                    style={{ position: "relative", background: "transparent" }}
                    {...register}
                    label={label}
                    variant="none"
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                style={{ width: 30, height: 30, background: "transparent", color: "#1a1a1abd", right: 20, top: '0%', position: 'absolute' }}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {errors && <p style={{ color: "#0e0e0e85", fontSize: '.8rem' }}>{errors.message}</p>}
        </div>
    );
}


