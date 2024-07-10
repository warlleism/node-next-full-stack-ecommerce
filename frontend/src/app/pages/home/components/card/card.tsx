import './style.scss'
import Image from 'next/image';
import { Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProductStore from '@/app/stores/productStorage';
import { Button } from '@/app/components/buttonCart/button';
import FavoriteComponent from '@/app/components/favoriteToggler/toggler';
import ButtonEditProduct from '@/app/components/buttonEdit/edit';
import SkeletonComponent from '@/app/components/skeleton/skeleton';

export default function Card({ product }: any) {

    const route = useRouter()
    const { detailProduct } = useProductStore();

    return (
        <div className='container-cards-component'>
            {
                product.length !== 0 ?
                    <div
                        key={product.id}
                        className="product-card-component">
                        {product.sale && <div className='container-sale-number-card-component'>{product?.sale}%</div>}
                        <div className="card-image-container-card-component">
                            <FavoriteComponent id={product.id} />
                            <ButtonEditProduct item={product} sale={product?.sale} />
                            <Image
                                onClick={() => {
                                    detailProduct(product)
                                    route.push('/pages/detail/detailOne')
                                }}
                                className="image-card-component"
                                style={{ objectFit: "contain" }}
                                loading="eager"
                                alt={product.name}
                                src={`data:image/jpeg;base64,${product.image}`}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div>
                            <div className="card-category-container-card-component">{product.category}</div>
                            <div className="card-name-container-card-component">{product.name}</div>
                        </div>
                        <Tooltip title={product.description}>
                            <div className="card-description-container-card-component"> {product.description.substring(0, 80)}...</div>
                        </Tooltip>
                        <div className="card-price-container-card-component">
                            {product.defaultPrice &&
                                <div className='card-price-container-number-card-component'>
                                    <div style={{ textDecoration: 'line-through' }}>
                                        R${product.defaultPrice}
                                    </div>
                                    -
                                    <div>
                                        R${product.price}
                                    </div>
                                </div>
                            }
                            {!product.defaultPrice && <div className='card-price-container-number-card-component'>R${product.price}</div>}
                            <div className='card-pix-container-number-card-component'>À vista ou pix</div>
                        </div>
                        <Tooltip title={`${product.rate} avaliações`}>
                            <div className="card-rate-container-card-component">
                                <StarIcon className='start-home-icon-card-component' />
                                <StarIcon className='start-home-icon-card-component' />
                                <StarHalfIcon className='start-home-icon-card-component' />
                                ({product.rate} avaliações)
                            </div>
                        </Tooltip>
                        <Button data={product} />
                    </div>
                    :
                    <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
                        <SkeletonComponent />
                    </div>
            }
        </div>
    )
}