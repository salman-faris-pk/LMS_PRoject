import { Schema,model,Document} from "mongoose";



export interface FaqItems extends Document{
    question: string;
    answer:string;
};

export interface Category extends Document{
    title:string;
};


export interface BannerImage extends Document{
    punlic_id:string;
    url:string;
};

interface Layout extends Document{
    type:string;
    faq:FaqItems[];
    categories: Category[];
    banner: {
        image:BannerImage;
        title:string;
        subTitle:string;
    }
};

const faqSchema = new Schema<FaqItems>({
     question:{type:String},
     answer:{type:String},
},{
    timestamps:true
});

const CategoryShema=new Schema<Category>({
    title:{type:String},
});

const bannerImageShema = new Schema<BannerImage>({
     punlic_id: {type:String},
     url: {type:String}
});

const layoutSchema=new Schema<Layout>({
       type:{type:String},
       faq:[faqSchema],
       categories:[CategoryShema],
       banner:{
          image: bannerImageShema,
          title:{type:String},
          subTitle:{type:String},
       }
});


layoutSchema.index({ type: 1 }, { unique: true });

const LayoutModel = model<Layout>('Layout',layoutSchema)    

export default LayoutModel;