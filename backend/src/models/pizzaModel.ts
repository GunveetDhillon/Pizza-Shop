import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Pizza {
  public _id?: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public slug!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public stock!: number;

  @prop({ required: true })
  public category!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public description!: string;
}

export const PizzaModel = getModelForClass(Pizza);
