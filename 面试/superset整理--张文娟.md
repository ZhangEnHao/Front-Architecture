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





## 后端部分结构

### 文件功能

```js
superset
- bin  // flask-cli的使用
- connectors  // 数据库连接相关
	- base
		- models.py  // 模型 其余同
		- views.py	// 视图
	- sqla	// table，sql_metrics，table_columns表模型、视图，存储连接的数据源信息
	- druid  // clusters，columns，metrics，datasources表模型、视图，存储连接的druid数据源信息
	- association  // 新增，存储新建关联表信息
- data  // load_examples 原始数据
- db_engines
	- hive.py
- migrations  // 数据库迁移相关
- models  // 各种表模型基地
	- annotations.py	// annotation_layer，annotation表模型
	- core.py	// database、chart、dashboard、csstemplate功能对应的表模型及方法
	- helpers.py	// 表模型相关的工具类和方法
	- sql_lab.py	// query，saved_query表模型及方法
	- user_attributes.py	// user_attribute表模型
- translations  // 翻译相关
- views  // 各种表视图基地  与models对应
	- annotations.py  // Manage-Annotations和Manage-Annotation Layers功能对应的view
	- base.py	// 封装各种通用方法,如获取异常消息、获取用户角色; 
				//定义SupersetModelView、BaseSupersetView、SupersetFilter等超类,通用mixin等
	- core.py	// database、chart、dashboard、csstemplate功能对应的view
				// 和其他方法, 主要在Superset类中
	- datasource.py  // 用途待解决
	- sql_lab.py  // saved query对应的view
	- utils.py  // 工具

- __init__.py
- cache_util.py  // 缓存相关装饰器，用于db_engine_specs.py，用途待解决
- cli.py  // flask-cli 实现terminal中输入指令的功能
- config.py  // 配置文件
- dataframe.py	// 格式化从数据库中取出的数据
- db_engine_specs.py  // 不同数据引擎的标准化
- dict_import_export_util.py  // schema与dict的转换 用途待解决
- exceptions.py   // 各种错误类
- extract_table_names.py  // 用途待解决
- forms.py  // 对应Sources->Upload a CSV功能. 基于fab的自定义view功能， 用途待解决
- import_util.py  // 导入数据源
- jinja_context.py  // 用途待解决
- legacy.py  // 用途待解决
- run.py  // 项目运行文件
- security.py	// 权限管理
- sql_lab.py	// sql语句执行相关
- sql_parse.py	// sql语句解析，主要用到sqlparse
- stats.logger.py	// 日志类
- utils.py	// 公用方法
- viz.py  // 图表类
```



### Sqlalchemy的使用

```python
# 初始化
from flask_appbuilder import SQLA
app = Flask(__name__)
db = SQLA(app)  # Init SQLAlchemy
```

```python
# 创建表
class SqlaTable(Model, BaseDatasource):

    """An ORM object for SqlAlchemy table references"""
    # ...
    __tablename__ = 'tables'
    __table_args__ = (UniqueConstraint('database_id', 'table_name'),)

    table_name = Column(String(250))
    main_dttm_col = Column(String(250))
    database_id = Column(Integer, ForeignKey('dbs.id'), nullable=False)
    # ...

    def __repr__(self):
        return self.name
    
# 增
obj = models.KeyValue(value=value)
db.session.add(obj)
db.session.commit()

db.session.merge(obj)??

# 删
db.session.delete(r)
db.session.commit()

# 改
target = db.session.query(models.KeyValue).filter_by(id='1').one()
target.value = 'new value'
db.session.commit()

# 查
db.session.query(models.KeyValue).filter_by(id='1').one()  # first(),all()
db.session.query(models.KeyValue).filter(id=='1').one()  # first(),all()

```



## 功能实现

### 图表类型

**基础知识:**	[d3](https://github.com/d3/d3)，[nvd3](https://github.com/novus/nvd3) ([livecode](http://nvd3.org/livecode/index.html))

**前端:**	superset/assets/src/visualizations/index.js

```
	由index.js进入visualizations中图表类型的具体实现文件
```

**后端实现:**	superset/viz.py  所有图表类基于BaseViz， 最后加入viz_types

**使用:**	调用viz.viz_types[viz_type]



### 数据库迁移(db migrate的实现)

**实现：**

```python
# superset/__init__.py
from flask_appbuilder import SQLA
from flask_migrate import Migrate
app = Flask(__name__)
db = SQLA(app)  # Init SQLAlchemy
migrate = Migrate(app, db, directory=APP_DIR + '/migrations')  # 生成migration

# superset/cli.py
@app.shell_context_processor
def make_shell_context():
    return dict(app=app, db=db)
```

**使用：**

```shell
superset db migrate  # 收集Model类的改变，存储到migration中
superset db upgrade  # 将migration应用到数据库
```



### 权限管理（security）

**基础知识:**	flask-appbuilder.[security](https://flask-appbuilder.readthedocs.io/en/latest/security.html)

**使用:**	



### 数据库操作



### 数据处理(dataframe)

**基础知识:**	pandas



### celery

**基础知识:**	[celery](http://docs.celeryproject.org/en/latest/index.html), [celery with flask](http://flask.pocoo.org/docs/1.0/patterns/celery/)

**配置：**([superset](http://superset.apache.org/installation.html#sql-lab)官方文档相关)

```python
class CeleryConfig(object):
    # 任务调度队列，Celery组件本身并不提供队列服务，你需要集成第三方消息中间件
    BROKER_URL = 'redis://:admin@localhost:6379/0' 
    CELERY_IMPORTS = ('superset.sql_lab',)  
    CELERY_RESULT_BACKEND = 'redis://:admin@localhost:6379/1'  # 执行结果存储
    CELERY_ANNOTATIONS = {'tasks.add': {'rate_limit': '10/s'}}
CELERY_CONFIG = CeleryConfig
```

**调用:**

```python
sql_lab.get_sql_results.delay()
```

```python
@celery_app.task(bind=True, soft_time_limit=SQLLAB_TIMEOUT)
def get_sql_results()
```

**启动：**(控制台输入,需先启动redis)

```
celery -A superset.sql_lab.celery_app worker
```

