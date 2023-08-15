import { AbstractDocument } from "@app/common/database/abstract-document.schema"
import { NestFactory } from "@nestjs/core"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

@Schema()
export class User
{
    @Prop( { type: String, required: true } )
    email: string

    @Prop( { type: String, required: true } )
    password: string
}

export const UserSchema = SchemaFactory.createForClass( User )