//Reference Code
const express = require('express');
    const bodyParser = require('body-parser');
    
    const cors = require('cors');
    const session = require('express-session');
    const cookieParser = require('cookie-parser');
    const FileStore = require('session-file-store')(session)
    
    const userRouter = require('./routes/user');
    const linksRouter = require('./routes/links');
    
    const { urls } = require('./models');
    
    const morgan = require('morgan');
    
    const app = express();
    const port = 3001;
    
    /**
     * session(옵션 객체)으로 세션 미들웨어를 설정할 수 있습니다. 
     * secret - session hijacking을 막기 위해 hash에 추가로 들어가는 갑ㅅ으로, Salt와 비슷한 개념입니다.
     * resave - session을 항상 저장할지, 또는 변화가 있을 때만 저장할지 정하는 갑ㅅ.
     * saveUninitialize: 이 갑ㅅ이 true이면, 세션이 구동되기 전에는 초기화되지 않은 상태로 만들어 저장합니다. ??
     */ 
    app.use(session({
      secret: '@codestates',
      resave: false,
      saveUninitialized: true
    }));
    
    /**
     * cookieParser() - 넘어온 Cookie 데이터를 관리하기 쉽게 JSON 객체로 변환해 주는 라이브러리입니다.
     */
    app.use(cookieParser());
    
    /**
     * bodyparser.json() - body로 넘어온 데이터를 JSON 객체로 변환합니다.
     */
    app.use(bodyParser.json());
    
    /**
     * bodyParser.urlencoded({ extended }) - 중첩 객체를 허용할지 말지를 결정하는 옵션.
     * 참고 링크(https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436)
     */
    app.use(bodyParser.urlencoded({ extended: false }));
    
    /**
     * cors() - CORS를 대응하기 위한 라이브러리 ( Access-Control-Allow-Origin: * )
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
     */
    app.use(cors({
      origin:['http://shortly-express-minkyung.s3-website.us-east-2.amazonaws.com'], //원래 'http://localhost:3000'
      methods:['GET','POST'],
      credentials: true
    }));
    
    /**
     * morgan() - 요청에 대한 정보를 보여주는 logging 미들웨어입니다.
     */
    app.use(morgan('dev'));
    
    app.get('/', (req, res) => {
    // root로 get 요청을 보냈을 때, 성공하면 200번 상태 코드와 'Success'라는 메시지를 반환합니다.             
      res.status(200).send('Success')      
    })
    
/*
mysql> describe urls;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| url       | varchar(255) | YES  |     | NULL    |                |
| baseUrl   | varchar(255) | YES  |     | NULL    |                |
| code      | varchar(255) | YES  |     | NULL    |                |
| title     | varchar(255) | YES  |     | NULL    |                |
| visits    | int(11)      | NO   |     | 0       |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
8 rows in set (0.00 sec)

mysql> select * from urls;
+----+-------------------+----------------+--------+-------+--------+---------------------+---------------------+
| id | url               | baseUrl        | code   | title | visits | createdAt           | updatedAt           |
+----+-------------------+----------------+--------+-------+--------+---------------------+---------------------+
|  1 | https://naver.com | localhost:8080 | D92c6d | NAVER |      1 | 2020-02-18 12:05:28 | 2020-02-18 12:05:28 |
+----+-------------------+----------------+--------+-------+--------+---------------------+---------------------+

*/

    // D로 시작하는 path로 get 요청이 들어오면 동작합니다. 
    //postman으로 http://localhost:3001/D92c6d에 get 요청 보내면 visits 1 올라간다. 
    app.get('/D*', (req, res) => {
      urls
        .findOne({
          where: {
            code: 'D' + req.params[0]
    				// req.params는 도메인 명 다음부터 쌓입니다
    				// e.g. https://naver.com/params[0]/params[1]/params[2]
          }
        })
        .then(result => {
          console.log(result);
          if (result) {
    				// findOne으로 찾은 데이터의 visits 필드를 업데이트 합니다.
            result.update({
              visits: result.visits + 1
            });
            // 해당 데이터의 url 필드에 기록된 주소로 redirect 합니다.
            res.redirect(result.url);
          } else {
            res.sendStatus(204); //?
          }
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500);
        });
    });
    
    app.use('/user', userRouter);
    app.use('/links', linksRouter);
    
    app.set('port', port);
    app.listen(app.get('port'), () => {
      //console.log(`app is listening in PORT ${app.get('port')}`);
    });
    
    module.exports = app;

// const express = require('express');
// const bodyParser = require('body-parser');

// const cors = require('cors');
// const session = require('express-session');
// var FileStore = require('session-file-store')(session)
// //var MySQLStore = require('express-mysql-session')(session);
// const cookieParser = require('cookie-parser');

// const userRouter = require('./routes/user');
// const linksRouter = require('./routes/links');

// const { urls } = require('./models');

// const morgan = require('morgan');

// const app = express();
// const port = 3001;

// // var sessionStore = new MySQLStore(options); 

// // var options ={                                               
// //   host: 'root',
// //   port: 3001,
// //   user: 'root',
// //   password: '12345',
// //   database: 'shortly'
// // };

// app.use(
//   session({
//     secret: '@codestates',
//     resave: false,
//     saveUninitialized: true,
//     store:new FileStore()
//   })
// );

// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     methods: ['GET', 'POST'],
//     credentials: true
//   })
// );

// // ? POSTMAN을 통한 test에 필요할지도 모릅니다. logging을 활용하세요.
// // app.use(morgan('dev'));

// // TODO : GET / 요청에 대한 응답을 작성해주세요. (api 구현을 가볍게 시작해보세요.)
// // app. ...

// app.get('/D*', (req, res) => {
//   urls
//     .findOne({
//       where: {
//         code: 'D' + req.params[0]
//       }
//     })
//     .then(result => {
//       if (result) {
//         result.update({
//           visits: result.visits + 1
//         });
//         res.redirect(result.url);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       res.sendStatus(500);
//     });
// });

// app.get('/', function(req, res){res.send("Success")})

// app.use('/user', userRouter);
// app.use('/links', linksRouter);

// app.set('port', port);
// app.listen(app.get('port'), () => {
//   console.log(`app is listening in PORT ${app.get('port')}`);
// });

// module.exports = app;
