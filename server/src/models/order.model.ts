import mongoose, {Document,Schema,Model} from "mongoose";

export interface IOrder extends Document{
    courseId:string;
    userId?:string;
    payment_info:object;
};


const orderSchema= new Schema<IOrder>({
   courseId:{
    type:String,
    required:true
   },
   userId:{
    type: String,
    required:true,
   },
   payment_info:{
    typr:Object,
    // required:true
   },
},{
    timestamps:true
});



orderSchema.index({ createdAt: 1 });


const OrderModel: Model<IOrder>= mongoose.model('Order',orderSchema);


export default OrderModel;