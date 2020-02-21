const { expect } = require('chai');
const studentData = require('../student.json');

describe('student.json', function() {
  it('should put correct class on students.json', function() {
    let rawMessage = '기수를 숫자만! 입력해주세요! 예)10';
    expect(studentData.theClass === rawMessage || studentData.theClass === '')
      .to.be.false;
  });

  it('should put correct students on student.json', function() {
    let rawMessage =
      '스프린트를 진행하는 수강생분의 이름을 한글로! 적어주세요! 예)존도우';
    expect(studentData.student === rawMessage || studentData.student === '').to
      .be.false;
  });
});
