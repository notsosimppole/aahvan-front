import { MongoClient } from "mongodb"


async function handler(req, resp){
    if(req.method === 'POST') {

    const {name, image, email, college, filename} = req.body
    const done = "false"
    // if(!heading || !description) return
    
    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`)
    const db = client.db("wtf")
    const collection = db.collection("data")
    const result = await collection.insertOne({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        college:req.body.college,
        filename: req.body.filename
    }, { writeConcern: { w : "majority", wtimeout : 100 } })
    client.close()
    resp.status(201).json({
        user: result,
        message: "To do created"
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
    const {name, image, email, college, filename} = req.body

    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`)
    const db = client.db("wtf")
    const collection = db.collection("users")

    const result = await collection.updateOne()
} 
else {
    return resp.status(500).json("method not allowed")
}
}
export default handler