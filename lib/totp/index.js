import OTP from '../otp';
import {intToHex} from '../utils';

export default class Totp extends OTP {

	constructor(options) {
		super(Object.assign({tokenLength: 8}, options));
	}

	createToken({secret, seconds, step}) {

		const counterTime = seconds && Number.isInteger(seconds) ? new Date(seconds) * 1000 : Date.now();
		const stepValue = (Number.isInteger(step) && step !== 0) ? step : 30;
		let counter = new String(intToHex(Math.floor(counterTime / stepValue / 1000))).padStart(16, '0');
		const counterBuffer = Buffer.from(counter, 'hex');
		return this.tokenize({counter: counterBuffer, secret: secret});
	}

	validate({token, seconds, secret, tokenLength, secretAlgorithm}) {

		const expectedToken = this.createToken({
			seconds: seconds,
			secret: secret,
			tokenLength: tokenLength,
			secretAlgorithm: secretAlgorithm
		});
		return token === expectedToken;
	}
}

