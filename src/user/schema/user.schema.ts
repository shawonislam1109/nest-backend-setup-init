import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDoc = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  role: string;

  //   @Prop({ type: String, required: true })
  //   gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
