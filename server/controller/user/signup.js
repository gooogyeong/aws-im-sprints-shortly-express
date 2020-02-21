const { users } = require('../../models');

module.exports = { //http://localhost:3001/user/signup
  post: (req, res) => {
    // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
   // console.log(req)
   
    users.findOrCreate({
      defaults:{
      // email: req.body.email,
      username: req.body.username,
      password: req.body.password}
      ,
      where: {email: req.body.email}
    }).then(result=>{
      if(result[0]._options.isNewRecord){
        //console.log(result)
        res.send(result[0].dataValues)
        // 이런식으로
        // {
        //   "id": 4,
        //   "password": "123456",
        //   "email": "newbie@codestates.com",
        //   "updatedAt": "2020-02-18T13:32:48.866Z",
        //   "createdAt": "2020-02-18T13:32:48.866Z"
        // }
      }else{
        res.status(409).send("Already exists user")
      }
      
      //res.send(result.dataValues); //대충 저장은 함;
    }).catch(err=>{
      console.log(err)
    })
    
  }
};
