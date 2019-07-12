import {Totp} from '../lib/index';

const totp = new Totp();

const token = totp.createToken({secret: '1234'});
console.log(token);

const options = totp.options;

const isValid = totp.validate({secret: '1234',token: token});
console.log(isValid);