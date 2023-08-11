import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order
{

    @Prop( { type: String } )
    name: string

    @Prop( { type: String } )
    price: string

    @Prop( { type: String } )
    phoneNumber: string
}

export const OrderSchema = SchemaFactory.createForClass( Order )