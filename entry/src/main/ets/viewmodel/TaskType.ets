import ToDoData from '../viewmodel/DataModel'

interface TaskType {
  name: string, // 名字
  contain: string, // 具体内容
  isSelect: boolean, // 是否被选择，便于删除
  priorityLevel: number, // 越大越靠前，默认为1
  deadLine?: string // 截止日期(可选)
}

class ClsToDoDetail{
  private Data: string[] = ToDoData.getData()
  private taskList: TaskType[] = [{
    name: 'Demo',
    contain: 'Jest a Test!',
    isSelect: false,
    priorityLevel: 1,
    deadLine: '01/01/2040'
  }]

  initData() {
    for(var i = 0; i < this.Data.length; i++){
      this.taskList.push({
        name: this.Data[i],
        contain: 'undefined',
        isSelect: false,
        priorityLevel: 1
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
