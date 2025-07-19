import mongoose,{ Document,Schema,Model } from "mongoose";
import { IUser } from "./user.model.js";

interface IComment extends Document {
  user:IUser;
  question: string;
  questionReplies?: IComment[];
};
interface IReview extends Document {
   user:IUser;
   rating:number;
   comment:string;
   commentReplies: IComment[];
};

interface ILink extends Document{
    title: string;
    url: string;
}

interface ICourseData extends Document{
    title:string;
    desciption:string;
    videoUrl: string;
    videoThumbnail:object;
    videoSection:string;
    videoLength:number;
    videoPlayer:string;
    links: ILink[];
    suggestion:string;
    questions: IComment[];
}

interface ICourse extends Document {
    name:string;
    description:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:object;
    tags:string;
    level:string;
    demoUrl:string;
    benefits:{title: string}[];  //It is an array of objects with title only
    prerequisites:{title:string}[];
    reviews:IReview[];
    courseData:ICourseData[];
    ratings?:number;
    purchased?:number;
};


 const reviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type:Number,
        default:0,
    },
    comment:String,
    commentReplies: [Object]
 },{
    timestamps:true
 });

 const linkSchema = new Schema<ILink>({
    title:String,
    url:String,
 },{
    timestamps:true
 });

 const commentSchema = new Schema<IComment>({
     user:Object,
     question:String,
     questionReplies: [Object]   
 },{
    timestamps:true
 });


const cousreDataSchema: Schema<ICourseData> = new mongoose.Schema({
       videoUrl:String,
       title:String,
       videoSection:String,
       desciption:String,
       videoLength: Number,
       videoPlayer:String,
       links: [linkSchema],
       suggestion:String,
       questions: [commentSchema]
},{
    timestamps:true
});

const courseSchema: Schema<ICourse> = new mongoose.Schema({
     name: {
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true,
     },
    price:{
        type:Number,
        required:true,
     },
     estimatedPrice:{
        type:Number
     },
     thumbnail:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
     },
     tags:{
        type:String,
        required:true
     },
     level:{
        type:String,
        required:true
     },
     demoUrl:{
        type:String,
        required:true
     },
     benefits:[
        {
            title:String
        }
     ],
     prerequisites:[
        {
            title:String
        }
     ],
     reviews:[reviewSchema],
     courseData:[cousreDataSchema],
     ratings:{
        type:Number,
        default:0,
     },
     purchased:{
        type:Number,
        default:0
     },
},{
    timestamps:true
});


courseSchema.index({ createdAt: 1 });
reviewSchema.index({ createdAt: 1 });
commentSchema.index({ createdAt: 1 });


const CourseModel: Model<ICourse>= mongoose.model('Course',courseSchema);

export default CourseModel;