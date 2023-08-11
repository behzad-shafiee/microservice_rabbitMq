import { Module } from '@nestjs/common'
import { BillingController } from './billing.controller'
import { BillingService } from './billing.service'
import { RmqModule } from '@app/common'
import { ConfigModule } from '@nestjs/config'

@Module( {
  imports: [
    ConfigModule.forRoot( {
      isGlobal: true
    } )
    , RmqModule
  ],
  controllers: [ BillingController ],
  providers: [ BillingService ],
} )
export class BillingModule { }
