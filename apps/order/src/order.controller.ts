import { JwtAuthGuard } from '@app/common'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from "express"
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'
import { Order } from './schema/order.schema'

@ApiTags( 'order' )
@Controller( 'order' )
export class OrderController
{
  constructor ( private readonly orderService: OrderService ) { }

  @UseGuards( JwtAuthGuard )
  @Post()
  create ( @Body() createOrderDto: CreateOrderDto, @Req() req: Request ): Promise<Order>
  {
    console.log('user info ===>',req.user);
    return this.orderService.create( createOrderDto, req.cookies?.Authenticate )
  }

  @Get()
  getAll (): Promise<Order[]>
  {
    return this.orderService.getAll()
  }
}
