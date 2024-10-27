import CommonConstants from '../common/constant/CommonConstant';
import { createFile } from '../utils/FilesOperation'
import {TaskType} from '../viewmodel/TaskType'
import promptAction from '@ohos.promptAction';

@CustomDialog
struct CustomDialogAoE {
  @State TaskList: TaskType[] = [];
  @State alert: string = '';
  @State orgInput: string = "New Task"
  @State userInput: string = '';
  @State orgInputContain: string = '';
  @State userInputContain: string = '';
  @State orgPriLevel: number = 1;
  @State canAdd: boolean = true;
  @State deepEdit: boolean = false;
  @Builder editIcon(icon: Resource) {
    Image(icon)
      .objectFit(ImageFit.Contain)
      .size({width: '36vp', height: '36vp'})
      .onClick(() => {
        animateTo({duration: 300, curve: Curve.EaseInOut},() => {
          this.deepEdit = !this.deepEdit
          if (this.deepEdit) this.alert = '请完善任务细节'
          else this.alert = '请输入任务名称'
        })
      })
  }
  private Mode?: string
  private Index?: number
  controller: CustomDialogController;
  cancel: () => void;
  confirm: () => void;
  aboutToAppear(): void {
    if (this.Mode === 'edit') {
      let tmp: TaskType = this.TaskList[this.Index]
      this.orgInput = this.userInput = tmp.name
      this.orgInputContain = this.userInputContain = tmp.contain
    }
  }
  build() {
    Column() {
      Text('Create new task').fontSize(20).margin({ top: 10, bottom: 10 }).fontColor('#ffffffff').height(30)
      Row({space: '5vp'}) {
        TextInput({ text: this.orgInput, placeholder: 'New Task' })
          .width('80%')
          .margin({ bottom: 10 })
          .placeholderColor('#77ffffff')
          .backgroundColor('#aa3e3e3e')
          .fontColor('#ffffffff')
          .height(40)
          .onChange((value: string) => {
            if (value === '') {
              this.alert = '字段不可为空'
              this.canAdd = false
            } else {
              if (this.deepEdit) {
                this.alert = '请完善任务细节'
              } else {
                this.alert = '请输入任务名称'
              }
              this.userInput = value
              this.canAdd = true
            }
          })
        if (this.deepEdit) {
          this.editIcon($r('app.media.relaxButtonDown'))
        } else {
          this.editIcon($r('app.media.relaxButtonUp'))
        }
      }.align(Alignment.Start)
      Text(this.alert)
        .fontColor(this.canAdd? '#ffffffff': '#ffff0000')
        .margin({ bottom: 10 })
      if (this.deepEdit) {
        TextArea({text: this.orgInputContain, placeholder:'Task Detail'})
          .size({width: '80%', height: '200vp'})
          .margin({ bottom: 10 })
          .placeholderColor('#77ffffff')
          .backgroundColor('#aa3e3e3e')
          .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
          .onChange((str: string) => {
            this.userInputContain = str
          })
      }
      Flex({ justifyContent: FlexAlign.End }) {
        Button('cancel',{type:ButtonType.Normal}).width('50%').height('100%')
          .onClick(() => {
            this.controller.close()
            this.cancel()
          }).backgroundColor('#ff2b2b2b')
          .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
          .margin({right: '1vp'})
          .fontSize(30)
        Button('confirm',{type:ButtonType.Normal}).width('50%').height('100%')
          .onClick(() => {
            if (!this.canAdd) {
              promptAction.showToast({message: '名称不能为空！', duration: 700})
              return
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
              let tmp: TaskType = {
                name: this.userInput,
                contain: this.userInputContain,
                isSelect: false,
                priorityLevel: this.orgPriLevel,
              }
              this.TaskList.splice(this.Index,1,tmp)
            }
            let str: string = JSON.stringify(this.TaskList)
            let space: string = ' '
            for(var i = 0; i < 16; i++){
              space += space
              if ((str + space).length >= 65536) {
                break
              }
            }
            // 这里放置创建文件的方法
            createFile('list', str + space)
            this.controller.close();
            this.confirm();
          }).backgroundColor('#ff2b2b2b')
          .fontColor(this.canAdd? '#ff69b5ff': '#ff4a4a4a')
          .fontSize(30)
      }.height(this.deepEdit? 60: 80)
      .align(Alignment.Bottom)
    }.backgroundColor('#e9000000')
    .height(this.deepEdit? CommonConstants.DIALOG_EDIT_HEIGHT: CommonConstants.DIALOG_DEFAULT_HEIGHT)
  }
}

@CustomDialog
struct CustomDialogDel {
  @State TaskList: TaskType[] = []
  controller: CustomDialogController
  cancel: () => void
  confirm: () => void
  build() {
    Column() {
      Text('Delete Selected Tasks?').fontSize(20).margin({ top: 10, bottom: 10 }).fontColor('#ffff0000').height(30)
      Flex({ justifyContent: FlexAlign.SpaceAround }) {
        Button('cancel',{type:ButtonType.Normal}).width('50%').height('100%')
          .onClick(() => {
            this.controller.close()
            this.cancel()
          }).backgroundColor('#ff2b2b2b')
          .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
          .margin({right: '1vp'})
          .fontSize(30)
        Button('Delete',{type:ButtonType.Normal}).width('50%').height('100%')
          .onClick(() => {
            this.controller.close();
            let tmpArr: number[] = []
            for(var i = 0; i < this.TaskList.length; i++){
              if (this.TaskList[i].isSelect) tmpArr.push(i)
            }
            for(var i = tmpArr.length-1; i > -1; i--){
              this.TaskList.splice(tmpArr[i],1)
            }
            // 这里放置创建文件的方法
            let str: string = JSON.stringify(this.TaskList)
            let space: string = ' '
            for(var i = 0; i < 16; i++){
              space += space
              if ((str + space).length >= 65536) {
                break
              }
            }
            createFile('list', str + space)
            this.confirm();
          }).backgroundColor('#ffbc0000')
          .fontColor(CommonConstants.FONT_DEFAULT_COLOR)
          .fontSize(30)
      }.height(160).align(Alignment.Bottom)
    }.backgroundColor('#e9000000').height('200')
  }
}

export {
  CustomDialogAoE, CustomDialogDel
}