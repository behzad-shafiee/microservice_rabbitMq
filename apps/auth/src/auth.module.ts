import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ClientsModule,Transport } from '@nestjs/microservices'

@Module( {
  imports: [
    ClientsModule.register( [
      { name: 'AUTH_SERVICE', transport: Transport.TCP },
    ] ),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
} )
export class AuthModule { }
