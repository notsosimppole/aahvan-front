
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema'
import { hash } from 'bcryptjs';
import clientPromise from './../../../lib/mongodb';

export default async function handler(req, res){
    connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))

    const client = await clientPromise;
    const db = client.db("users");

    // only post method is accepted
    if(req.method === 'POST'){

        if(!req.body) return res.status(404).json({ error: "Don't have form data...!"});
        const { username, email, password } = req.body;

        // check duplicate users
        const checkexisting = await db.collection("users").findOne({ email });
        if(checkexisting) return res.status(422).json({ message: "User Already Exists...!"});

        // hash password
        db.collection("users").insertOne({ username, email, password : await hash(password, 12)}).then((err, data)=> {
            if(err) return res.status(404).json({ err });
            res.status(201).json({ status : true, user: data})
        }).catch(error => {
            res.json(error)});

    } else{
        res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
    }

}