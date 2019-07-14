import OTP from '../otp';
import {intToHex} from '../utils';

/**
 * @class Totp
 */
class Totp extends OTP {

	constructor(options) {
		super(Object.assign({tokenLength: 8}, options));
	}

	/**
	 * @typedef {Object} TotpTokenizeOptions
	 * @property {String} secret
	 * @property {Integer} seconds
	 * @property {String} step
	 */

	/**
	 * @method
	 *
	 * @param totpTokenizeOptions {TotpTokenizeOptions} options to generate a token
	 * @returns {string} totp token
	 */

	createToken({secret, seconds, step}) {

		const counterTime = seconds && Number.isInteger(seconds) ? new Date(seconds) * 1000 : Date.now();
		const stepValue = (Number.isInteger(step) && step !== 0) ? step : 30;
		let counter = new String(intToHex(Math.floor(counterTime / stepValue / 1000))).padStart(16, '0');
		const counterBuffer = Buffer.from(counter, 'hex');
		return this.tokenize({counter: counterBuffer, secret: secret});
	}

	/**
	 * @typedef {Object} hotpValidationOptions
	 * @property {String} secret
	 * @property {Integer} seconds
	 * @property {String} token
	 * @property {Integer} tokenLength
	 */

	/**
	 * @method
	 * @public
	 * @param {totpValidationOptions} totpValidationOption Options for totp validation.
	 * @returns {boolean}
	 */

	validate({token, seconds, secret, tokenLength}) {

		const expectedToken = this.createToken({
			seconds: seconds,
			secret: secret,
			tokenLength: tokenLength
		});
		return token === expectedToken;
	}
}

export default Totp;