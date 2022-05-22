# superset代码结构整理



## 基础知识

flask

[flask-appbuilder](https://flask-appbuilder.readthedocs.io/en/latest/quickhowto.html)

sqlalchemy

[sqlparse](https://sqlparse.readthedocs.io/en/latest/)

react

[redux](http://cn.redux.js.org/)



## 前端部分结构

> 注：主要对于/superset/static/assets/src/中的代码，即react实现部分，其他页面基本由flask-appbuilder自动生成

### 通用

页面布局基本使用	[react-bootstrap](https://react-bootstrap.github.io/components/alerts/) ，

具体的组件与页面布局可使用浏览器工具`React Developer Tools`查看。

页面的数据状态保存与组件间数据传递基本基于[redux](http://cn.redux.js.org/)。

**`src`中页面对应文件夹基本布局**

```js
index.jsx
- App.jsx  // 创建store
	- components  // 页面具体组件
		- mainComponent	// 绑定actions，接收state中数据
	- actions  // redux actions文件，可能为actions.js或文件夹
	- reducers	// redux reducers文件，可能为reducers.js或文件夹
	- 其他	// 如 样式文件或其他工具类
```

### dashboard

```js
index.jsx
- App.jsx
	- containers.Dashboard  // 绑定actions
  		- components.Dashboard
    		- DashboardBuilder
				- TabContainer  // 显示chart部分
					- DashboardGrid
						- Chart  // 具体图表
				- BuilderComponentPane  // dashboard编辑部分
					- NewColumn,NewDivider......
```

### explore

```js
index.jsx
- App.jsx
- ExploreViewContainer
  - ControlDatasource //最左边,数据源
  - ControlVisualizationType //中间上,可视化类型
  - ControlPanelsContainer //中间下, 属性区域
    - ControlPanelSection
      - ControlRow
        - Control.jsx //会实例化一些具体的control,类型定义在index.js中,具体类在controls子目录中
        - controls/MetricsControl.jsx
                  - ControlHeader
                  - OnPasteSelect
        - controls/DatasourceControl.jsx
  - ExploreChartPanel //chart探索区域
- AlertWrapper
```

### visualizations

```js
index.js  // 图表类型注册
- viz	// 具体图表
	- adaptor.jsx	//
	- viz.jsx	// 图表实现
	- viz.css	//  样式
	- Reactviz.js	//
	- transformProps.js	//

```

### 测试(cpress)



### 其他

**messageToasts**:	提示信息弹出框。

**addSlice**:  新建图表页。





## 功能实现

### 图表类型

**基础知识:**	[d3](https://github.com/d3/d3)，[nvd3](https://github.com/novus/nvd3) ([livecode](http://nvd3.org/livecode/index.html))

**前端:**	superset/assets/src/visualizations/index.js

```
	由index.js进入visualizations中图表类型的具体实现文件
```

**后端实现:**	superset/viz.py  所有图表类基于BaseViz， 最后加入viz_types

**使用:**	调用viz.viz_types[viz_type]


