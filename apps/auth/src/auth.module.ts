import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { DatabaseModule, RmqModule } from '@app/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Joi from 'joi'
import { JwtModule } from '@nestjs/jwt'
import { Mongoose } from 'mongoose'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'

@Module( {
  imports: [
    DatabaseModule,
    RmqModule,
    ConfigModule.forRoot( {
      isGlobal: true,
      envFilePath: './apps/auth/.env',
      validationSchema: Joi.object( {
        RABBIT_MQ_URLS: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      } )
    } ),
    JwtModule.registerAsync( {
      useFactory: ( configService: ConfigService ) => ( {
        secret: configService.get( "JWT_SECRET" ),
        signOptions: {
          expiresIn: configService.get( "JWT_EXPIRATION" )
        }
      } ),
      inject: [ ConfigService ]
    } ),
    ClientsModule.register( [
      { name: 'AUTH_SERVICE', transport: Transport.TCP },
    ] ),
    MongooseModule.forFeature( [
      { name: User.name, schema: UserSchema }
    ] )
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ],
} )
export class AuthModule { }
