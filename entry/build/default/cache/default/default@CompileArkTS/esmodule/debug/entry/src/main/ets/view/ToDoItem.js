import CommonConstants from '@bundle:com.example.fancy_todo/entry/ets/common/constant/CommonConstant';
import { CustomDialogAoE } from '@bundle:com.example.fancy_todo/entry/ets/view/CustomDialog';
export default class ToDoItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__TaskList = new ObservedPropertyObjectPU([], this, "TaskList");
        this.__Task = new ObservedPropertyObjectPU(null, this, "Task");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.__isComplete = new ObservedPropertySimplePU(false, this, "isComplete");
        this.__isRelax = new ObservedPropertySimplePU(false, this, "isRelax");
        this.dialogEdit = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogAoE(this, {
                    TaskList: this.TaskList,
                    Mode: 'edit',
                    Index: this.index,
                    confirm: this.editAccept,
                    cancel: this.editCancel,
                });
                jsDialog.setController(this.dialogEdit);
                ViewPU.create(jsDialog);
            },
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.TaskList !== undefined) {
            this.TaskList = params.TaskList;
        }
        if (params.Task !== undefined) {
            this.Task = params.Task;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.isComplete !== undefined) {
            this.isComplete = params.isComplete;
        }
        if (params.isRelax !== undefined) {
            this.isRelax = params.isRelax;
        }
        if (params.dialogEdit !== undefined) {
            this.dialogEdit = params.dialogEdit;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__TaskList.purgeDependencyOnElmtId(rmElmtId);
        this.__Task.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__isComplete.purgeDependencyOnElmtId(rmElmtId);
        this.__isRelax.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__TaskList.aboutToBeDeleted();
        this.__Task.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__isComplete.aboutToBeDeleted();
        this.__isRelax.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get TaskList() {
        return this.__TaskList.get();
    }
    set TaskList(newValue) {
        this.__TaskList.set(newValue);
    }
    get Task() {
        return this.__Task.get();
    }
    set Task(newValue) {
        this.__Task.set(newValue);
    }
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
    }
    get isComplete() {
        return this.__isComplete.get();
    }
    set isComplete(newValue) {
        this.__isComplete.set(newValue);
    }
    get isRelax() {
        return this.__isRelax.get();
    }
    set isRelax(newValue) {
        this.__isRelax.set(newValue);
    }
    editAccept() { }
    editCancel() { }
    labelIcon(icon, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(icon);
            Image.objectFit(ImageFit.Contain);
            Image.size(CommonConstants.TINY_SIZE_IMAGE);
            Image.margin({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
            Image.onClick(() => {
                this.isComplete = !this.isComplete;
                let tmp = this.TaskList[this.index];
                tmp.isSelect = this.isComplete;
                this.TaskList.splice(this.index, 1, tmp);
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
    }
    relaxIcon(icon, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(icon);
            Image.objectFit(ImageFit.Contain);
            Image.size(CommonConstants.TINY_SIZE_IMAGE);
            Image.margin({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({
                direction: this.isRelax ? FlexDirection.Column : FlexDirection.Row,
                justifyContent: FlexAlign.Start,
            });
            Flex.backgroundColor('#b7262626');
            Flex.borderRadius('8vp');
            Flex.margin('4vp');
            Flex.shadow(CommonConstants.SHADOW_DEFAULT_CONFIG);
            Flex.height(this.isRelax ? 270 : 90);
            Flex.padding(10);
            Flex.borderRadius(8);
            Flex.width(CommonConstants.LIST_DEFAULT_WIDTH);
            Flex.onClick(() => {
                Context.animateTo({ duration: 300, curve: Curve.EaseInOut }, () => {
                    this.isRelax = !this.isRelax;
                });
            });
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.labelIcon.bind(this)({ "id": 16777237, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.labelIcon.bind(this)({ "id": 16777239, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.Task.name);
            Text.fontSize({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
            Text.fontColor(CommonConstants.FONT_LIST_COLOR);
            Text.width('50%');
            Text.fontWeight(CommonConstants.FONT_WEIGHT);
            Text.margin({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
            Text.opacity(this.isComplete ?
                CommonConstants.OPACITY_COMPLETED :
                CommonConstants.OPACITY_DEFAULT);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.End);
            Row.width('20%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isRelax) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.relaxIcon.bind(this)({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.relaxIcon.bind(this)({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isRelax) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Row.create();
                        if (!isInitialRender) {
                            Row.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Column.create();
                        Column.backgroundColor('#ff222222');
                        Column.borderRadius('8vp');
                        Column.shadow(CommonConstants.SHADOW_DEFAULT_CONFIG);
                        Column.margin({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                        Column.height('50%');
                        if (!isInitialRender) {
                            Column.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Scroll.create();
                        Scroll.align(Alignment.TopStart);
                        if (!isInitialRender) {
                            Scroll.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create(this.Task.contain);
                        Text.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
                        Text.width('80%');
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Row.create();
                        Row.height('10vp');
                        if (!isInitialRender) {
                            Row.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Row.pop();
                    Scroll.pop();
                    Column.pop();
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Column.create();
                        if (!isInitialRender) {
                            Column.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                        Image.objectFit(ImageFit.Contain);
                        Image.size(CommonConstants.MID_SIZE_IMAGE);
                        Image.margin({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
                        Image.onClick(() => {
                            this.dialogEdit.open();
                        });
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Column.pop();
                    Row.pop();
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
        Flex.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=ToDoItem.js.map