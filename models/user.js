import mongoose from 'mongoose'


const userschema = mongoose.Schema({
    name: String,
    image: String,
    email: String,
    college: String,
    filename: String,
})

mongoose.models = {}
export default mongoose.model("User", userschema)