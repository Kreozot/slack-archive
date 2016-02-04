 var AdmZip = require('adm-zip');

 function UnzipExport(filename) {
 	var zip = new AdmZip(filename);
 	zip.extractAllTo('export/');
 }

module.exports = UnzipExport;
