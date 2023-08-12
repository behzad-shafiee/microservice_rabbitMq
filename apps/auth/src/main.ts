import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap ()
{
  const app = await NestFactory.create( AuthModule )
  
  const configService = app.get<ConfigService>( ConfigService )

  const port = configService.get("PORT")

  await app.listen( port, () =>
  {
    `server is running on port :${ port }`
  } )
}
bootstrap()
