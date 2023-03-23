import mongoose form 'mongoose'


const userschema = mongoose.Schema({
    name: String,
    image: String,
    email: String,
    college: String,
    filename: String,
})

export default mongoose.model("User", userschema)