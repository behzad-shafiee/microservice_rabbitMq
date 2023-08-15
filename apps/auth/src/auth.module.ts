import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { DatabaseModule, RmqModule } from '@app/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { JwtModule } from '@nestjs/jwt'
import { Mongoose } from 'mongoose'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'
import { LocalStrategy } from './strategy/local.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module( {
  imports: [
    DatabaseModule,
    RmqModule,
    ConfigModule.forRoot( {
      isGlobal: true,
      envFilePath: './apps/auth/.env',
      validationSchema: Joi.object( {
        RABBIT_MQ_URLS: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      } )
    } ),
    JwtModule.register( {
      secret: 'ajksndjanasujbujscopsds68d4v85s4dv85sd^',
    } ),
   
  //  JwtModule.registerAsync( {
  //     useFactory: ( configService: ConfigService ) => ( 
  //      {
  //       secret: 'ajksndjanasujbujscopsds68d4v85s4dv85sd^',
  //       // signOptions: {
  //       //   expiresIn: configService.get( "JWT_EXPIRATION" )
  //       // }
  //     } ),
    //   inject: [ ConfigService ]
    // } ),
    ClientsModule.register( [
      { name: 'AUTH_SERVICE', transport: Transport.TCP },
    ] ),
    MongooseModule.forFeature( [
      { name: User.name, schema: UserSchema }
    ] )
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ,JwtStrategy,LocalStrategy  ],
} )
export class AuthModule { }
