import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap ()
{
  const app = await NestFactory.create( AuthModule )

  app.useGlobalPipes( new ValidationPipe() )

  app.use( cookieParser() )

  const config = new DocumentBuilder()
    .setTitle( 'Cats example' )
    .setDescription( 'The cats API description' )
    .setVersion( '1.0' )
    .addTag( 'cats' )
    .build()
    
  const document = SwaggerModule.createDocument( app, config )
  SwaggerModule.setup( 'auth', app, document )

  const configService = app.get<ConfigService>( ConfigService )

  const port = configService.get( "PORT" )

  await app.listen( port, () =>
  {
    console.log( `server is running on port :${ port }` )

  } )
}
bootstrap()
