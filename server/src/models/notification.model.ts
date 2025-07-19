import mongoose, {Document,Schema,Model} from "mongoose";

export interface INotification extends  Document{
    title:string;
    message:string;
    status:string;
    userId:string;
};


const notificationSchema = new Schema<INotification>({
 title:{
    type:String,
    required:true
 },
 message:{
    type: String,
    required:true
 },
 status:{
    type: String,
    required:true,
    default:"unread"
 },
},{
    timestamps:true
});


notificationSchema.index({ createdAt: 1 });

const NotificationModel : Model<INotification> = mongoose.model('Notfications',notificationSchema);

export default NotificationModel;