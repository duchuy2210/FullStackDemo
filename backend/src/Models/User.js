import { Schema, model } from 'mongoose';


const userSchema = new Schema({
  userName:{type:String,maxLength: 30,unique:true,require:true},
  email:{type:String,maxLength: 50,unique:true,require:true},
  password:{type:String,minLength: 4,unique:true,require:true},
  admin:{type:Boolean, default:false}
},{
  timestamps: true,
});

export default model('user',userSchema);