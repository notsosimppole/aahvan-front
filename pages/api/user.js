import { MongoClient } from "mongodb"
import connection from './../../middleware/mongoose';
import User from './../../models/user';

async function handler(req, resp){
    if(req.method === 'POST') {

        for (let i =0; i<req.body.length; i++) {
            let u = new User({
                name: req.body[i].name,
                image: req.body[i].image,
                email: req.body[i].email, 
                college: req.body[i].college, 
                filename: req.body[i].filename
            })
            await u.save()
        }
    // const {name, image, email, college, filename} = req.body
    // const done = "false"
    // if(!heading || !description) return
    
    // const client = await MongoClient.connect(`${process.env.MONGODB_URI}`)
    // const db = client.db("wtf")
    // const collection = db.collection("data")
    // const result = await collection.insertOne({
    //     name: req.body.name,
    //     email: req.body.email,
    //     image: req.body.image,
    //     college:req.body.college,
    //     filename: req.body.filename
    // }, { writeConcern: { w : "majority", wtimeout : 100 } })
    // client.close()
    resp.status(201).json({
        success: "success"
    })
} else if (req.method === "GET"){
    const {name, image, email, college, filename} = req.body

    

    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`)
    const db = client.db("wtf")
    const collection = db.collection("users")

    const result = await collection.find().toArray()
    client.close()
    return resp.status(200).json({result})


} else if(req.method === 'PUT') {
    const {_id, name, image, email, college, filename} = req.body

    // console.log(req.body)

    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`)
    const db = client.db("wtf")
    const collection = db.collection("users")

    const result = await collection.updateOne(
        {email: email}, 
        {
            $set: {
                   filename: filename,
                   college: college
            }
            
           }
           ,{multi: true}
    )
// console.log(email)
// console.log(college + " " + filename)
   
    // console.log(result)
    return resp.status(200).json({result})
} 
else {
    return resp.status(500).json("method not allowed")
}
}
export default connection(handler)