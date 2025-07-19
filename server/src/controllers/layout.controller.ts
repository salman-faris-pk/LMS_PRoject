import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import LayoutModel from "../models/layout.model.js";




// export const createlayout=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
//    try {

//     const { type }=req.body;
//     if(type === 'Banner'){
//         const {title,tagline,subTitle}=req.body;
//          const banner ={
//               title,
//               tagline,
//               subTitle
//           };
//           await LayoutModel.create(banner);
//     };

//     if(type === 'FAQ'){
//         const { faq }=req.body;
//         await LayoutModel.create(faq)
//     };

//     if(type === 'Categories'){
//         const { categories }=req.body;
//         await LayoutModel.create(categories)
//     };

//     res.status(200).json({
//         success:true,
//         message: "Layout created successfully"
//     });
//      } catch (error:any) {
//       return next(new ErrorHandler(error.message, 400)) 
//    }
// });

export const createLayout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { type, ...data } = req.body;

  const existingLayout = await LayoutModel.findOne({ type }).lean();
  if (existingLayout) {
    return next(new ErrorHandler(`${type} layout already exists`, 400));
  }

  let layoutData: any;
  switch (type) {
    case "Banner":
      layoutData = {
        banner: { data }
      };
      break;

    case "FAQ":
      layoutData = {
        faq: data.faq.map((item: any) => ({
          question: item.question,
          answer: item.answer
        }))
      };
      break;

    case "Categories":
      layoutData = {
        categories: data.categories.map((item: any) => ({
          title: item.title
        }))
      };
      break;

    default:
      return next(new ErrorHandler("Invalid layout type", 400));
  }

  await LayoutModel.create({ type, ...layoutData });

  res.status(201).json({
    success: true,
    message: `${type} layout created successfully`
  });
});
  