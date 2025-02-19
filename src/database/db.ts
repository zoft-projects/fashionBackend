import mongoose from 'mongoose';

const connectToDB = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    return; 
  }

  try {
    await mongoose.connect(process.env.DATABASE as string);
    console.log("_______Mongodb server connected________");
  } 
  catch (err) {
    console.error(`_____Mongodb server not connected reason:: ${err} _____`);
  }
};

export default connectToDB;
