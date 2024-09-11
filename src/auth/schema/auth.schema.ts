import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDoc = Auth & Document;

@Schema()
export class Auth {
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  role: string;

  //   @Prop({ type: String, required: true })
  //   gender: string;
}

export const UserSchema = SchemaFactory.createForClass(Auth);
