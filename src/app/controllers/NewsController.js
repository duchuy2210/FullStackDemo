
class NewsController {
    
    //[GET] /
    index(req,res){
        res.render('news')
    }  
    //[GET] /search
    show(req,res){
        res.render('search');
    }

}


module.exports = new NewsController ;