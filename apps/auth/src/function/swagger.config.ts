import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const SetSwagget = ( app: INestApplication ) =>
{

    const config = new DocumentBuilder()
        .setTitle( 'Auth Service' )
        .setDescription( 'The Auth Service API' )
        .setVersion( '1.0' )
        .build()

    const document = SwaggerModule.createDocument( app, config )
    SwaggerModule.setup( 'auth', app, document )

}