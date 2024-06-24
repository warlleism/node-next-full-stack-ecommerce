import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('sales')
export class Sale {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    product_id: number

    @Column({ type: 'text' })
    sale: number

}