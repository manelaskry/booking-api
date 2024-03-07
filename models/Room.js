const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        roomNumber:[{ number:Number, unvailableDates: { type: [Dates]} }],
        capacity:{
            type:Number,
            require:true,
            
        },
        disponibility:{
            type:String,
            require:true,
        }
    },
    {
        timestamps : true 
    }
);

export default mongoose.model("Room",RoomSchema);