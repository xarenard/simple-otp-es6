/**
 * @class DigestAlgorithms
 *
 */

class DigestAlgorithms {
	static SHA1 = Symbol('SHA1');
	static SHA256 = Symbol('SHA256');
	static SHA512 = Symbol('SHA512');

	static digests = new Map([
		[DigestAlgorithms.SHA1,{ size:20,value:'sha1'}],
		[DigestAlgorithms.SHA256,{size:32,value: 'sha256'}],
		[DigestAlgorithms.SHA512,{size:64,value: 'sha512'}]
	]);

	constructor() {
	}


	static digestsDetails(){
		return DigestAlgorithms.digests;
	}

	/**
	 * @method
	 *
	 * @param {Symbol} algorithm DigestAlgorithms.SHA1|DigestAlgorithms.SHA256|DigestAlgorithms.SHA512
	 * @returns the size of the computed hash
	 */
	static size(algorithm){
		return this.digests.get(algorithm).size;
	}

	/**
	 * @method
	 * @public
	 * @param digestName {String} 'sha1','sha256','sha512'.
	 * @returns DigestAlgorithms.SHA1|DigestAlgorithms.SHA256|DigestAlgorithms.SHA512
	 */
	static from(digestName){
		let algorithm = null;
		switch (string) {
			case 'sha1':
				algorithm = DigestAlgorithms.SHA1;
				break;
			case 'sha256':
				algorithm = DigestAlgorithms.SHA256;
				break;
			case 'sha512':
				algorithm = DigestAlgorithms.SHA512;
				break;
		}
		return algorithm;
	}
	/**
	 * @method
	 * @public
	 * @param digestAlgorithm {Symbol} DigestAlgorithms.SHA1|DigestAlgorithms.SHA256|DigestAlgorithms.SHA512
	 * @returns hash string value according to the symbol
	 */
	static value(algorithm){
		return this.digests.get(algorithm).value;
	}

	/**
	 * @method
	 * @static
	 * @public
	 *
	 *
	 * @returns a list of hash algorithms
	 */
	static list() {
		const digestNames =  Array.from(this.digests.keys());

		return digestNames;
	}
}

export default DigestAlgorithms;
