const mongoose = require("mongoose");

inventarySchema=new mongoose.Schema({
    inventory_id:{
        type:String,
        require:true,
    },
    inventory_type:{
        type:String
    },
    item_name:{
        type:String
    },
    available_quantity:{
        type:Number
    }

});

inventary_model=mongoose.model("inventary",inventarySchema);
module.exports=inventary_model