import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User, UserDocument } from "../schema/user.schema"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"

export interface TokenPayload
{

    userId: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' ) {

    userModel: Model<UserDocument>
    constructor (
        configService: ConfigService,
        @InjectModel( User.name ) userModel: Model<UserDocument>
    )
    {
        {
            super( {

                jwtFromRequest: ExtractJwt.fromExtractors( [
                    ( request: any ) =>
                    {
                        console.log('request?.Authenticate ===>',request?.Authenticate);
                        
                        if ( !request?.Authenticate)
                        {
                            throw new UnauthorizedException()
                        }
                        return request?.Authenticate
                    },
                ] ),
                secretOrKey: configService.get<string>( 'JWT_SECRET' )
            } )
        }
        this.userModel = userModel
    }

    async validate ( payload: any )
    {
        console.log('payload ===>',payload);
        
        const user = await this.userModel.findOne( { _id: payload.userId } )
        if ( !user )
        {
            throw new UnauthorizedException( "user does not exists" )
        }
        return user
    }
}