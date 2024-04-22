const mongoose =require( "mongoose");
const multer =require( "multer");
const { GridFsStorage } =require( "multer-gridfs-storage");
//TODO - 
let storage;
 const connectDB = async() => {
    try {
        const connect=await mongoose.connect(process.env.DB_CONNECTION_STRING);
        const connection =connect.connection;
        storage=new GridFsStorage({db:connection})
        // console.log(storage);
        console.log(`${connection.name} Database Connected.`);

    } catch (error) {
        console.error(error);

    }
}
// console.log(storage);
 const upload=multer({storage})
module.exports= { connectDB, upload }

