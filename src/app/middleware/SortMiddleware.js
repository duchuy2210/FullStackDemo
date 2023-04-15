module.exports = function SortMiddleware(req, res, next) {
    //khi dùng res.locals thì _sort sẽ tự dộng được render trong views
    res.locals._sort = {
        enabled : false,
        type : 'default'
    }//Khởi tạo mạc định

    //gán lại giá trị khi có param _sort
    if(req.query.hasOwnProperty('_sort')){
        /* res.locals._sort.enabled = true;
        res.locals._sort.column = req.query.column;
        res.locals._sort.type = req.query.type; */

        Object.assign(res.locals._sort,{
            enabled : true,
            column : req.query.column,
            type : req.query.type,
        })
    }

    next();

}