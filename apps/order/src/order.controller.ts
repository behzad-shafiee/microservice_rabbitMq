import { RmqService } from '@app/common'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'
import { Order } from './schema/order.schema'
import { JwtAuthGuard } from '@app/common'
import { Request } from "express"

@Controller( 'order' )
export class OrderController
{
  constructor ( private readonly orderService: OrderService ) { }

  @UseGuards( JwtAuthGuard )
  @Post()
  create ( @Body() createOrderDto: CreateOrderDto, @Req() req: Request ): Promise<Order>
  {
    console.log( req.user )

    return this.orderService.create( createOrderDto )
  }

  @Get()
  getAll (): Promise<Order[]>
  {
    return this.orderService.getAll()
  }
}
