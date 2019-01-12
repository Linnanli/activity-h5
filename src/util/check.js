
const checkTypes = {
    required: function (value){
        if (value === undefined || value === null || value === ''){
            return false;
        }else{
            return true;
        }
    },
    // mobile : /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
    mobile: /^1\d{10}/,
    idCard : /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
};

const check = function(type,value){
    let checkType = checkTypes[type];

    if (checkType === undefined) return false;
    if (typeof checkType === 'function'){
        return checkType(value);
    }
    return checkType.test(value);
}

export default check;