import CommonConstants from '@bundle:com.example.fancy_todo/entry/ets/common/constant/CommonConstant';
import { createFile } from '@bundle:com.example.fancy_todo/entry/ets/utils/FilesOperation';
import promptAction from '@ohos:promptAction';
class CustomDialogAoE extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__TaskList = new ObservedPropertyObjectPU([], this, "TaskList");
        this.__alert = new ObservedPropertySimplePU('', this, "alert");
        this.__orgInput = new ObservedPropertySimplePU("New Task", this, "orgInput");
        this.__userInput = new ObservedPropertySimplePU('', this, "userInput");
        this.__orgInputContain = new ObservedPropertySimplePU('', this, "orgInputContain");
        this.__userInputContain = new ObservedPropertySimplePU('', this, "userInputContain");
        this.__orgPriLevel = new ObservedPropertySimplePU(1, this, "orgPriLevel");
        this.__canAdd = new ObservedPropertySimplePU(true, this, "canAdd");
        this.__deepEdit = new ObservedPropertySimplePU(false, this, "deepEdit");
        this.Mode = undefined;
        this.Index = undefined;
        this.controller = undefined;
        this.cancel = undefined;
        this.confirm = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.TaskList !== undefined) {
            this.TaskList = params.TaskList;
        }
        if (params.alert !== undefined) {
            this.alert = params.alert;
        }
        if (params.orgInput !== undefined) {
            this.orgInput = params.orgInput;
        }
        if (params.userInput !== undefined) {
            this.userInput = params.userInput;
        }
        if (params.orgInputContain !== undefined) {
            this.orgInputContain = params.orgInputContain;
        }
        if (params.userInputContain !== undefined) {
            this.userInputContain = params.userInputContain;
        }
        if (params.orgPriLevel !== undefined) {
            this.orgPriLevel = params.orgPriLevel;
        }
        if (params.canAdd !== undefined) {
            this.canAdd = params.canAdd;
        }
        if (params.deepEdit !== undefined) {
            this.deepEdit = params.deepEdit;
        }
        if (params.Mode !== undefined) {
            this.Mode = params.Mode;
        }
        if (params.Index !== undefined) {
            this.Index = params.Index;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__TaskList.purgeDependencyOnElmtId(rmElmtId);
        this.__alert.purgeDependencyOnElmtId(rmElmtId);
        this.__orgInput.purgeDependencyOnElmtId(rmElmtId);
        this.__userInput.purgeDependencyOnElmtId(rmElmtId);
        this.__orgInputContain.purgeDependencyOnElmtId(rmElmtId);
        this.__userInputContain.purgeDependencyOnElmtId(rmElmtId);
        this.__orgPriLevel.purgeDependencyOnElmtId(rmElmtId);
        this.__canAdd.purgeDependencyOnElmtId(rmElmtId);
        this.__deepEdit.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__TaskList.aboutToBeDeleted();
        this.__alert.aboutToBeDeleted();
        this.__orgInput.aboutToBeDeleted();
        this.__userInput.aboutToBeDeleted();
        this.__orgInputContain.aboutToBeDeleted();
        this.__userInputContain.aboutToBeDeleted();
        this.__orgPriLevel.aboutToBeDeleted();
        this.__canAdd.aboutToBeDeleted();
        this.__deepEdit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get TaskList() {
        return this.__TaskList.get();
    }
    set TaskList(newValue) {
        this.__TaskList.set(newValue);
    }
    get alert() {
        return this.__alert.get();
    }
    set alert(newValue) {
        this.__alert.set(newValue);
    }
    get orgInput() {
        return this.__orgInput.get();
    }
    set orgInput(newValue) {
        this.__orgInput.set(newValue);
    }
    get userInput() {
        return this.__userInput.get();
    }
    set userInput(newValue) {
        this.__userInput.set(newValue);
    }
    get orgInputContain() {
        return this.__orgInputContain.get();
    }
    set orgInputContain(newValue) {
        this.__orgInputContain.set(newValue);
    }
    get userInputContain() {
        return this.__userInputContain.get();
    }
    set userInputContain(newValue) {
        this.__userInputContain.set(newValue);
    }
    get orgPriLevel() {
        return this.__orgPriLevel.get();
    }
    set orgPriLevel(newValue) {
        this.__orgPriLevel.set(newValue);
    }
    get canAdd() {
        return this.__canAdd.get();
    }
    set canAdd(newValue) {
        this.__canAdd.set(newValue);
    }
    get deepEdit() {
        return this.__deepEdit.get();
    }
    set deepEdit(newValue) {
        this.__deepEdit.set(newValue);
    }
    editIcon(icon, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(icon);
            Image.objectFit(ImageFit.Contain);
            Image.size({ width: '36vp', height: '36vp' });
            Image.onClick(() => {
                Context.animateTo({ duration: 300, curve: Curve.EaseInOut }, () => {
                    this.deepEdit = !this.deepEdit;
                    if (this.deepEdit)
                        this.alert = '请完善任务细节';
                    else
                        this.alert = '请输入任务名称';
                });
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
    }
    setController(ctr) {
        this.controller = ctr;
    }
    aboutToAppear() {
        if (this.Mode === 'edit') {
            let tmp = this.TaskList[this.Index];
            this.orgInput = this.userInput = tmp.name;
            this.orgInputContain = this.userInputContain = tmp.contain;
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.backgroundColor('#e9000000');
            Column.height(this.deepEdit ? CommonConstants.DIALOG_EDIT_HEIGHT : CommonConstants.DIALOG_DEFAULT_HEIGHT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('Create new task');
            Text.fontSize(20);
            Text.margin({ top: 10, bottom: 10 });
            Text.fontColor('#ffffffff');
            Text.height(30);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create({ space: '5vp' });
            Row.align(Alignment.Start);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ text: this.orgInput, placeholder: 'New Task' });
            TextInput.width('80%');
            TextInput.margin({ bottom: 10 });
            TextInput.placeholderColor('#77ffffff');
            TextInput.backgroundColor('#aa3e3e3e');
            TextInput.fontColor('#ffffffff');
            TextInput.height(40);
            TextInput.onChange((value) => {
                if (value === '') {
                    this.alert = '字段不可为空';
                    this.canAdd = false;
                }
                else {
                    if (this.deepEdit) {
                        this.alert = '请完善任务细节';
                    }
                    else {
                        this.alert = '请输入任务名称';
                    }
                    this.userInput = value;
                    this.canAdd = true;
                }
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.deepEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.editIcon.bind(this)({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.editIcon.bind(this)({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.alert);
            Text.fontColor(this.canAdd ? '#ffffffff' : '#ffff0000');
            Text.margin({ bottom: 10 });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.deepEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        TextArea.create({ text: this.orgInputContain, placeholder: 'Task Detail' });
                        TextArea.size({ width: '80%', height: '200vp' });
                        TextArea.margin({ bottom: 10 });
                        TextArea.placeholderColor('#77ffffff');
                        TextArea.backgroundColor('#aa3e3e3e');
                        TextArea.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
                        TextArea.onChange((str) => {
                            this.userInputContain = str;
                        });
                        if (!isInitialRender) {
                            TextArea.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ justifyContent: FlexAlign.End });
            Flex.height(this.deepEdit ? 60 : 80);
            Flex.align(Alignment.Bottom);
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('cancel', { type: ButtonType.Normal });
            Button.width('50%');
            Button.height('100%');
            Button.onClick(() => {
                this.controller.close();
                this.cancel();
            });
            Button.backgroundColor('#ff2b2b2b');
            Button.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            Button.margin({ right: '1vp' });
            Button.fontSize(30);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('confirm', { type: ButtonType.Normal });
            Button.width('50%');
            Button.height('100%');
            Button.onClick(() => {
                if (!this.canAdd) {
                    promptAction.showToast({ message: '名称不能为空！', duration: 700 });
                    return;
                }
                // 添加模式
                if (this.Mode === 'add') {
                    this.TaskList.push({
                        name: this.userInput,
                        contain: this.userInputContain,
                        isSelect: false,
                        priorityLevel: this.orgPriLevel,
                    });
                }
                // 编辑模式
                else if (this.Mode === 'edit') {
                    let tmp = {
                        name: this.userInput,
                        contain: this.userInputContain,
                        isSelect: false,
                        priorityLevel: this.orgPriLevel,
                    };
                    this.TaskList.splice(this.Index, 1, tmp);
                }
                let str = JSON.stringify(ObservedObject.GetRawObject(this.TaskList));
                let space = ' ';
                for (var i = 0; i < 16; i++) {
                    space += space;
                    if ((str + space).length >= 65536) {
                        break;
                    }
                }
                // 这里放置创建文件的方法
                createFile('list', str + space);
                this.controller.close();
                this.confirm();
            });
            Button.backgroundColor('#ff2b2b2b');
            Button.fontColor(this.canAdd ? '#ff69b5ff' : '#ff4a4a4a');
            Button.fontSize(30);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CustomDialogDel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__TaskList = new ObservedPropertyObjectPU([], this, "TaskList");
        this.controller = undefined;
        this.cancel = undefined;
        this.confirm = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.TaskList !== undefined) {
            this.TaskList = params.TaskList;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__TaskList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__TaskList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get TaskList() {
        return this.__TaskList.get();
    }
    set TaskList(newValue) {
        this.__TaskList.set(newValue);
    }
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.backgroundColor('#e9000000');
            Column.height('200');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('Delete Selected Tasks?');
            Text.fontSize(20);
            Text.margin({ top: 10, bottom: 10 });
            Text.fontColor('#ffff0000');
            Text.height(30);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({ justifyContent: FlexAlign.SpaceAround });
            Flex.height(160);
            Flex.align(Alignment.Bottom);
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('cancel', { type: ButtonType.Normal });
            Button.width('50%');
            Button.height('100%');
            Button.onClick(() => {
                this.controller.close();
                this.cancel();
            });
            Button.backgroundColor('#ff2b2b2b');
            Button.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            Button.margin({ right: '1vp' });
            Button.fontSize(30);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('Delete', { type: ButtonType.Normal });
            Button.width('50%');
            Button.height('100%');
            Button.onClick(() => {
                this.controller.close();
                let tmpArr = [];
                for (var i = 0; i < this.TaskList.length; i++) {
                    if (this.TaskList[i].isSelect)
                        tmpArr.push(i);
                }
                for (var i = tmpArr.length - 1; i > -1; i--) {
                    this.TaskList.splice(tmpArr[i], 1);
                }
                // 这里放置创建文件的方法
                let str = JSON.stringify(ObservedObject.GetRawObject(this.TaskList));
                let space = ' ';
                for (var i = 0; i < 16; i++) {
                    space += space;
                    if ((str + space).length >= 65536) {
                        break;
                    }
                }
                createFile('list', str + space);
                this.confirm();
            });
            Button.backgroundColor('#ffbc0000');
            Button.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            Button.fontSize(30);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export { CustomDialogAoE, CustomDialogDel };
//# sourceMappingURL=CustomDialog.js.map