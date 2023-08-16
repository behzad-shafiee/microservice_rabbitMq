import { AuthModule, DatabaseModule, RmqModule } from '@app/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi'
import { BILLING_SERVICE } from './constant/service'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { Order, OrderSchema } from './schema/order.schema'

@Module( {
  imports: [
    ConfigModule.forRoot( {
      isGlobal: true,
      validationSchema: Joi.object( {
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URLS: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required()
      } ),
      envFilePath: './apps/order/.env'
    } ),
    RmqModule.register(
      { name: BILLING_SERVICE }
    ),
    DatabaseModule,
    MongooseModule.forFeature( [
      { name: Order.name, schema: OrderSchema }
    ] ),
    AuthModule
  ],
  controllers: [ OrderController ],
  providers: [ OrderService ],
} )
export class OrderModule { }
