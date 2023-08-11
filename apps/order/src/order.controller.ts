import { RmqService } from '@app/common'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'

@Controller()
export class OrderController
{
  constructor ( private readonly orderService: OrderService ) { }

  @Post()
  create ( @Body() createOrderDto: CreateOrderDto ): string
  {
      return  this.orderService.create( createOrderDto )
  }
}
