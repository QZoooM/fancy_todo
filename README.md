# Fancy TODO -Beta

                                        --------By QZoooM

项目使用的内容：

    ArkTS基础容器组件，事件，属性；

    Maths模块随机数；

    JSON模块字符转换；

使用语言：

    extendedTypeScript(ETS)；

API版本：9

# 项目

## 基础功能

### 基础交互

项目基于ArkTS开发，大多交互通过按钮和输入框完成，文字指引用户完成相应操作

### 信息存储

```typescript
import fs from '@ohos.file.fs';
import common from '@ohos.app.ability.common';
import util from '@ohos.util';
```

使用fs完成文件读写，common获取目标地址，util用于解码文字

用户完善任务的各种信息后，应用将收集到的内容写入文件

## 特色功能

### 随机任务

```typescript
Button('随机选择', { type: ButtonType.Normal })
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
```

严格而言，这并非随机。应用将从用户设置好的人物列表中获得信息 ，每一个任务会带有priorityLevel的属性值，用户可以自己设置，也可以直接默选等于 1 ，

## 外观

采用深色主题设计

支持一些过渡动画

### 主界面

主界面(用户可以通过“任务配置”按钮进入任务配置界面)



### 任务配界面

任务配置界面(局部)(做完修改后用户仍需在主界面点击“刷新列表”按钮😢)




# 结语

更多的细节应在源代码中寻找答案

只有亲自上手了才知道真正的样子
