const mongoose=require( "mongoose");



const QuizSchema = new mongoose.Schema({
    User_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User Id required."]
    },
    Name: {
        type: String,
        required: [true, "Quiz name mandatory."],
        minlength: 3
    },
    Description: {
        type: String,
        required: [true, "Quiz description required."],
        minlength: 5
    },
    Category: {
        type: String,
        required: [true, "Quiz category required."]
    },
    Topic: {
        type: String,
        default: "All"
    },
    NumberOfQuestion: {
        type: Number,
        min: 5,
        required: [true, "Number of Question in Quiz required."]
    },
    TotalScore: {
        type: Number,
        min: 5,
        required: [true, "Total Score in Quiz required."]
    },
    PassingScore:{
                type:Number,
                default:0
    },
    NumberOfAttendByAnyone: {
        type: Number,
        default: 0,
        min: 0
    },
    PosterId: {
        type: String,
        default: null,
    },
    TotalNumberOfSubmit: {
        type: Number,
        default: 0,
        min: 0
    },
    Like: {
        type: Number,
        default: 0
    },
    Unlike: {
        type: Number,
        default: 0
    },
    isValid:{
        type:Boolean,
        default:false
    }

},
{
    timestamps: true
});

module.exports= mongoose.model("QUIZ", QuizSchema);
