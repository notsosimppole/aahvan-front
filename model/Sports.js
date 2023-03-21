import { Schema, model, models } from 'mongoose';

const sportsSchema = new Schema({
    name : String,
})

const Sports = models.sport || model('sport', sportsSchema);

export default Sports;