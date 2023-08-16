import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Response } from "express"
import { Model } from 'mongoose'
import { RegisterDto } from './dto/register.dto'
import { User, UserDocument } from './schema/user.schema'

@Injectable()
export class AuthService
{
  constructor (
    @InjectModel( User.name ) private userModel: Model<UserDocument>,
    private confgService: ConfigService,
    private jwtService: JwtService
  ) { }

  async register ( registerDto: RegisterDto ): Promise<User>
  {
    const user = new this.userModel( {
      email: registerDto.email,
      password: await bcrypt.hash( registerDto.password, 10 )
    } )
    await user.save()
    if ( !user )
      throw new Error( "err new user does not created !" )
    return user
  }

  async login ( user: UserDocument, res: Response ): Promise<any>
  {
    const tokenPayload = {
      userId: user._id,
    }

    let token = this.jwtService.sign( tokenPayload )
    let expires = new Date()
    expires = expires.getSeconds() + this.confgService.get( 'JWT_EXPIRES_IN' )
    res.cookie( 'Authenticate', token, {
      expires
    } )
    return {
      result: `Hi ${ user.email } Wellcome to Site`
    }
  }
}
