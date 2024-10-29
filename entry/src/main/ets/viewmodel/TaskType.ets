import ToDoData from '../viewmodel/DataModel'

interface TaskType {
  name: string, // 名字
  contain: string, // 具体内容
  isSelect: boolean, // 是否被选择，便于删除
  priorityLevel: number, // 越大越靠前，默认为1
  enDeadline: boolean, // 激活日期(可选)
  deadLine: string // 截止日期同上一项
}

class ClsToDoDetail{
  private Data: string[] = ToDoData.getData()
  private taskList: TaskType[] = [{
    name: 'Demo',
    contain: 'Jest a Test!',
    isSelect: false,
    priorityLevel: 1,
    enDeadline: true,
    deadLine: '01/01/2040',
  }]

  initData() {
    for(var i = 0; i < this.Data.length; i++){
      this.taskList.push({
        name: this.Data[i],
        contain: 'undefined',
        isSelect: false,
        priorityLevel: 1,
        enDeadline: false,
        deadLine: 'None'
      })
    }
  }

  getData() {
    return this.taskList
  }
}

let ToDoDetail = new ClsToDoDetail()

export {
  TaskType, ToDoDetail
}
