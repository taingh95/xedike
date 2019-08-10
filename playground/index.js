const jwt = require('jsonwebtoken');
const privateKey = 'nguyenhuutai';
const user = {
    name: "tai",
    password: 'asd',
    age: 20,
    phone: '123123'
}

jwt.sign({user,  iat: Math.floor(Date.now() / 1000) - 30}, privateKey, function(err, token) {
    console.log(token);
});