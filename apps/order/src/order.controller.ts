import { RmqService } from '@app/common'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'
import { Order } from './schema/order.schema'

@Controller( 'order' )
export class OrderController
{
  constructor ( private readonly orderService: OrderService ) { }

  @Post()
  create ( @Body() createOrderDto: CreateOrderDto ): Promise<Order>
  {
    return this.orderService.create( createOrderDto )
  }

  @Get()
  getAll():Promise<Order[]>{
    return this.orderService.getAll()
  }
}
