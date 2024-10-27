import CommonConstants from '../common/constant/CommonConstant';
import { simpleReadFile } from '../utils/FilesOperation'
import ToDoItem from '../view/ToDoItem';
import router from '@ohos.router';
import {TaskType} from '../viewmodel/TaskType'
import { CustomDialogAoE, CustomDialogDel} from '../view/CustomDialog'


@Entry
@Component
struct TaskSetup {
  @State TaskList: TaskType[] = [];

  aboutToAppear() {
    let arr = simpleReadFile('list')
    this.TaskList = JSON.parse(arr[1]);
  }
  dialogAdd: CustomDialogController = new CustomDialogController({
    builder: CustomDialogAoE({
      // 总之必须有一个量与外部的一个量进行绑定！方法如下：
      TaskList: this.TaskList, // 这里，是把对话弹窗的ToDoList与this.totalTasks绑定，同步内容修改！
      Mode: 'add', // 添加模式
      cancel: this.AddCancel, // 与组件里的cancel行为绑定
      confirm: this.AddAccept, // 与组件里的confirm行为绑定
    }),
    alignment: DialogAlignment.Bottom, // 可设置dialog的对齐方式，设定显示在底部或中间等，默认为中间显示
  })

  dialogDel: CustomDialogController = new CustomDialogController({
    builder: CustomDialogDel({
      TaskList: this.TaskList,
      cancel: this.DelCancel,
      confirm: this.DelAccept,
    }),
    alignment: DialogAlignment.Bottom,
  })

  AddCancel() {
    console.info('Callback when the first button is clicked') // 单纯的取消任务
  }
  AddAccept() {
    console.info('Callback when the second button is clicked') // 将任务插入列表，在这步也可以实现
  }
  DelCancel() {
    console.info('Callback when the first button is clicked')
  }
  DelAccept() {

  }

  build() {
    Column() {
      Row() {
        Image($r('app.media.faceLeft'))
          .objectFit(ImageFit.Contain)
          .size(CommonConstants.MID_SIZE_IMAGE)
          .margin($r('app.float.checkbox_margin'))
          .onClick(() => {
            router.back({
              url: 'pages/Index',
            })
          })
          .backgroundColor('#00000000')
        Text("TODO LIST")
          .fontColor('#ffeeffaa')
          .minFontSize('10vp')
          .maxFontSize('30vp')
          .fontWeight(FontWeight.Bold)
          .width(CommonConstants.TITLE_WIDTH)
          .height(CommonConstants.TITLE_HEIGHT)
          .textAlign(TextAlign.Center)
      }
      .backgroundColor("#ff515355")
      .width('100%')

      Column() {
        Scroll() {
          Column() {
            ForEach(this.TaskList, (item: TaskType,index: number) => {
              ToDoItem({
                Task: item,
                index: index,
                isComplete: this.TaskList[index].isSelect,
                TaskList: this.TaskList})
            })
            Text('')
              .height(30)
          }
          .width(CommonConstants.FULL_LENGTH)
        }
        .scrollable(ScrollDirection.Vertical)
        .backgroundColor(CommonConstants.BACKGROUND_DEFAULT_COLOR)
      }
      .height('80%')

      Row() {
        Button({ type: ButtonType.Normal }) {
          Text('Add new one')
            .minFontSize('10vp')
            .maxFontSize('30vp')
            .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
        }
        .width('45%')
        .height('100%')
        .onClick(() => {
          this.dialogAdd.open();
        })

        Button({ type: ButtonType.Normal }) {
          Text('Del')
            .minFontSize('10vp')
            .maxFontSize('30vp')
            .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
        }
        .width('45%')
        .height('100%')
        .backgroundColor('#ffff1111')
        .onClick(() => {
          this.dialogDel.open()
        })
      }
      .height('10%')
      .align(Alignment.Center)
      .backgroundColor("#ff515355")
    }
    .backgroundColor(CommonConstants.BACKGROUND_DEFAULT_COLOR)
    .width(CommonConstants.FULL_LENGTH)
  }
}