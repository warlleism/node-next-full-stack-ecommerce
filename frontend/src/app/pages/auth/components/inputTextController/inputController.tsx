import React from 'react';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps {
    label: string;
    register: any;
    errors: any;
}

export default function CustomTextField({ label, register, errors }: CustomTextFieldProps) {
    return (
        <div>
            <TextField
                InputProps={{ style: { color: '#1a1a1abd' } }}
                InputLabelProps={{ style: { color: '#1a1a1abd' } }}
                type="text"
                {...register}
                label={label}
                variant="standard"
            />
            {errors && <p style={{ color: "#0e0e0e85", fontSize: '.8rem' }}>{errors.message}</p>}
        </div>
    );
}

