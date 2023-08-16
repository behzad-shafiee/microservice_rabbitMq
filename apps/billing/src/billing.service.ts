import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BillingService
{
  private logger = new Logger( 'BillingService' )

  handleOrderCreated ( data: any )
  {
    this.logger.log( "Billing ...", data )
  }
}
