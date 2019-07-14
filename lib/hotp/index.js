import Index from '../otp';

class Hotp extends Index{

	/**
	 * HOTP constructor
	 *
	 */
	constructor(options) {
		super(Object.assign({tokenLength: 6},options));
	}

	/**
	 * @typedef {Object} HotpTokenizeOptions
	 * @property {String} secret
	 * @property {String} counter
	 * @property {String} secret encoding
	 */

	/**
	 * @method
	 *
	 * @param hotpTokenizeOptions {HotpTokenizeOptions} options to generate a token
	 * @returns {string} hotp token
	 */
	createToken({secret,counter,secretEncoding = 'ascii'}){
		const buf = new Buffer(8);
		for (let i = buf.length - 1; i >= 0; i--) {
			buf[i] = counter & 0xff;
			counter >>= 8;
		}
		return this.tokenize({counter: buf,secret: secret,secretEncoding: secretEncoding});

	}

	/**
	 * @typedef {Object} totpValidationOptions
	 * @property {String} secret
	 * @property {String} counter
	 * @property {String} token
	 * @property {String} windows
	 * @property {String} secret encoding
	 * @property {Integer} tokenLength
	 */

	/**
	 * @method
	 * @public
	 * @param {totpValidationOptions} totpValidationOption Options for totp validation.
	 * @returns {boolean}
	 */
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

export default Hotp;