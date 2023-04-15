const path = require('path');
const express = require('express');
const app = express()
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const route = require('./routes');//import route
const db = require('./config/db');
const SortMiddleware = require('./app/middleware/SortMiddleware');
var methodOverride = require('method-override')// THư viện để từ method post thành put...

//Sử dụng đổi method ở query value
app.use(methodOverride('_method'))

//Connect DB
db.connect();

//Sử dụng tập tin tĩnh bằng static
app.use(express.static(path.join(__dirname, 'public')));

//sử dụng middleware để xử lý ở post, req.body
app.use(express.urlencoded({
  extended: true
}));

//library : XMLHttpRequest, Fetch, axios
app.use(express.json());

//Http logger
app.use(morgan('combined'))

//Custom middleware
app.use(SortMiddleware);
//handlebars
app.engine(
    'hbs', 
    engine({
            extname: '.hbs',
            helpers: {  //tạo helper có function là cộng
              sum:(a,b)=>{
                return a + b;
              },
              time:(a,b)=>{
                if(!a){
                  return b;
                }else{
                  return a;
                }
              },
              sortable: (field, sort)=>{

                const icons = {
                    default : 'fa-solid fa-sort',
                    asc : 'fa-solid fa-arrow-down-short-wide',
                    desc : 'fa-solid fa-arrow-down-wide-short' 
                };

                const types = {
                  default: 'desc',
                  asc : 'desc',
                  desc : 'asc',
                }

                const sortType = field === sort.column?sort.type:'default';//debug : khi click dúng vào type của cái nào thì cái đó đổi, còn type khác không đổi trả về mặc định

                const icon = icons[sortType];
                const type = types[sort.type]

                return`<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
              }
            }
          }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'))//thư viện path trả lại dường dẫn

//sứ dụng middleware ở toàn bộ route
/* app.use(bacBaoVe)//với use sẽ áp dụng toàn bộ các route

function bacBaoVe (req, res, next) {
  if(['vethuong','vevip'].includes(req.query.ve)){
    req.face = 'gach dit me may';
    return next();
  }
  res.status(404).json({
      message : 'Not Found'
  });
} */
// cách sử dụng middleware ở từng route 
/* app.get('/middleware',
    function (req, res, next) {
        if(['vethuong','vevip'].includes(req.query.ve)){
          req.face = 'gach dit me may';
          return next();
        }
        res.status(404).json({
            message : 'Not Found'
        });
    },  
    function (req, res, next) {
        res.json({message: 'oke',face: req.face});
    }
    ); */


//home, search, contact

//Routes init
route(app);

//lắng nghe ở port 3000
app.listen(3000, () => {console.log('listening on port http://localhost:3000')});
//middleware step
//step1: kiểm soát->validate
//step2: không cho vào hoặc cho vào
//step3: chỉnh sữa thay đỏi