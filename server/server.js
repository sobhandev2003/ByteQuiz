const express =require( "express");
const cors =require( "cors");
const App = express();
const dotenv =require( 'dotenv');
dotenv.config();
const cookieParser = require('cookie-parser')

const { connectDB } =require( "./config/db_config");
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies with CORS
};

connectDB();
App.use(cors(corsOptions))
App.use(express.json());
App.use(cookieParser())
// // uploadImageInGoogleDrive()
App.use("/users",require('./routes/users_route'));
App.use("/quiz",require('./routes/quiz-route'))
App.use("/question",require('./routes/question-route'))
App.use(require('./middlewares/errorHandler'))
const Port=process.env.PORT || 5000 
App.listen(Port, () => {
    console.log(`App is running http://127.0.0.1:${Port}`);
})

