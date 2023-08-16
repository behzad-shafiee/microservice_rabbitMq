import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { PassportStrategy } from "@nestjs/passport"
import { Model } from "mongoose"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User, UserDocument } from "../schema/user.schema"



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
                      
                        if ( !request?.Authenticate )
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
        const user = await this.userModel.findOne( { _id: payload.userId } )
        if ( !user )
        {
            throw new UnauthorizedException( "user does not exists" )
        }
        return user
    }
}