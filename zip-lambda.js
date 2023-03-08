const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('lambda-function.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Zip file created: ${archive.pointer()} total bytes`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add the Lambda function code to the zip file
archive.directory('./lambda/', false);

archive.finalize();
