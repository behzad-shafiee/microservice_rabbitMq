import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { PassportStrategy } from "@nestjs/passport"
import * as bcrypt from 'bcrypt'
import { Model } from "mongoose"
import { Strategy } from "passport-local"
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


    async validate ( email: string, password: string ): Promise<UserDocument>
    {

        const user = await this.userModel.findOne( { email } )
        if ( !user || !await bcrypt.compare( password, user.password ) )
        {
            throw new UnauthorizedException( "user does not exists" )
        }
        return user
    }
}