import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BillingService
{
  private logger = new Logger( 'BillingService' )

  getHello (): string
  {
    return 'Hello World!'
  }

  handleOrderCreated ( data: any )
  {
    this.logger.log( "Billing ...", data )
  }
}
