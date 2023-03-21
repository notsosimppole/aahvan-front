import { Schema, model, models } from 'mongoose';
import Players from './Player';
import Sports from './Sports';

const teamSchema = new Schema({
    name : {
        type: 'String', 
        required: true,
    }, 
    college: {
        type: 'String', 
    },
    sport: {
        type: mongoose.Schema.Types.Sports,
        ref: "sport",
        required: true
    },
    players: [{
    type: mongoose.Schema.Types.Player, 
    ref: 'player'
    }],

})

const Teams = models.team || model('team', teamSchema);

export default Teams;