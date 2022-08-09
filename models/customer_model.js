const mongoose = require("mongoose");

customerSchema=new mongoose.Schema({
    customer_id:{
        type:String,
        require:true,
    },
    customer_name:{
        type:String
    },
    email:{
        type:String
    }

});

customer_model=mongoose.model("customer",customerSchema);
module.exports=customer_model