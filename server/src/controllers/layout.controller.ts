import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middleware/catchAsynErrors.js"
import LayoutModel from "../models/layout.model.js";



interface FAQItem {
  question: string;
  answer: string;
}

interface CategoryItem {
  title: string;
}

export const createLayout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { type, ...data } = req.body;

  if (await LayoutModel.exists({ type })) {
    return next(new ErrorHandler(`${type} layout already exists`, 400));
  };

  let layoutData;
  switch (type) {
    case "Banner":
      layoutData = { banner: { data } };
      break;
    case "FAQ":
      layoutData = { 
        faq: (data.faq as FAQItem[]).map(({ question, answer }) => ({ question, answer })) 
      };
      break;
    case "Categories":
      layoutData = { 
        categories: (data.categories as CategoryItem[]).map(({ title }) => ({ title })) 
      };
      break;
    default:
      return next(new ErrorHandler("Invalid layout type", 400));
  }

  try {
    await LayoutModel.create({ type, ...layoutData });
    res.status(201).json({
      success: true,
      message: `${type} layout created successfully`,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});


export const editLayout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { type, ...data } = req.body; 
   
  const layoutExists = await LayoutModel.exists({ type });
   if (!layoutExists) {
   return next(new ErrorHandler(`${type} layout not found`, 404));
  };

  let updateData;
  switch (type) {
    case "Banner":
      updateData = { banner: { data } };
      break;
    case "FAQ":
      updateData = { 
        faq: (data.faq as FAQItem[]).map(({ question, answer }) => ({ question, answer })) 
      };
      break;
    case "Categories":
      updateData = { 
        categories: (data.categories as CategoryItem[]).map(({ title }) => ({ title })) 
      };
      break;
    default:
      return next(new ErrorHandler("Invalid layout type", 400));
  }

  try {
    const updatedLayout = await LayoutModel.findOneAndUpdate(
      { type },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: `${type} layout updated successfully`,
      data: updatedLayout
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});


export const getLayoutByType=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction) => {
  try {
     const { type } = req.body;
  
     if (!type) {
      return next(new ErrorHandler("Layout type is required", 400));
     };

    const layout=await LayoutModel.findOne({type});
     if (!layout) {
     return next(new ErrorHandler("Layout not found", 404));
      };

    res.status(200).json({
      success:true,
      layout
    });
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
  }
});