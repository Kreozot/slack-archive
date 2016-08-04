const AdmZip = require('adm-zip');
const Promise = require('bluebird');

/**
 * Распаковать файл в папку export
 * @param {String} filename Путь к файлу
 */
function UnzipExport(filename) {
	var zip = new AdmZip(filename);
	const extractAllToAsync = Promise.promisify(zip.extractAllToAsync);
	return del('export/**/*')
		.then(() => extractAllToAsync('export/', true));
}

module.exports = UnzipExport;
