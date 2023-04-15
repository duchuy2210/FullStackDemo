const newsRoute = require('./news');
const siteRoute = require('./site');
const gamesRoute = require('./games');
const meRoute = require('./me');

function routes(app) {
  //get trang news và render phía public
  app.use('/news', newsRoute);

  //get trang home và render phía public
  app.use('/', siteRoute);

  //get trang games và render phía public
  app.use('/games', gamesRoute);

  //get trang me và render phía public
  app.use('/me', meRoute);

  /* //Query parameters
    app.get('/search', function (req, res) {
        res.render('search')
    });
    
    app.post('/search', function (req, res) {
        console.log(req.body  )  //chưa tích hợp middleware
        res.render('search')
    }); */
}

module.exports = routes;
