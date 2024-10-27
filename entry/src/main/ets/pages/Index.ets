import { createFile, simpleReadFile } from '../utils/FilesOperation'
import { TaskType, ToDoDetail } from '../viewmodel/TaskType'
import router from '@ohos.router';
import CommonConstants from '../common/constant/CommonConstant';
ToDoDetail.initData()

@Entry
@Component
struct Index {
  @State message: string = '今天要做什么';
  @State TaskList: TaskType[] = null!; // 预存列表变量

  aboutToAppear(): void {
    try {
      let arr = simpleReadFile('list');
      this.TaskList = JSON.parse(arr[1]);
    } catch (e) {
      this.TaskList = ToDoDetail.getData();
      let str: string = JSON.stringify(this.TaskList)
      let space: string = ' '
      for(var i = 0; i < 16; i++){
        space += space
        if ((str + space).length >= 65536) {
          break
        }
      }
      createFile('list', str + space)
    }
  }

  build() {
    Row() {
      Column({space: '10vp'}) {
        Column() {
          Text(this.message)
            .fontSize(80)
            .fontColor(CommonConstants.FONT_RANDOM_COLOR)
            .fontWeight(CommonConstants.FONT_WEIGHT)
        }
        .size({width: '90%', height: '50%'})
        .borderRadius('8vp')
        .backgroundColor('#ff222222')
        .shadow({ color: '#c6ffffff', radius: 8, offsetY: 2 })
        Row({space: '10vp'}) {
          Button('随机选择', { type: ButtonType.Normal })
            .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
            .borderRadius(CommonConstants.BORDER_RADIUS)
            .fontSize('30vp')
            .width('40%')
            .onClick(() => {
              let totalWeight: number = 0;
              let rangeWeight: number[][] = [];
              let left: number = 0;
              let msg: string = "";
              let result: number = Math.random();
              this.TaskList.forEach(function (weight) {
                totalWeight = weight.priorityLevel + totalWeight;
              });
              this.TaskList.forEach((function (weight) {
                rangeWeight.push([left, left + weight.priorityLevel / totalWeight]);
                left += weight.priorityLevel / totalWeight;
              }))
              this.TaskList.forEach(function (item, index) {
                if (result >= rangeWeight[index][0] && result < rangeWeight[index][1]) {
                  msg = item.name;
                }
              })
              this.message = msg;
            })
          Button('重置选择', { type: ButtonType.Normal })
            .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
            .borderRadius(CommonConstants.BORDER_RADIUS)
            .fontSize('30vp')
            .width('40%')
            .onClick(() => {
              this.message = '今天要做什么'
            })
        }
        .justifyContent(FlexAlign.Center)
        .width('100%')
        Button('刷新列表', { type: ButtonType.Normal })
          .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
          .borderRadius(CommonConstants.BORDER_RADIUS)
          .fontSize('60vp')
          .onClick(() => {
            let arr = simpleReadFile('list');
            this.TaskList = JSON.parse(arr[1]);
          })
        Button('任务配置', { type: ButtonType.Normal })
          .borderRadius(CommonConstants.BORDER_RADIUS)
          .fontColor(CommonConstants.FONT_LIST_COLOR)
          .fontSize('60vp')
          .onClick(() => {
            router.pushUrl({
              url: 'pages/TaskSetup'
            })
          })
      }
      .justifyContent(FlexAlign.Center)
      .width(CommonConstants.FULL_LENGTH)
    }
    .height(CommonConstants.FULL_LENGTH)
    .backgroundColor(CommonConstants.BACKGROUND_DEFAULT_COLOR)
  }
}