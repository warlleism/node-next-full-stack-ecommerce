import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    user_id: number

    @Column({ type: 'text' })
    product_id: number
}