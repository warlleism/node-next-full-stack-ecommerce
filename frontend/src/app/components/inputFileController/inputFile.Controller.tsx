import Image from 'next/image';
import { useController } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

interface CustomFileFieldProps {
    label: string;
    register: any;
    errors: any;
    initialImageSrc: string | undefined;
    name: any;
    control: any;
    nameFile: any
}

export default function ControllerFileField({ initialImageSrc, errors, name, control, nameFile }: CustomFileFieldProps) {

    const { field: { onChange }, } = useController({ name, control });

    const [imageBase64, setImageBase64] = useState<string | undefined>(initialImageSrc);
    const [fileName, setFileName] = useState<string | undefined>();

    useEffect(() => {
        setImageBase64(initialImageSrc);
    }, [initialImageSrc]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            setFileName(file.name);
            reader.onloadend = () => {
                const base64String = reader.result?.toString().split(',')[1];
                setImageBase64(base64String);
                onChange(base64String)
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className='form-file-field'>
                {imageBase64 ? (
                    <Image
                        style={{ objectFit: "contain" }}
                        loading="eager"
                        width={60}
                        height={60}
                        src={`data:image/jpeg;base64,${imageBase64}`}
                        alt="Uploaded"
                    />
                ) : (
                    <div className='text-input-file-drawer'>
                        <div style={{ gap: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <PhotoLibraryIcon style={{ fontSize: "3rem" }} />
                            Clique e selecione uma imagem
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div style={{ width: "100%", display: 'flex', alignItems: 'center', gap: 5, position: "relative" }}>
                {fileName ?
                    <div style={{ position: "absolute", bottom: -15, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <PhotoLibraryIcon style={{ fontSize: "1.2rem" }} />{fileName}
                    </div>
                    :
                    <div style={{ display: 'flex', alignItems: 'center', position: "absolute", bottom: -9 }}>
                        {nameFile !== undefined && <><PhotoLibraryIcon style={{ fontSize: "1.2rem" }} />
                            {`${nameFile}.png`}</>}
                    </div>
                }
                <div style={{ position: "absolute", bottom: -5 }}>
                    {errors && <p style={{ color: "#0e0e0e85", fontSize: '.8rem' }}>{errors.message}</p>}
                </div>
            </div>
        </>
    );
}
