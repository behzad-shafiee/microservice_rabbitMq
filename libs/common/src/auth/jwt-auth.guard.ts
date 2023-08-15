import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { Observable, catchError, tap } from "rxjs"
import { AUTH_SERVICE } from "./auth.contant"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class JwtAuthGuard implements CanActivate
{
    constructor (
        @Inject( AUTH_SERVICE ) private authClient: ClientProxy
    ) { }

    canActivate ( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean>
    {
        let authenticate: string = ""
        if ( context.getType() == 'http' )
        {
            authenticate = context.switchToHttp().getRequest().cookies.Authenticate
        }
        else if ( context.getType() == 'rpc' )
        {
            authenticate = context.switchToRpc().getData().Authenticate
        }
        if ( !authenticate )
            throw new UnauthorizedException( "no value was provided for Authenticate" )

        return this.authClient.send( "user_authenticate",
            { Authenticate: authenticate }
        ).pipe(
            tap( ( res ) =>
            {
                this.addUserToReq( res, context )
            } ),
            catchError( ( err ) =>
            {
                throw new UnauthorizedException()
            } )
        )

    }

    private addUserToReq ( user: any, ctx: ExecutionContext )
    {
        if ( ctx.getType() == "http" )
        {
            return ctx.switchToHttp().getRequest().user = user
        }
        if ( ctx.getType() == "rpc" )
        {
            return ctx.switchToRpc().getData().user = user
        }
    }
}