import './style.scss'
import Image from 'next/image';
import { Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation';
import StarIcon from '@mui/icons-material/Star';
import { ProductData } from '@/app/types/product';
import ButtonEditProduct from '../buttonEdit/edit';
import SkeletonComponent from '../skeleton/skeleton';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import useProductStore from '@/app/stores/productStorage';
import FavoriteComponent from '../favoriteToggler/toggler';
import { Button } from '@/app/components/buttonCart/button';

export default function Card({ products }: any) {

    const route = useRouter()
    const { detailProduct } = useProductStore();

    return (
        <div className='container-cards-component'>
            {
                products.length !== 0 ?
                    products?.map((item: ProductData) => (
                        <div
                            key={item.id}
                            className="product-card-card-component">
                            {item.sale && <div className='container-sale-number-card-component'>{item?.sale}%</div>}
                            <div className="card-image-container-card-component">
                                <FavoriteComponent id={item.id} />
                                <ButtonEditProduct item={item} sale={item?.sale} />
                                <Image
                                    onClick={() => {
                                        detailProduct(item)
                                        route.push('/pages/detail/detailOne')
                                    }}
                                    className="image-card-component"
                                    style={{ objectFit: "contain" }}
                                    loading="eager"
                                    alt={item.name}
                                    src={`data:image/jpeg;base64,${item.image}`}
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <div>
                                <div className="card-category-container-card-component">{item.category}</div>
                                <div className="card-name-container-card-component">{item.name}</div>
                            </div>
                            <Tooltip title={item.description}>
                                <div className="card-description-container-card-component"> {item.description.substring(0, 80)}...</div>
                            </Tooltip>
                            <div className="card-price-container-card-component">
                                {item.defaultPrice &&
                                    <div className='card-price-container-number-card-component'>
                                        <div style={{ textDecoration: 'line-through' }}>
                                            R${item.defaultPrice}
                                        </div>
                                        -
                                        <div>
                                            R${item.price}
                                        </div>
                                    </div>
                                }
                                {!item.defaultPrice && <div className='card-price-container-number-card-component'>R${item.price}</div>}
                                <div className='card-pix-container-number-card-component'>À vista ou pix</div>
                            </div>
                            <Tooltip title={`${item.rate} avaliações`}>
                                <div className="card-rate-container-card-component">
                                    <StarIcon className='start-home-icon-card-component' />
                                    <StarIcon className='start-home-icon-card-component' />
                                    <StarHalfIcon className='start-home-icon-card-component' />
                                    ({item.rate} avaliações)
                                </div>
                            </Tooltip>
                            <Button data={item} />
                        </div>
                    ))
                    :
                    <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
                        <SkeletonComponent />
                    </div>
            }
        </div>
    )
}