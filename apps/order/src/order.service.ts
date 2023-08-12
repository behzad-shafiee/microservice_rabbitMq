import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { lastValueFrom } from 'rxjs'
import { BILLING_SERVICE } from './constant/service'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order, OrderDocument } from './schema/order.schema'

@Injectable()
export class OrderService
{
  constructor (
    @Inject( BILLING_SERVICE ) private billingClient: ClientProxy,
    @InjectModel( Order.name ) private orderModel: Model<OrderDocument>
  ) { }

  async create ( createOrderDto: CreateOrderDto ): Promise<Order>
  {
    try
    {
      const order = new this.orderModel( {
        name: createOrderDto.name,
        price: createOrderDto.price,
        phoneNumber: createOrderDto.phoneNumber,
      } )
      await order.save()

      await lastValueFrom(
        this.billingClient.emit( "order_created", {
          order
        } )
      )

      return order
    } catch ( error )
    {
      throw new Error( error )
    }
  }

  async getAll (): Promise<Order[]>
  {
    return await this.orderModel.find( {} )
  }
}
