import { cloneDeep } from 'lodash'
export function getOnlyKey () {
  return Math.random()
}
function getDefaultCanvas () {
  return {
    title: '未命名',
    // 页面样式
    style: {
      width: 375,
      height: 568,
      backgroundColor: '#ffffff',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
      // boxSizing: "content-box",
    },
    // 组件
    comps: []
  }
}

// 状态
export default class Canvas {
  constructor (_canvas = getDefaultCanvas()) {
    this.canvas = _canvas // 页面数据

    this.listeners = []

    // 画布历史
    this.canvasChangeHistory = [cloneDeep(this.canvas)]

    // 前进、后退
    this.canvasChangeHistoryIndex = 0

    // 最多记录100条数据
    this.maxCanvasChangeHistory = 100

    // 选中组件的下标集合
    this.assembly = new Set()
  }

  // get

  getCanvas = () => {
    return { ...this.canvas }
  };

  getCanvasComps = () => {
    return [...this.canvas.comps]
  };

  getSelectedCompIndex = () => {
    const selectedCompIndex = Array.from(this.assembly)[0]

    return selectedCompIndex === undefined ? -1 : selectedCompIndex
  };

  // 返回选中组件的参数
  getSelectedComp = () => {
    const comps = this.getCanvasComps()
    return comps[this.getSelectedCompIndex()]
  };

  setSelectedCompIndex = (index) => {
    if (this.getSelectedCompIndex() === index) {
      return
    }

    this.assembly.clear()

    if (index > -1) {
      this.addToAssembly(index)
    }

    this.updateApp()
  };

