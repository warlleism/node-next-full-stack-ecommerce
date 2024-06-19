import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    isAdmin: boolean

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    password: string
}