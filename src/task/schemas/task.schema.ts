import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import mongoose from "mongoose";

export enum Status {
    COMPLETED = 'completed',
    INPROGRESS = 'in-progress',
}
@Schema({
    timestamps:true
})
export class Task {
    @Prop()
    title:string;
    
    @Prop()
    description: string;

    @Prop()
    status: Status

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User'})
    user:User
}

export const TaskSchema = SchemaFactory.createForClass(Task)