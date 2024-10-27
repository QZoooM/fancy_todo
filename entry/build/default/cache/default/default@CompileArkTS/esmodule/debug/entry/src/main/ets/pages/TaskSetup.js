import CommonConstants from '@bundle:com.example.fancy_todo/entry/ets/common/constant/CommonConstant';
import { simpleReadFile } from '@bundle:com.example.fancy_todo/entry/ets/utils/FilesOperation';
import ToDoItem from '@bundle:com.example.fancy_todo/entry/ets/view/ToDoItem';
import router from '@ohos:router';
import { CustomDialogAoE, CustomDialogDel } from '@bundle:com.example.fancy_todo/entry/ets/view/CustomDialog';
class TaskSetup extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__TaskList = new ObservedPropertyObjectPU([], this, "TaskList");
        this.dialogAdd = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogAoE(this, {
                    // 总之必须有一个量与外部的一个量进行绑定！方法如下：
                    TaskList: this.TaskList,
                    Mode: 'add',
                    cancel: this.AddCancel,
                    confirm: this.AddAccept, // 与组件里的confirm行为绑定
                });
                jsDialog.setController(this.dialogAdd);
                ViewPU.create(jsDialog);
            },
            alignment: DialogAlignment.Bottom
        }, this);
        this.dialogDel = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogDel(this, {
                    TaskList: this.TaskList,
                    cancel: this.DelCancel,
                    confirm: this.DelAccept,
                });
                jsDialog.setController(this.dialogDel);
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
        if (params.dialogAdd !== undefined) {
            this.dialogAdd = params.dialogAdd;
        }
        if (params.dialogDel !== undefined) {
            this.dialogDel = params.dialogDel;
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
    aboutToAppear() {
        let arr = simpleReadFile('list');
        this.TaskList = JSON.parse(arr[1]);
    }
    AddCancel() {
        console.info('Callback when the first button is clicked'); // 单纯的取消任务
    }
    AddAccept() {
        console.info('Callback when the second button is clicked'); // 将任务插入列表，在这步也可以实现
    }
    DelCancel() {
        console.info('Callback when the first button is clicked');
    }
    DelAccept() {
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.backgroundColor(CommonConstants.BACKGROUND_DEFAULT_COLOR);
            Column.width(CommonConstants.FULL_LENGTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.backgroundColor("#ff515355");
            Row.width('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
            Image.objectFit(ImageFit.Contain);
            Image.size(CommonConstants.MID_SIZE_IMAGE);
            Image.margin({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.example.fancy_todo", "moduleName": "entry" });
            Image.onClick(() => {
                router.back({
                    url: 'pages/Index',
                });
            });
            Image.backgroundColor('#00000000');
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("TODO LIST");
            Text.fontColor('#ffeeffaa');
            Text.minFontSize('10vp');
            Text.maxFontSize('30vp');
            Text.fontWeight(FontWeight.Bold);
            Text.width(CommonConstants.TITLE_WIDTH);
            Text.height(CommonConstants.TITLE_HEIGHT);
            Text.textAlign(TextAlign.Center);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height('80%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.backgroundColor(CommonConstants.BACKGROUND_DEFAULT_COLOR);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(CommonConstants.FULL_LENGTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new ToDoItem(this, {
                                Task: item,
                                index: index,
                                isComplete: this.TaskList[index].isSelect,
                                TaskList: this.TaskList
                            }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            };
            this.forEachUpdateFunction(elmtId, this.TaskList, forEachItemGenFunction, undefined, true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('');
            Text.height(30);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height('10%');
            Row.align(Alignment.Center);
            Row.backgroundColor("#ff515355");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('45%');
            Button.height('100%');
            Button.onClick(() => {
                this.dialogAdd.open();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('Add new one');
            Text.minFontSize('10vp');
            Text.maxFontSize('30vp');
            Text.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild({ type: ButtonType.Normal });
            Button.width('45%');
            Button.height('100%');
            Button.backgroundColor('#ffff1111');
            Button.onClick(() => {
                this.dialogDel.open();
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('Del');
            Text.minFontSize('10vp');
            Text.maxFontSize('30vp');
            Text.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new TaskSetup(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TaskSetup.js.map