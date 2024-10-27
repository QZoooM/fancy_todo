import fs from '@ohos:file.fs';
import router from '@ohos:router';
import util from '@ohos:util';
// 这是创建文件的例子，之后可以自己修改
function createFile(fileName, content) {
    // 获取应用文件路径
    let context = getContext(this); // 获取当前应用的信息集
    let filesDir = context.filesDir; // 这里获取的文件夹路径是/data/storage/el2/base/files
    // 新建并打开文件，"OpenMode"文件模式，这里是：读写(对应数字 2 ) 兼 创建(对应数字 64 )
    let file = fs.openSync(filesDir + `/${fileName}.txt`, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    // 写入一段内容至文件，但还不知道用哪种编码写的(ANSI,UTF...)
    // writeLen 是指写入长度，fs.writeSync 是写文件的方法，括号里(文件模式(这里是一种数字?) , 字符内容)
    let writeLen = fs.writeSync(file.fd, content, { encoding: 'utf-8' });
    console.info("The length of str is: " + writeLen);
    // 从文件读取"一段"内容____"一段"确实是一段
    let buf = new ArrayBuffer(65536); // "1024"可能与"一段"相关
    fs.readSync(file.fd, buf, { offset: 0 }); // "offset"指的是从文本文件的第几个字开始读
    let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
    let readString = textDecoder.decodeWithStream(new Uint8Array(buf), { stream: false });
    console.info("the content of file: " + readString);
    // 关闭文件，打开文件后一定要记得关，不然内容无法写入文件，文件无法得到更新
    fs.closeSync(file);
    // 仅用于此页面的返回值，返回成功写入的内容
    return ['读取成功', readString];
}
// 简单读取文件
function simpleReadFile(fileName) {
    // 获取应用文件路径
    let context = getContext(this);
    let filesDir = context.filesDir;
    // 新建并打开文件，"OpenMode"文件模式，这里是：只读(对应数字 0 )
    try {
        let file = fs.openSync(filesDir + `/${fileName}.txt`, fs.OpenMode.READ_ONLY);
        // 从文件读取一段内容
        let buf = new ArrayBuffer(65536);
        fs.readSync(file.fd, buf, { offset: 0 });
        let textDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
        let readString = textDecoder.decodeWithStream(new Uint8Array(buf), { stream: false });
        fs.closeSync(file);
        return ['读取成功', readString];
    }
    catch (err) {
        return ['读取失败', `${err}`];
    }
}
class ClsKs {
    constructor() {
        this.KsArr = [{
                name: 'KsDemo',
                index: -1,
                arr: ['ss', 'Ks', 'Demo'],
            }, {
                name: 'Ks000',
                index: 0,
                arr: ['SS', 'kS', 'dEMO'],
            }];
    }
    getData() {
        return this.KsArr;
    }
}
let Ks = new ClsKs();
class InterfaceTest extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('file Test', this, "message");
        this.__KsArr = new ObservedPropertyObjectPU(Ks.getData(), this, "KsArr");
        this.__writeInput = new ObservedPropertySimplePU('', this, "writeInput");
        this.__fileNameInput = new ObservedPropertySimplePU('', this, "fileNameInput");
        this.__successFeedBack = new ObservedPropertySimplePU('', this, "successFeedBack");
        this.__fileCheck = new ObservedPropertySimplePU('', this, "fileCheck");
        this.__paramReceive = new ObservedPropertyObjectPU(router.getParams(), this, "paramReceive");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.KsArr !== undefined) {
            this.KsArr = params.KsArr;
        }
        if (params.writeInput !== undefined) {
            this.writeInput = params.writeInput;
        }
        if (params.fileNameInput !== undefined) {
            this.fileNameInput = params.fileNameInput;
        }
        if (params.successFeedBack !== undefined) {
            this.successFeedBack = params.successFeedBack;
        }
        if (params.fileCheck !== undefined) {
            this.fileCheck = params.fileCheck;
        }
        if (params.paramReceive !== undefined) {
            this.paramReceive = params.paramReceive;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__KsArr.purgeDependencyOnElmtId(rmElmtId);
        this.__writeInput.purgeDependencyOnElmtId(rmElmtId);
        this.__fileNameInput.purgeDependencyOnElmtId(rmElmtId);
        this.__successFeedBack.purgeDependencyOnElmtId(rmElmtId);
        this.__fileCheck.purgeDependencyOnElmtId(rmElmtId);
        this.__paramReceive.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__KsArr.aboutToBeDeleted();
        this.__writeInput.aboutToBeDeleted();
        this.__fileNameInput.aboutToBeDeleted();
        this.__successFeedBack.aboutToBeDeleted();
        this.__fileCheck.aboutToBeDeleted();
        this.__paramReceive.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get KsArr() {
        return this.__KsArr.get();
    }
    set KsArr(newValue) {
        this.__KsArr.set(newValue);
    }
    get writeInput() {
        return this.__writeInput.get();
    }
    set writeInput(newValue) {
        this.__writeInput.set(newValue);
    }
    get fileNameInput() {
        return this.__fileNameInput.get();
    }
    set fileNameInput(newValue) {
        this.__fileNameInput.set(newValue);
    }
    get successFeedBack() {
        return this.__successFeedBack.get();
    }
    set successFeedBack(newValue) {
        this.__successFeedBack.set(newValue);
    }
    get fileCheck() {
        return this.__fileCheck.get();
    }
    set fileCheck(newValue) {
        this.__fileCheck.set(newValue);
    }
    get paramReceive() {
        return this.__paramReceive.get();
    }
    set paramReceive(newValue) {
        this.__paramReceive.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({
                direction: FlexDirection.Column,
                justifyContent: FlexAlign.Start,
            });
            Flex.width('100%');
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height('5%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.message);
            Text.minFontSize('5vp');
            Text.maxFontSize('30vp');
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({
                direction: FlexDirection.Column,
                justifyContent: FlexAlign.Start,
            });
            Flex.width('100%');
            Flex.height('40%');
            Flex.shadow({ radius: 4, color: '#aa000000', offsetY: 2 });
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height('20%');
            Row.width('100%');
            Row.padding('5vp');
            Row.shadow({ radius: 4, color: '#cc000000', offsetY: 2 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('File Name');
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('20%');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextArea.create();
            TextArea.onChange((str) => {
                this.fileNameInput = str;
            });
            TextArea.width('75%');
            if (!isInitialRender) {
                TextArea.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height('60%');
            Row.width('100%');
            Row.shadow({ radius: 4, color: '#cc000000', offsetY: 2 });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('Writing Content');
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('20%');
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextArea.create();
            TextArea.onChange((str) => {
                this.writeInput = str;
            });
            TextArea.height('100%');
            TextArea.padding('5vp');
            TextArea.width('75%');
            if (!isInitialRender) {
                TextArea.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height('20%');
            Row.alignItems(VerticalAlign.Center);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('Save File');
            Button.onClick(() => {
                let arr = createFile(this.fileNameInput, this.writeInput);
                this.successFeedBack = arr[0];
                this.fileCheck = arr[1];
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('Read File');
            Button.onClick(() => {
                let arr = simpleReadFile(this.fileNameInput);
                this.successFeedBack = arr[0];
                this.fileCheck = arr[1];
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        Flex.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.successFeedBack);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height('40%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create();
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create();
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextArea.create({ text: this.fileCheck });
            if (!isInitialRender) {
                TextArea.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Flex.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new InterfaceTest(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=FileCheck.js.map