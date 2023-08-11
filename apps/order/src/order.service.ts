import { Inject, Injectable } from '@nestjs/common'
import { BILLING_SERVICE } from './constant/service'
import { ClientProxy } from '@nestjs/microservices'
import { CreateOrderDto } from './dto/create-order.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderDocument } from './schema/order.schema'
import { Model } from 'mongoose'

@Injectable()
export class OrderService
{
  constructor (
    @Inject( BILLING_SERVICE ) private billingClient: ClientProxy,
    @InjectModel( Order.name ) private orderModel: Model<OrderDocument>
  ) { }

  create ( createOrderDto: CreateOrderDto ): string
  {

    this.billingClient.emit( "order_created", {
      createOrderDto
    } )

    return
  }
}
