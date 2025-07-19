import { Document,Model } from "mongoose"



interface MonthData {
    month: string;
    count: number;
};
                            // T is a generic type representing any Mongoose document.It ensures the model passed has documents that follow Mongoose's Document structure
                            //This makes the function reusable for any model (like UserModel, OrderModel, etc.)
export async function generateLast12MonthsData<T extends Document>(model: Model<T>) : Promise<{last12Months: MonthData[]}> {

const last12Months: MonthData[] =[];
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1)

for( let i=11; i>=0; i--){
    // Loop 12 times, starting from 11 down to 0 (represents 12 months) means the loop moves backward from today

    const endDate=new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate() - i * 28);
    // Calculate the end date of the current 28-day period,means last 28 days 

    const startDate=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate() - 28);
    // Calculate the start date by subtracting 28 days from the end date


    const monthYear=endDate.toLocaleDateString('default', {day:'numeric',month:"short",year:"numeric"});
     // Format the end date to a readable string like "19 Jul, 2025


    const count=await model.countDocuments({  //checks all models in db
        createdAt: {
            $gte: startDate,
            $lt: endDate
        }
    });
    last12Months.push({month: monthYear,count})
}

return {
  last12Months
};

};