  // set
  setCanvas = (_canvas) => {
    if (_canvas) {
      Object.assign(this.canvas, _canvas)
    } else {
      this.canvas = getDefaultCanvas()
    }

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 新增组件
  addComp = (_comp) => {
    const comp = { ..._comp, key: getOnlyKey() }
    // 1. 更新画布数据
    this.canvas.comps.push(comp)
    // 2. 选中新增的组件为选中组件

    this.assembly.clear()
    this.addToAssembly(this.canvas.comps.length - 1)

    // 3. 更新组件
    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 删除组件
  deleteComps = () => {
    const sorted = Array.from(this.assembly).sort((a, b) => b - a)
    sorted.forEach((index) => {
      this.canvas.comps.splice(index, 1)
    })

    this.assembly.clear()

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  updateSelectedComp = (newStyle, newValue) => {
    const selectedComp = this.getSelectedComp()

    if (newStyle) {
      this.canvas.comps[this.getSelectedCompIndex()].style = {
        ...selectedComp.style,
        ...newStyle
      }
    }

    if (newValue !== undefined) {
      this.canvas.comps[this.getSelectedCompIndex()].value = newValue
    }

    //  更新组件
    this.updateApp()
  };

  updateCanvasStyle = (newStyle) => {
    this.canvas.style = {
      ...this.canvas.style,
      ...newStyle
    }

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  updateApp = () => {
    // 希望组件更新
    this.listeners.forEach((lis) => lis())
  };

  subscribe = (listener) => {
    this.listeners.push(listener)
    // 取消时间
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener)
    }
  };

  // 历史
  // 1 2 5 4
  recordCanvasChangeHistory = () => {
    this.canvasChangeHistory[++this.canvasChangeHistoryIndex] = cloneDeep(
      this.canvas
    )
    this.canvasChangeHistory = this.canvasChangeHistory.slice(
      0,
      this.canvasChangeHistoryIndex + 1
    )

    // 最多记录100条
    if (this.canvasChangeHistory.length > this.maxCanvasChangeHistory) {
      this.canvasChangeHistory.shift()
      this.canvasChangeHistoryIndex--
    }
  };

  goPrevCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex - 1
    if (newIndex < 0) {
      newIndex = 0
    }

    if (this.canvasChangeHistoryIndex === newIndex) {
      return
    }
    this.canvasChangeHistoryIndex = newIndex
    const newCanvas = cloneDeep(this.canvasChangeHistory[newIndex])
    this.canvas = newCanvas
    this.updateApp()
  };

  goNextCanvasHistory = () => {
    let newIndex = this.canvasChangeHistoryIndex + 1
    if (newIndex >= this.canvasChangeHistory.length) {
      newIndex = this.canvasChangeHistory.length - 1
    }

    if (this.canvasChangeHistoryIndex === newIndex) {
      return
    }
    this.canvasChangeHistoryIndex = newIndex
    const newCanvas = cloneDeep(this.canvasChangeHistory[newIndex])
    this.canvas = newCanvas
    this.updateApp()
  };

  // 0 1  3 2 4
  // 上移
  addCompZIndex = (compIndex = this.getSelectedCompIndex()) => {
    const comps = this.getCanvasComps()
    const targetIndex = compIndex + 1
    if (targetIndex >= comps.length) {
      return
    }

    const tem = comps[compIndex]
    this.canvas.comps[compIndex] = this.canvas.comps[targetIndex]
    this.canvas.comps[targetIndex] = tem

    this.setSelectedCompIndex(targetIndex)

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 0 1  3 2 4
  // 下移
  subCompZIndex = (compIndex = this.getSelectedCompIndex()) => {
    const comps = this.getCanvasComps()
    const targetIndex = compIndex - 1
    if (targetIndex < 0) {
      return
    }

    const tem = comps[compIndex]
    this.canvas.comps[compIndex] = this.canvas.comps[targetIndex]
    this.canvas.comps[targetIndex] = tem

    this.setSelectedCompIndex(targetIndex)

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 0 1  3 4 2
  // 置顶
  topZIndex = (compIndex = this.getSelectedCompIndex()) => {
    const comps = this.getCanvasComps()
    if (compIndex >= comps.length - 1) {
      return
    }
    this.canvas.comps = comps
      .slice(0, compIndex)
      .concat(comps.slice(compIndex + 1))
      .concat(comps[compIndex])

    this.setSelectedCompIndex(comps.length - 1)

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 置底部
  bottomZIndex = (compIndex = this.getSelectedCompIndex()) => {
    const comps = this.getCanvasComps()
    if (compIndex <= 0) {
      return
    }

    this.canvas.comps = [comps[compIndex]]
      .concat(comps.slice(0, compIndex))
      .concat(comps.slice(compIndex + 1))

    this.setSelectedCompIndex(0)

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 组件

  addToAssembly = (indexes) => {
    if (Array.isArray(indexes)) {
      indexes.forEach((index) => index !== -1 && this.assembly.add(index - 0))
    } else {
      indexes !== -1 && this.assembly.add(indexes)
    }
  };

  // 批量操作组件
  addAndUpdateAssembly = (indexes) => {
    this.addToAssembly(indexes)
    this.updateApp()
  };

  // 判断下标为index的组件是否被批量选中
  belongingToAssembly = (index) => {
    return this.assembly.has(index)
  };

  // newStyle里面是移动的差值
  updateAssemblyComps = (newStyle) => {
    this.assembly.forEach((index) => {
      const comp = this.canvas.comps[index]
      for (const key in newStyle) {
        comp.style[key] += newStyle[key] - 0

        if (comp.style.width < 10) {
          comp.style.width = 10
        }
        if (comp.style.height < 10) {
          comp.style.height = 10
        }
      }
    })

    this.updateApp()
  };

  // 批量添加组件
  addAssemblyCms = () => {
    this.assembly.forEach((index) => {
      const comp = this.canvas.comps[index]
      const newComp = cloneDeep(comp)
      newComp.key = getOnlyKey()

      newComp.style.top += 40
      newComp.style.left += 40

      this.canvas.comps.push(newComp)
    })

    // 添加组件之后，更新选中的组件
    // 5 7 9
    // 10
    const compsLength = this.canvas.comps.length
    const assemblySize = this.assembly.size

    this.assembly.clear()
    for (let i = compsLength - assemblySize; i < compsLength; i++) {
      this.assembly.add(i)
    }

    this.updateApp()
    this.recordCanvasChangeHistory()
  };

  // 判断有没有组件组合

  hasAssembly = () => {
    return this.assembly.size > 1
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      setCanvas: this.setCanvas,
      getCanvasComps: this.getCanvasComps,
      addComp: this.addComp,
      deleteComps: this.deleteComps,
      getSelectedCompIndex: this.getSelectedCompIndex,
      getSelectedComp: this.getSelectedComp,
      setSelectedCompIndex: this.setSelectedCompIndex,
      updateSelectedComp: this.updateSelectedComp,
      updateCanvasStyle: this.updateCanvasStyle,
      subscribe: this.subscribe,

      recordCanvasChangeHistory: this.recordCanvasChangeHistory,
      goPrevCanvasHistory: this.goPrevCanvasHistory,
      goNextCanvasHistory: this.goNextCanvasHistory,

      // 修改层级
      addCompZIndex: this.addCompZIndex,
      subCompZIndex: this.subCompZIndex,
      topZIndex: this.topZIndex,
      bottomZIndex: this.bottomZIndex,

      // 批量操作组件
      addAndUpdateAssembly: this.addAndUpdateAssembly,
      belongingToAssembly: this.belongingToAssembly,
      updateAssemblyComps: this.updateAssemblyComps,
      addAssemblyCms: this.addAssemblyCms,
      hasAssembly: this.hasAssembly
    }

    return obj
  };
}
