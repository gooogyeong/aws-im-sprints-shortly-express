const utils = require('../../modules/utils');

const { urls } = require('../../models');

module.exports = {
  get: (req, res) => {
    urls
      .findAll()
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.sendStatus(204);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  //localhost:3001/links에 get요청 보냈을 때 response의 body
  //   [
  //     {
  //         "id": 1,
  //         "url": "https://naver.com",
  //         "baseUrl": "localhost:8080",
  //         "code": "D92c6d",
  //         "title": "NAVER",
  //         "visits": 1,
  //         "createdAt": "2020-02-18T14:05:14.000Z",
  //         "updatedAt": "2020-02-18T14:05:14.000Z"
  //     }
  // ]
  post: (req, res) => {
    const { url } = req.body;

    if (!utils.isValidUrl(url)) {
      return res.sendStatus(400);
    }

    utils.getUrlTitle(url, (err, title) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(req.body);
      urls
        .findOrCreate({
          where: {
            url: url
          },
          defaults: {
            baseUrl: req.headers.host,
            title: title
          }
        })
        .then(([result, created]) => {
          if (!created) {
            return res.status(201).json('Already exists');
          }
          res.status(201).json(result); // Created
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500); // Server error
        });
    });
    //postman으로 localhost:30001/links에 
//{url: 'https://daum.net', title: 'Daum'} 이런 body를 가진 Request를 날리면 (cf. x-www-form-urlencoded)
// //{
//   "visits": 0,
//   "id": 2,
//   "baseUrl": "localhost:3001",
//   "title": "Daum",
//   "url": "https://daum.net",
//   "updatedAt": "2020-02-18T15:38:52.735Z",
//   "createdAt": "2020-02-18T15:38:52.735Z",
//   "code": "D67020"
// }
//이런 body를 가진 Response가 오고 웹사이트랑 mysql에도 naver 말고 하나 더 추가됨. 
  }
};
