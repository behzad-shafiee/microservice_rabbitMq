import { DatabaseModule, RmqModule } from '@app/common'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MongooseModule } from '@nestjs/mongoose'
import * as Joi from 'joi'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User, UserSchema } from './schema/user.schema'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'

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
  providers: [ AuthService, JwtStrategy, LocalStrategy ],
} )
export class AuthModule { }
