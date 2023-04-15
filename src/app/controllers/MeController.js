const Game = require('../models/Game');
const {multipleMongooseToObject} = require('../../util/mongoose');
class MeController {
    //[GET] /me/stored/games
    
    stored(req,res,next){
        let gameQuery = Game.find({});
        

        if(req.query.hasOwnProperty('_sort')){
            gameQuery = gameQuery.sort({
                [req.query.column] : req.query.type
            })
        }


        //viết chung
        Promise.all([gameQuery,Game.countDocumentsDeleted()])   
               .then(([games,deleteGames])=>{
                    res.render('me/stored_games',{
                        deleteGames,
                        games: multipleMongooseToObject(games)
                    })  
               })
               .catch(next)
        

        //Khi viết riêng
        /* Game.countDocumentsDeleted()
            .then(deleteGames=>console.log(games))
            .catch(next)

        Game.find({})
            .then(games=>{
                games = multipleMongooseToObject(games);
                res.render('me/stored_games',{games})
            })
            .catch(err => next(err)); */
    }
    //[GET] /me/trash/games
    trash(req, res, next){
        Game.findDeleted({})
            .then(games=>{
                games = multipleMongooseToObject(games);
                res.render('me/trash_games',{games})
            })
            .catch(err => next(err));
    }
};


module.exports = new MeController ;