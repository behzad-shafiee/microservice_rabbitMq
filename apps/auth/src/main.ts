import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'

async function bootstrap ()
{
  const app = await NestFactory.create( AuthModule )
  const port = 3000
  await app.listen( port, () =>
  {
    `server is running on port :${ port }`
  } )
}
bootstrap()
