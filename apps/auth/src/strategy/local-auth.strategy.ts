import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { PassportStrategy } from "@nestjs/passport"
import * as bcrypt from 'bcrypt'
import { Model } from "mongoose"
import { Strategy } from "passport-jwt"
import { LoginDto } from "../dto/login.dto"
import { User, UserDocument } from "../schema/user.schema"

@Injectable()
export class LocalStrategy extends PassportStrategy( Strategy ) {
    constructor (
        private configService: ConfigService,
        @InjectModel( User.name ) private userModel: Model<UserDocument>
    )
    {
        super( { usernameField: "email" } )
    }


    async validate ( loginDto: LoginDto )
    {


        const user = await this.userModel.findOne( { email: loginDto.email } )
        const passwordIsValid = await bcrypt.compare( loginDto.password, user.password )
        if ( !user || !passwordIsValid )
        {
            throw new UnauthorizedException( "user does not exists" )
        }
        return user
    }
}