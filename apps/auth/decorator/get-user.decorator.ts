import { ExecutionContext, createParamDecorator } from "@nestjs/common"

export const GetUser = createParamDecorator( ( data: any, ctx: ExecutionContext ) =>
{
    if ( ctx.getType() == 'http' )
    {
        return ctx.switchToHttp().getRequest().user
    }
    if ( ctx.getType() == 'rpc' )
    {
        return ctx.switchToRpc().getData().user
    }
} )