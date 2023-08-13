import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt } from "passport-jwt"
import { Strategy } from "passport-jwt"

export interface TokenPayload
{

    userId: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor ( configService: ConfigService )
    {
        {
            super( {
                // jwtFromRequest: ExtractJwt.fromExtractors( [
                //     ( request: any ) =>
                //     {
                //         console.log(request?.cookies.Authenticate);
                        
                //         return request?.cookies.Authenticate
                //     },
                // ] ),
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: configService.get<string>( 'JWT_SECRET' )
            } )
        }
    }

    async validate ( { userId }: TokenPayload )
    {
        try
        {
            console.log("hi");
            
            console.log( userId )

        } catch ( err )
        {
            console.log("hi err");
            
            throw new UnauthorizedException()
        }
    }
}