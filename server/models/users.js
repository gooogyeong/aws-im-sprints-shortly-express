//Reference Code
// 'use strict';
    
//     // 크립토 모듈을 불러옵니다.
//     const crypto = require('crypto');
    
//     module.exports = (sequelize, DataTypes) => {
//       const users = sequelize.define(
//         'users',
//         {
//           email: DataTypes.STRING,
//           username: DataTypes.STRING,
//           password: DataTypes.STRING
//         },
//         {
//           hooks: {
//     			// hook을 통해 hashing을 수행합니다.
//     			// c.f. 컨트롤러에서 패스워드를 바로 암호화 할 수도 있습니다.

//     			// 테이블에 데이터가 생성되기 전 실행되는 hook입니다.
//             beforeCreate: (data, options)=>{
//               if(data.password){
//     					var shasum = crypto.createHMAC('sha512', 'thisismysecretkey');
//               shasum.update(data.password);
//               data.password = shasum.digest('hex');
//               }
//             },
//     			// 데이터를 검색하기 전 실행되는 hook입니다.
//             beforeFind: (data, options) => {
//               if (data.where.password) {
//     					var shasum = crypto.createHMAC('sha512', 'thisismysecretkey');
//               shasum.update(data.where.password);
//               data.where.password = shasum.digest('hex');
//               }
//             }
//           }
//         }
//       );
//       users.associate = function(models) {
//         // associations can be defined here
//       };
//       return users;
//     };

'use strict';

const crypto = require('crypto');


module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};


// var shasum = crypto.createHash('sha1'); // shasum은 Hash 클래스의 인스턴스입니다.
// shasum.update('1'); // 해싱할 문자열을 여기에 넣는다
// var output = shasum.digest('hex');
// console.log(output)