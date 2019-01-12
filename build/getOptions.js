const mate = require('../mate');

exports.getConfig = function (name) {
    let person_list = mate.person_list;
    for (let key in mate.person_list) {
        if (key === name) {
            return mate.person_list[key];
        }
    }
}

exports.getAllName = function () {
    return Object.keys(mate.person_list);
}