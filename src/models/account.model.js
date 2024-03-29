import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';

const accountSchema = new mongoose.Schema({

    accountId:{
        type:String,
        unique:true,
        trim:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userprofiles'
    },

    password:{
        type:String,
        validate: (value) => value.length===6,
        unique:true,
        trim:true
    },

    currentBalance:{
        type:Decimal128,
        default:0.0
    },

    transactions:[{type:mongoose.Schema.Types.ObjectId,ref:'transactions'}]
    

},{timestamps:true});

accountSchema.pre('save',async function (next){
    if(!this.isModified("password"))
        return next();

     this.password = await bcrypt.hash(this.password,10);
     next();   
});

accountSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

const accountModel = mongoose.model('accounts',accountSchema);

export default accountModel;
