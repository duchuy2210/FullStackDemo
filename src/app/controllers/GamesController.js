const Game = require('../models/Game');
const {mongooseToObject} = require('../../util/mongoose');

class GamesController {
    show(req,res,next){
        Game.findOne({ slug : req.params.slug })
            .then(game => {
                game = mongooseToObject(game) ;
                res.render('games/show',{ game });
            })
            .catch(next)
    }
    //[GET] /courses/create
    create(req,res,next){
        res.render('games/create')
    }
    //[POST] /courses/store
    store(req,res,next){
        const game = new Game(req.body);
                game.save()//mongoose/models/constructing documents
                    .then(() => {
                        res.redirect('/');//nếu thêm thành công sẽ quay về trang chủ espress redirect
                    })
                    .catch(next)
    }
    //[GET] /games/:id/edit
    edit(req,res,next){
        Game.findById(req.params.id)
            .then(game => {
                game = mongooseToObject(game) ;
                res.render('games/edit',{game});
            })
            .catch(next)
        
    }
    //[PUT] /games/:id
    update(req,res,next){
        Game.findByIdAndUpdate(req.params.id,req.body)
            .then(()=>{
                res.redirect('/me/stored/games')
            })
            .catch(next)
    }
    //[DELETE] /games/:id
    delete(req,res,next){
        Game.delete({_id:req.params.id})
            .then(()=>{
                res.redirect('back')
            })
            .catch(next)
    }
    //[DELETE] /games/:id/destroy
    destroy(req,res,next){
        Game.deleteOne({_id:req.params.id})
            .then(()=>{
                res.redirect('back')
            })
    }
    //[GET] /games/:id/restore
    restore(req,res,next){
        Game.restore({_id:req.params.id})
            .then(()=>{
                res.redirect('back')
            })
            .catch(next)
    }

    //[POST] /games/handleFormActions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete': 
                Game.delete({_id:req.body.gameIds})
                .then(()=>{
                    res.redirect('back')
                })
                .catch(next)
            break;
            default: res.json({message :'Action is valid'})
        }
    }
    //[POST] /games/handleTrashFormActions
    handleTrashFormActions(req, res, next){
        switch(req.body.action){
            case 'delete': 
                Game.deleteMany({_id:req.body.gameIds})
                    .then(()=>{
                        res.redirect('back')
                    })
                    .catch(next)
            break;
            case 'restore':
                Game.restore({_id:req.body.gameIds})
                    .then(()=>{
                        res.redirect('back')
                    })
                    .catch(next)
            break;
            default: res.json({message :'Action is valid'})
        }
    }

    
}

module.exports = new GamesController;