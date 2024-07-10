import './style.scss'
import Image from 'next/image';
import { Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import { ProductData } from '@/app/types/product';
import ButtonEditProduct from '../buttonEdit/edit';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProductStore from '@/app/stores/productStorage';
import FavoriteComponent from '../favoriteToggler/toggler';
import { Button } from '@/app/components/buttonCart/button';

export default function CardDetail({ products }: any) {

    const route = useRouter()
    const { detailProduct } = useProductStore();

    return (
        <div className='container-cards-component-detail'
            style={{
                gap: products.length <= 3 ? 10 : 0,
                justifyContent: products.length <= 3 ? 'flex-start' : 'space-between'
            }}
        >
            {
                products?.map((item: ProductData) => (
                    <div
                        key={item.id}
                        className="product-card-card-component-detail">
                        {item.sale && <div className='container-sale-number-card-component-detail'>{item?.sale}%</div>}
                        <div className="card-image-container-card-component-detail">
                            <FavoriteComponent id={item.id} />
                            <ButtonEditProduct item={item} sale={item?.sale} />
                            <Image
                                onClick={() => {
                                    detailProduct(item)
                                    route.push('/pages/detail/detailOne')
                                }}
                                className="image-card-component-detail"
                                style={{ objectFit: "contain" }}
                                loading="eager"
                                alt={item.name}
                                src={`data:image/jpeg;base64,${item.image}`}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div>
                            <div className="card-category-container-card-component-detail">{item.category}</div>
                            <div className="card-name-container-card-component-detail">{item.name}</div>
                        </div>
                        <Tooltip title={item.description}>
                            <div className="card-description-container-card-component-detail"> {item.description.substring(0, 80)}...</div>
                        </Tooltip>
                        <div className="card-price-container-card-component-detail">
                            {item.defaultPrice &&
                                <div className='card-price-container-number-card-component-detail'>
                                    <div style={{ textDecoration: 'line-through' }}>
                                        R${item.defaultPrice}
                                    </div>
                                    -
                                    <div>
                                        R${item.price}
                                    </div>
                                </div>
                            }
                            {!item.defaultPrice && <div className='card-price-container-number-card-component-detail'>R${item.price}</div>}
                            <div className='card-pix-container-number-card-component-detail'>À vista ou pix</div>
                        </div>
                        <Tooltip title={`${item.rate} avaliações`}>
                            <div className="card-rate-container-card-component-detail">
                                <StarIcon className='start-home-icon-card-component-detail' />
                                <StarIcon className='start-home-icon-card-component-detail' />
                                <StarHalfIcon className='start-home-icon-card-component-detail' />
                                ({item.rate} avaliações)
                            </div>
                        </Tooltip>
                        <Button data={item} />
                    </div>
                ))

            }
        </div>
    )
}