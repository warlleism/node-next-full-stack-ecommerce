import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
    label: string;
    register: any;
    errors: any;
    type: string
}

export default function ControllerTextField({ type, label, register, errors }: CustomTextFieldProps) {
    return (
        <div className='form-text-field'>
            <TextField
                className='input-text-field'
                InputProps={{ style: { color: '#1a1a1abd' } }}
                InputLabelProps={{ style: { color: '#1a1a1abd' } }}
                type={type}
                {...register}
                label={label}
                variant="standard"
            />
            <div style={{ position: "absolute", bottom: -10 }}>
                {errors && <p style={{ color: "#0e0e0e85", fontSize: '.8rem' }}>{errors.message}</p>}
            </div>
        </div>
    );
}

