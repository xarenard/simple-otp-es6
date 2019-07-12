import Index from '../otp';
//import {intToHex} from '../utils';

export default class Hotp extends Index{

	constructor(options) {
		super(Object.assign({tokenLength: 6},options));
	}

	createToken({secret,counter,secretEncoding = 'ascii'}){
		const buf = new Buffer(8);
		for (let i = buf.length - 1; i >= 0; i--) {
			buf[i] = counter & 0xff;
			counter >>= 8;
		}
		return this.tokenize({counter: buf,secret: secret,secretEncoding: secretEncoding});

	}

	validate({token,counter,secret,window,tokenLength,secretEncoding = this.options.secretEncoding} = {}){
		let isValid = false;
		let window_frame = counter + (window || 0);

		let i = counter;
		while(i <= window_frame && !isValid){
			let issuedToken = this.createToken({tokenLength: tokenLength,counter:i,secret: secret,encoding: secretEncoding});
			if (issuedToken.toString() === token) {
				isValid = true;
			}
			i++;
		}
		return isValid;
	}



}

