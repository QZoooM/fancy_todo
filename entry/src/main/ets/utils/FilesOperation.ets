import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';
import util from '@ohos.util';
function createFile(fileName: string, content?: string) {
  let context = getContext(this) as common.UIAbilityContext;
  let filesDir = context.filesDir;
  let file = fs.openSync(filesDir + `/${fileName}.txt`, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
  fs.writeSync(file.fd, content, {encoding: 'utf-8'});
  let buf = new ArrayBuffer(65536);
  let readLen = fs.readSync(file.fd, buf, { offset: 0 });
  let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
  let readString = textDecoder.decodeWithStream(new Uint8Array(buf), { stream: false });
  console.info("the content of file: " + readString.slice(0, readLen));
  fs.closeSync(file);
  return ['读取成功', readString];
}
function simpleReadFile(fileName: string) {
  let context = getContext(this) as common.UIAbilityContext;
  let filesDir = context.filesDir;
  try {
    let file = fs.openSync(filesDir + `/${fileName}.txt`, fs.OpenMode.READ_ONLY);
    let buf = new ArrayBuffer(65536);
    let readLen = fs.readSync(file.fd, buf, { offset: 0 });
    let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
    let readString = textDecoder.decodeWithStream(new Uint8Array(buf), { stream: false });
    fs.closeSync(file);
    return ['读取成功', readString.slice(0,readLen)];
  } catch (err) {
    return ['读取失败', `${err}`];
  }
}
export {
  createFile, simpleReadFile
}