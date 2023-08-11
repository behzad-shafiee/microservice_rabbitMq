import { DynamicModule, Module } from "@nestjs/common"
import { RmqService } from "./rmq.service"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ConfigService } from "@nestjs/config"

interface RmqModuleOptions
{
    name: string
}

@Module( {
    providers: [ RmqService ],
    exports: [ RmqService ]
} )
export class RmqModule
{
    static register ( { name }: RmqModuleOptions ): DynamicModule
    {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync( [
                    {
                        name,
                        useFactory: ( configService: ConfigService ) => ( {
                            transport: Transport.RMQ,
                            options: {
                                urls: configService.get( 'RABBIT_MQ_URLS' ),
                                queue: configService.get( `RABBIT_MQ_${ name }_QUEUE` ),
                            }
                        } ),
                        inject: [ ConfigService ]
                    }
                ] )
            ],
            exports: [ ClientsModule ]
        }
    }
}