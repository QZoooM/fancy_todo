import ToDoData from '@bundle:com.example.fancy_todo/entry/ets/viewmodel/DataModel';
class ClsToDoDetail {
    constructor() {
        this.Data = ToDoData.getData();
        this.taskList = [{
                name: 'Demo',
                contain: 'Jest a Test!',
                isSelect: false,
                priorityLevel: 1,
                deadLine: '01/01/2040'
            }];
    }
    initData() {
        for (var i = 0; i < this.Data.length; i++) {
            this.taskList.push({
                name: this.Data[i],
                contain: 'undefined',
                isSelect: false,
                priorityLevel: 1
            });
        }
    }
    getData() {
        return this.taskList;
    }
}
let ToDoDetail = new ClsToDoDetail();
export { ToDoDetail };
//# sourceMappingURL=TaskType.js.map