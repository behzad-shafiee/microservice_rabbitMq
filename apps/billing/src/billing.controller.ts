import { Controller, Get, UseGuards } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { BillingService } from './billing.service'
import { JwtAuthGuard } from '@app/common'

@Controller()
export class BillingController
{
  constructor ( private readonly billingService: BillingService ) { }

  @EventPattern( "order_created" )
  @UseGuards(JwtAuthGuard)
  handleOrderCreated ( @Payload() data: any, @Ctx() context: RmqContext )
  {
    console.log( data )
    this.billingService.handleOrderCreated( data )
    // this.rmqService.ack( context );

  }
}
