import { SetSwagget } from '@app/common'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { OrderModule } from './order.module'

async function bootstrap ()
{
  const app = await NestFactory.create( OrderModule )
  app.useGlobalPipes( new ValidationPipe() )
  const configService = app.get( ConfigService )
  SetSwagget( app )
  const port = configService.get<string>( 'PORT' )
  await app.listen( port, () =>
  {
    console.log( `Server is running on port :${ port }` )

  } )
}
bootstrap()
