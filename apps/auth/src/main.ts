import { RmqService } from '@app/common'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AuthModule } from './auth.module'
import { SetSwagget } from './function/swagger.config'

async function bootstrap ()
{
  const app = await NestFactory.create( AuthModule )
  const configService = app.get<ConfigService>( ConfigService )
  const rmqService = app.get<RmqService>( RmqService )
  app.connectMicroservice(rmqService.getOptions('AUTH', true))
 await app.startAllMicroservices()
  app.useGlobalPipes( new ValidationPipe() )
  app.use( cookieParser() )
  SetSwagget(app)
  const port = configService.get( "PORT" )
  await app.listen( port, () =>
  {
    console.log( `server is running on port :${ port }` )

  } )
}
bootstrap()
