import { Schema, model, models } from 'mongoose';

const playerSchema = new Schema({
    name : {
        type: 'String', 
        required: true,
    }, 
    phone: {
        type: 'String', 
        required: true,
    }, 
    email: {
        type: 'String', 
        required: true,
    }, 
    isCaptain: {
        type: 'Boolean', 
        default: false,
    }

})

const Players = models.player || model('player', playerSchema);

export default Players;