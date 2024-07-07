import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entities/User'
import { Product } from './entities/Product'
import { Favorite } from './entities/Favorite'
import { Sale } from './entities/Sale'
import { Cart } from './entities/Cart'

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Product, Favorite, Sale, Cart],
    synchronize: true,
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})