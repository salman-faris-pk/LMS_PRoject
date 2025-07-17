import { Request, Response, NextFunction,RequestHandler} from "express";


export const catchAsyncErrors = (theFunc: RequestHandler) => 
     (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };