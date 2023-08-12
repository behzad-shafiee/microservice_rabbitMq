import { Controller, Get } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { BillingService } from './billing.service'

@Controller()
export class BillingController
{
  constructor ( private readonly billingService: BillingService ) { }

  @Get()
  getHello (): string
  {
    return this.billingService.getHello()
  }

  @EventPattern( "order_created" )
  handleOrderCreated ( @Payload() data: any, @Ctx() context: RmqContext )
  {
    console.log( "Hi" )

    console.log( data )

    this.billingService.handleOrderCreated( data )
    // this.rmqService.ack( context );

  }
}
