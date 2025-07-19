import "dotenv/config"
import mongoose,{Document,Model,Schema} from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
    _id:string;
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role:string;
    isVerified: boolean;
    courses: Array<{courseId:string}>;
    comparePassword: (password:string) => Promise<boolean>;
    SignAccessToken: ()=> string;
    SignRefreshToken: ()=> string;
};



const userschema: Schema<IUser> = new mongoose.Schema({
     name: {
        type: String,
        required: [true, "Please enter your name"]
     },
     email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function(value:string){
               return emailRegexPattern.test(value)
            },
            message: "please enter a valid email"
        },
        unique: true
     },
     password: {
        type: String,
        minlength: [6, "Password must be atleat 6 characters"],
        select: false
     },
     avatar: {
         public_id: {
           type: String,
         },
         url: {
           type: String,
         }
      },
     role: {
        type: String,
        enum: ["user", "admin","moderator"],
        default: "user"
     },
     isVerified: {
        type: Boolean,
        default: false
     },
     courses: [
        {
            courseId: String
        }
     ],
}, {
    timestamps: true
});


userschema.pre<IUser>('save', async function(next){
     if(!this.isModified('password')){
        next();
     };

     this.password = await bcrypt.hash(this.password, 10);
     next();
});

userschema.methods.SignAccessToken = function(){
   return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN! , {
      expiresIn: '5m'
   })
};

userschema.methods.SignRefreshToken = function(){
   return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN! , {
      expiresIn: '5d'
   })
};

userschema.methods.comparePassword = async function(enteredpassword: string): Promise<boolean>{
    return await bcrypt.compare(enteredpassword, this.password)
};

userschema.index({ createdAt: 1 });

const userModel: Model<IUser> = mongoose.model("User",userschema);

export default userModel;