import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { RmqContext, Transport } from "@nestjs/microservices"

@Injectable()
export class RmqService
{
    constructor ( private readonly configService: ConfigService ) { }

    getOptions ( queue: string, noAck: boolean )
    {
        return {
            transport: Transport.RMQ,
            options: {
                urls: this.configService.get( 'RABBIT_MQ_URLS' ),
                queue: this.configService.get( `RABBIT_MQ_${ queue }_QUEUE` ),
                noAck,
                persistent: true
            }
        }
    }


    ack ( context: RmqContext )
    {
        const channel = context.getChannelRef()
        const message = context.getMessage()
        channel.ack( message )
    }
}