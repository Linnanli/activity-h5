let lastNameArr = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '林', '陈', '刘', '张', '章', '柳'];
let fristNameArr = ['水', '忠', '科', '学', '民', '国', '淼', '苟', '和', '辉', '强', '东', '云', '平'];
let prices = ['3.00', '200.00', '10.00', '12.00', '50.00', '99.99', '20.00', '5.00', '8.88', '500.00', '10.00', '8.88', '3.00', '12.00'];

let prevNum
function getRandom(len) {
    let currentNum = Math.ceil(Math.random() * len - 1);
    if (currentNum === prevNum) {
        return getRandom(len)
    } else {
        return prevNum = Math.ceil(Math.random() * len - 1);
    }
}

export default function (number) {
    let lastName = '',
        fristName = '',
        price = '',
        len = lastNameArr.length,
        res = [];

    for (let i = 0; i < number; i++) {
        let index = getRandom(len)
        lastName = lastNameArr[index];
        fristName = fristNameArr[getRandom(len)];
        res.push({
            name: lastName + '*' + fristName,
            price: i === 4 ? '8888.00' : prices[index]
        });
    }

    return res;
}