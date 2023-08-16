import { INestApplication } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const SetSwagget = ( app: INestApplication ) =>
{
    const configService = app.get<ConfigService>( ConfigService )
    const config = new DocumentBuilder()
        .setTitle( `${configService.get<string>('SWAGGER_TITLE')} Service` )
        .setDescription( `The ${configService.get<string>('SWAGGER_DESCRIPTION')} Service API` )
        .setVersion( '1.0' )
        .build()

    const document = SwaggerModule.createDocument( app, config )
    SwaggerModule.setup(configService.get<string>('SWAGGER_URL'), app, document )

}