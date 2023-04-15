const Game = require('../models/Game');
const {multipleMongooseToObject} = require('../../util/mongoose');
class SiteController {
    
    //[GET] /
    index(req,res,next){
        /* Game.find({},function(err,games){
            if(!err){
                res.json(games);
            }else{
                next(err);
            }
        }) */
        //giống ở trên nhưng gọn hơn
        Game.find({})
            .then(games=>{
                games = multipleMongooseToObject(games);
                res.render('home',{games})
            })
            .catch(err => next(err));
    }  
    //[GET] /:slug
    search(req,res){
        res.render('search');
    }

};


module.exports = new SiteController ;