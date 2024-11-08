import CommonConstants from '../common/constant/CommonConstant';
import { TaskType } from '../viewmodel/TaskType'
import { CustomDialogAoE, CustomDialogSingleDel } from '../view/CustomDialog'

@Component
export default struct ToDoItem {
  @State TaskList: TaskType[] = [];
  @State Task: TaskType = null!;
  @State index: number = -1;
  @State isComplete: boolean = false;
  @State isRelax: boolean = false;
  dialogSingleDel: CustomDialogController = new CustomDialogController({
    builder: CustomDialogSingleDel({
      TaskList: this.TaskList,
      Index: this.index,
    })
  })
  dialogEdit: CustomDialogController = new CustomDialogController({
    builder: CustomDialogAoE({
      TaskList: this.TaskList,
      Mode: 'edit', // 编辑模式
      Index: this.index,
      confirm: this.editAccept,
      cancel: this.editCancel,
    }),
    alignment: DialogAlignment.Bottom,
  })
  editAccept(){}
  editCancel(){}

  @Builder labelIcon(icon: Resource) {
    Image(icon)
      .objectFit(ImageFit.Contain)
      .size(CommonConstants.TINY_SIZE_IMAGE)
      .margin($r('app.float.checkbox_margin'))
      .onClick( ()=> {
        this.isComplete = !this.isComplete;
        let tmp: TaskType = this.TaskList[this.index]
        tmp.isSelect = this.isComplete
        this.TaskList.splice(this.index,1,tmp)
      })
  }
  @Builder relaxIcon(icon: Resource) {
    Image(icon)
      .objectFit(ImageFit.Contain)
      .size(CommonConstants.TINY_SIZE_IMAGE)
      .margin($r('app.float.checkbox_margin'))
  }

  build() {
    Row() {
      Flex({
        direction: this.isRelax? FlexDirection.Column: FlexDirection.Row,
        justifyContent: FlexAlign.Start,
      }) {
        Row() {
          Row() {
            if (this.isComplete) {
              this.labelIcon($r('app.media.slt'))
            } else {
              this.labelIcon($r('app.media.unslt'))
            }
            Text(this.Task.name)
              .fontSize($r('app.float.item_font_size'))
              .fontColor(CommonConstants.FONT_LIST_COLOR)
              .width('50%')
              .fontWeight(CommonConstants.FONT_WEIGHT)
              .margin($r('app.float.checkbox_margin'))
              .opacity(
                this.isComplete ?
                CommonConstants.OPACITY_COMPLETED :
                CommonConstants.OPACITY_DEFAULT
              )
          }
          Row() {
            if (this.isRelax) {
              this.relaxIcon($r('app.media.relaxButtonUp'))
            } else {
              this.relaxIcon($r('app.media.relaxButtonDown'))
            }
          }
          .justifyContent(FlexAlign.End)
          .width('20%')
        }
        if (this.isRelax) {
          Row() {
            Column() {
              Scroll() {
                Text(this.Task.contain)
                  .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
                  .width('80%')
              }
              .align(Alignment.TopStart)
            }
            .backgroundColor('#ff222222')
            .borderRadius('8vp')
            .shadow(CommonConstants.SHADOW_DEFAULT_CONFIG)
            .margin('5vp')
            .height('50%')
            Column() {
              Image($r('app.media.edit'))
                .objectFit(ImageFit.Contain)
                .size(CommonConstants.MID_SIZE_IMAGE)
                .margin($r('app.float.checkbox_margin'))
                .onClick(() => {
                  this.dialogEdit.open()
                })
              Image($r('app.media.dustbin'))
                .objectFit(ImageFit.Contain)
                .size(CommonConstants.MID_SIZE_IMAGE)
                .margin($r('app.float.checkbox_margin'))
                .onClick(() => {
                  this.dialogSingleDel.open()
                })
            }
          }
          Row() {
            Text(`任务优先参数：${this.Task.priorityLevel}；`)
              .fontColor(CommonConstants.FONT_LIST_COLOR)
              .margin('5vp')
            Text(`截止日期：${this.Task.deadLine}`)
              .fontColor(CommonConstants.FONT_LIST_COLOR)
              .margin('5vp')
          }
        }
      }
      .backgroundColor('#b7262626')
      .borderRadius('8vp')
      .margin('4vp')
      .shadow(CommonConstants.SHADOW_DEFAULT_CONFIG)
      .height(this.isRelax? 270: 90)
      .padding(10)
      .borderRadius(8)
      .width(CommonConstants.LIST_DEFAULT_WIDTH)
      .onClick(() => {
        animateTo({ duration: 300, curve: Curve.EaseInOut }, () => {
          this.isRelax = !this.isRelax
        })
      })
    }
  }
}