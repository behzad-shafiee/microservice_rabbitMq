import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ClientProxy } from "@nestjs/microservices"
import { User, UserDocument } from './schema/user.schema'
import { LoginDto } from './dto/login.dto'
import { Response } from "express"
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RegisterDto } from './dto/register.dto'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService
{
  constructor (
    @Inject( 'AUTH_SERVICE' ) private client: ClientProxy,
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
