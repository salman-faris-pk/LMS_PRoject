import "dotenv/config"
import nodemailer,{Transporter} from "nodemailer"
import ejs from "ejs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

interface EmailOptions{
    email: string;
    subject: string;
    template: string;
    data: {[key: string]: any}
};

const sendMail = async(options:EmailOptions): Promise<void> => {
   
    const transporter: Transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service:process.env.SMTP_SERVICE,
        auth: {
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });

    const {email,template,data,subject}=options;
    
    const templatePath= path.join(__dirname, '../mails', template);

    const html:string= await ejs.renderFile(templatePath,data)

    const mailOptons= {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };

    await transporter.sendMail(mailOptons);


};


export default sendMail;