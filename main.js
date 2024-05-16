const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('111.mkv');
const writeStream = fs.createWriteStream('new-mkv.mkv');
const compressorStream = zlib.createGzip();
//
// readStream.on('data', (chunk)=> {
//     writeStream.write('--------------CHUNK START------------------------\n');
//     writeStream.write(chunk);
//     writeStream.write('--------------CHUNK END------------------------\n');
// })
// const args = process.argv.slice(2);
// let a = args[0];
// let b = args[1];
//
// console.log(a);
// console.log(b);
//
// console.log(+a + +b)
// console.log('\x1b[33m%s\x1b[0m', 'hi!')
// const a = process.env.STATUS
// console.log(a)

const handleError = () => {
    console.error('Error stream');
    readStream.destroy();
    writeStream.end('Fatal error');
}
// readStream.pipe(writeStream);
readStream
.on('error', handleError)
.pipe(compressorStream)
.pipe(writeStream)
.on('error', handleError)