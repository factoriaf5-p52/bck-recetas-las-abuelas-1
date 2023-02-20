/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { CommentSchema } from './comment.schema';



export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
/*   @Prop({ type: Object, unique: true })
  _id: ObjectId; */

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  author: ObjectId;

  @Prop(raw({
    ingredient:{type: mongoose.Schema.Types.ObjectId,ref: "Ingredient"},
    qty:{type: Number}
  }))
  ingredients: [
    {
    ingredient:ObjectId,
    qty: number
  }
  ];

  @Prop()
  time: number;

  @Prop()
  is_private: boolean;

  @Prop()
  tags: Array<string>;

  @Prop()
  score: number;

  @Prop()
  views: number;

  @Prop([String])
  keywords: string[];

  @Prop([CommentSchema])
  comments: Comment[];
  @Prop()
  photo: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
