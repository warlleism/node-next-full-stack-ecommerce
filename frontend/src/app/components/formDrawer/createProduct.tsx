'use client'

import './style.scss'
import { z } from 'zod';
import { useEffect } from "react";
import { Drawer } from "@mui/material"
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidToken } from "@/app/utils/validToken";
import useProductStore from "@/app/stores/productStorage";
import useNewProductStore from "@/app/stores/createStorage";
import ControllerTextField from "../inputTextController/inputTextController";
import ControllerFileField from "../inputFileController/inputFile.Controller";

const schema = z.object({
    id: z.number().optional().nullable(),
    rate: z.string().min(0).max(5).nullable().optional(),
    name: z.string().min(1, 'O nome é obrigatório e não pode estar vazio.'),
    price: z.string().min(1, 'O preço é obrigatório e não pode estar vazio.'),
    image: z.string().min(1, 'A imagem é obrigatória e não pode estar vazia.'),
    category: z.string().min(1, 'A categoria é obrigatória e não pode estar vazia.'),
    description: z.string().min(1, 'A descrição é obrigatória e não pode estar vazia.'),
});

type Inputs = z.infer<typeof schema>;
const initialProduct = { id: null, name: "", price: "", category: "", rate: "0", description: "", image: "" }

export default function FormDrawerComponent() {

    const { updateAllProducts } = useProductStore()
    const { newProduct, showCrudContainer, hiddenCrudContainer } = useNewProductStore();

    const { register, handleSubmit, formState: { errors }, setValue, control, reset } =
        useForm<Inputs>({
            resolver: zodResolver(schema),
            defaultValues: newProduct ?? initialProduct,
        });

    function hiddenAndClearForm() {
        reset(initialProduct);
        hiddenCrudContainer()
    }

    useEffect(() => {
        if (newProduct) Object.keys(newProduct).forEach(key => { setValue(key as keyof Inputs, newProduct[key as keyof Inputs]) })
    }, [newProduct]);

    async function onSubmit(values: any) {

        const method = values.id ? "PUT" : "POST"
        const url = values.id ? 'product/update' : "product/create"
        const token = await getValidToken();

        try {
            const response = await fetch(`http://localhost:3001/${url}`, {
                method: method,
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })

            if (response.status === 401) {
                return toast('Produto já cadastrado!')
            }

            const msg = method == 'PUT' ? 'Editado com sucesso!' : 'Cadastrado com sucesso!';
            updateAllProducts(values)
            toast(msg)
            hiddenAndClearForm()
            hiddenCrudContainer()
        } catch (error) {
            toast(String(error));
        }
    };

    return (
        <Drawer
            id="container-drawer"
            anchor={"top"}
            open={showCrudContainer}
            onClose={() => hiddenAndClearForm()}>
            <form onSubmit={handleSubmit(onSubmit)} className="main-container-create-product">
                <div className='title-form-drawer'>
                    {!newProduct?.id ? "Novo Produto" : "Editar Produto"}
                    <div onClick={hiddenCrudContainer} style={{ float: 'right', cursor: 'pointer' }}><CloseIcon /></div>
                </div>
                <ControllerTextField type="text" label="Titulo:" register={register('name')} errors={errors.name} />
                <ControllerTextField type="number" label="Preço:" register={register('price')} errors={errors.price} />
                <ControllerTextField type="text" label="Categoria:" register={register('category')} errors={errors.category} />
                {newProduct?.rate && <ControllerTextField disabled={true} type="number" label="Avaliação:" register={register('rate')} errors={errors.rate} />}
                <ControllerTextField type="text" label="Descrição:" register={register('description')} errors={errors.description} />
                <ControllerFileField nameFile={newProduct?.name} name="image" control={control} initialImageSrc={newProduct?.image} label="Imagem" register={register('image')} errors={errors.image} />
                <button className='form-drawer-button-submit'>{!newProduct?.id ? "Cadastrar" : "Salvar"}</button>
            </form>
        </Drawer>
    )
}
