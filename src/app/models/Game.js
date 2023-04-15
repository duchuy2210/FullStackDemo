const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');//mongoose-slug-generator
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


const Game = new Schema({
  name:{type:String,maxLength: 30,unique:true,require:true},
  type:{type:String,maxLength: 50,require:true},
  image:{type:String,maxLength: 255,require:true},
  slug: { type: String, maxlength: 255, slug: 'name',unique: true},
  video:{type: String, maxlength: 255,require:true},
},{
  timestamps: true,
});

//add plugin
mongoose.plugin(slug);
Game.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true 
});

module.exports = mongoose.model('Game',Game);