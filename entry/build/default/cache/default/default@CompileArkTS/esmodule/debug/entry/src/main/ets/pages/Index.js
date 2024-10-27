import { createFile, simpleReadFile } from '@bundle:com.example.fancy_todo/entry/ets/utils/FilesOperation';
import { ToDoDetail } from '@bundle:com.example.fancy_todo/entry/ets/viewmodel/TaskType';
import router from '@ohos:router';
import CommonConstants from '@bundle:com.example.fancy_todo/entry/ets/common/constant/CommonConstant';
ToDoDetail.initData();
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__message = new ObservedPropertySimplePU('今天要做什么', this, "message");
        this.__TaskList = new ObservedPropertyObjectPU(null, this, "TaskList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.TaskList !== undefined) {
            this.TaskList = params.TaskList;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
        this.__TaskList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__TaskList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    get TaskList() {
        return this.__TaskList.get();
    }
    set TaskList(newValue) {
        this.__TaskList.set(newValue);
    }
    aboutToAppear() {
        try {
            let arr = simpleReadFile('list');
            this.TaskList = JSON.parse(arr[1]);
        }
        catch (e) {
            this.TaskList = ToDoDetail.getData();
            let str = JSON.stringify(this.TaskList);
            let space = ' ';
            for (var i = 0; i < 16; i++) {
                space += space;
                if ((str + space).length >= 65536) {
                    break;
                }
            }
            createFile('list', str + space);
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.height(CommonConstants.FULL_LENGTH);
            Row.backgroundColor(CommonConstants.BACKGROUND_DEFAULT_COLOR);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: '10vp' });
            Column.justifyContent(FlexAlign.Center);
            Column.width(CommonConstants.FULL_LENGTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.size({ width: '90%', height: '50%' });
            Column.borderRadius('8vp');
            Column.backgroundColor('#ff222222');
            Column.shadow({ color: '#c6ffffff', radius: 8, offsetY: 2 });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.message);
            Text.fontSize(80);
            Text.fontColor(CommonConstants.FONT_RANDOM_COLOR);
            Text.fontWeight(CommonConstants.FONT_WEIGHT);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create({ space: '10vp' });
            Row.justifyContent(FlexAlign.Center);
            Row.width('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('随机选择', { type: ButtonType.Normal });
            Button.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            Button.borderRadius(CommonConstants.BORDER_RADIUS);
            Button.fontSize('30vp');
            Button.width('40%');
            Button.onClick(() => {
                let totalWeight = 0;
                let rangeWeight = [];
                let left = 0;
                let msg = "";
                let result = Math.random();
                this.TaskList.forEach(function (weight) {
                    totalWeight = weight.priorityLevel + totalWeight;
                });
                this.TaskList.forEach((function (weight) {
                    rangeWeight.push([left, left + weight.priorityLevel / totalWeight]);
                    left += weight.priorityLevel / totalWeight;
                }));
                this.TaskList.forEach(function (item, index) {
                    if (result >= rangeWeight[index][0] && result < rangeWeight[index][1]) {
                        msg = item.name;
                    }
                });
                this.message = msg;
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('重置选择', { type: ButtonType.Normal });
            Button.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            Button.borderRadius(CommonConstants.BORDER_RADIUS);
            Button.fontSize('30vp');
            Button.width('40%');
            Button.onClick(() => {
                this.message = '今天要做什么';
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('刷新列表', { type: ButtonType.Normal });
            Button.fontColor(CommonConstants.FONT_DEFAULT_COLOR);
            Button.borderRadius(CommonConstants.BORDER_RADIUS);
            Button.fontSize('60vp');
            Button.onClick(() => {
                let arr = simpleReadFile('list');
                this.TaskList = JSON.parse(arr[1]);
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('任务配置', { type: ButtonType.Normal });
            Button.borderRadius(CommonConstants.BORDER_RADIUS);
            Button.fontColor(CommonConstants.FONT_LIST_COLOR);
            Button.fontSize('60vp');
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/TaskSetup'
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Index(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=Index.js.map