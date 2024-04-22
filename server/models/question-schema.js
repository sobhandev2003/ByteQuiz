const mongoose =require( "mongoose");
const quizSchema =require('./quiz-schema') ;



const QuestionSchema= new mongoose.Schema({
    QuestionNumber: {
        type: Number,
        required: [true, "Question number required."]
    },
    Question: {
        type: String,
        required: [true, "Quest required."]
    },
    Description:{
        type: String,
        default:null
    },
    Option: {
        type: [String],
        required: [true, "Option required."],
        validate: {
            validator: (value) => {
                return value.length === 4;
            },
            message: "Number of option 4 required."
        }
    },
    CorrectOption: {
        type: String,
        required: [true, "Correct option required."]
    },
    Marks: {
        type: Number,
        required: true
    }
});

const QuizQuestionSchema= new mongoose.Schema({
    QuizId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    AllQuestion: {
        type: [QuestionSchema],
    },
    TotalScore: {
            type:Number
    },
    RemainingScore: {
        type:Number
    }
    
});

// Calculate default marks per question before saving
QuizQuestionSchema.pre("save", async function (next) {
    const quiz = await quizSchema.findById(this.QuizId);
    if (this.AllQuestion.length === quiz?.NumberOfQuestion) {
        quiz.isValid = true;
        await quiz.save();
    }
    next();
});

 const QuestionModel = mongoose.model("Question", QuestionSchema);
 const QuizQuestionModel = mongoose.model("QuizQuestion", QuizQuestionSchema);

 module.exports={QuestionModel,QuizQuestionModel}
