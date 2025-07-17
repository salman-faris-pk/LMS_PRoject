import jwt,{ Secret } from "jsonwebtoken";

interface IActivationToken{
    token: string;
    activationcode: string;
};


export const createActivationToken = (user: any): IActivationToken => {
   const activationcode=Math.floor(1000 + Math.random() * 9000).toString(); //generate a 4-digit  number

   const token = jwt.sign(
    { user, activationcode },  
     process.env.ACTIVATION_SECRET as Secret,    
    { expiresIn: "5m" }             
  );

   return{
    activationcode,
    token
   };
};