import mongoose from 'mongoose';
const db =`mongodb+srv://dinhhung2107:1234@todostate.pko9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;

