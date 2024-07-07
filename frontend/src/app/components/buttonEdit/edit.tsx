'use client'

import './style.scss'
import useUserStore from '@/app/stores/userStorage';
import EditIcon from '@mui/icons-material/Edit';
import useNewProductStore from '@/app/stores/createStorage';

export default function ButtonEditProduct({ item, sale }: any) {

    const { user } = useUserStore();
    const { getNewProduct } = useNewProductStore();

    return (
        <>{user?.isAdmin === true && <div
            onClick={() => getNewProduct(item)}
            style={{ top: sale ? 50 : 10 }}
            className='container-button-edit-icon'><EditIcon /></div>}</>
    )
}