import {createHmac} from 'crypto';
import DigestAlgorithms from '../codec/digest';

/**
 * @class OTP
 *
 */
export default class OTP {

	static DIGEST_ALGORITHMS = DigestAlgorithms.digestsDetails();

	constructor(options){
		this._options = Object.assign({},this.defaultOptions(),options);
	}

	hashSize(algorithm){
		if(!OTP.DIGEST_ALGORITHMS.has(algorithm)){
			throw new Error('Invalid Digest');
		}
		return OTP.DIGEST_ALGORITHMS.get(algorithm).size;
	}

	get options(){
		return this._options;
	}

	defaultOptions(){
		return Object.assign(
			{}, {
				algorithm: DigestAlgorithms.SHA1,
				tokenLength: 6,
				secretEncoding: 'ascii',
				step: 30
			});
	}

	tokenize(data) {
		const {counter, secret,secretEncoding = this.options.secretEncoding} = data;
		let {algorithm, tokenLength} = this.options;

		if(!secret){
			throw new Error('Secret not defined');
		}
		const secret_buffer_size = this.hashSize(algorithm); // 20,32, 64 bytes for sha1, sha256 and sha512
		const  secretLength = secret.length;

		let secretBuffer = Buffer.from(secret,secretEncoding);//Buffer.isBuffer(secret) ? secret : Buffer.from(secret, options.encoding);

		if(secret_buffer_size && secretLength < secret_buffer_size){
			const newSecret = new Array((secret_buffer_size - secretLength) + 1).join(secretBuffer.toString('hex'));
			secretBuffer =  new Buffer(newSecret, 'hex').slice(0, secret_buffer_size);
		}
		const  hash = createHmac(OTP.DIGEST_ALGORITHMS.get(algorithm).value, secretBuffer).update(counter).digest();
		const offset = hash[hash.length - 1] & 0xf;

		const binary = (hash[offset] & 0x7f) << 24
			| (hash[offset + 1] & 0xff) << 16
			| (hash[offset + 2] & 0xff) << 8
			| (hash[offset + 3] & 0xff);
		let token = new String(binary % Math.pow(10, tokenLength)).toString();

		if (token.length < tokenLength) {
			token = `0${token}`;
		}
		return token;
	}
}
