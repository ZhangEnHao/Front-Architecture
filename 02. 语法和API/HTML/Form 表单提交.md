## 表单提交方式

1. 无刷新页面提交表单

```HTML
<form action="/url.do" method="post" target="targetIfr">
  <input type="text" name="name"/>
</form>
<iframe name="targetIfr" style="display:none"></iframe> 
```

用 ``` <form> ``` 中的 ``` target ``` 属性，指定在对应 ``` name ``` 的 ``` <iframe> ``` 打开。

2. 通过 ``` <input> ``` 的 ``` type=submit ``` 提交

```HTML
<form action="/url.do" method="post">
  <input type="text" name="name"/>
  <input type="submit" value="提交">
</form>
```

3. ``` JS ``` 提交 ``` form ``` 表单

```HTML
<form id="form" action="/url.do" method="post">
  <input type="text" name="name"/>
</form>

<script>
  document.getElementById("form").submit()
</script>
```

4. ``` AJAX ``` 异步提交表单数据

```HTML
<form id="form"  method="post">
  <input type="text" name="name" id="name"/>
</form>

<script>
var params = {"name", $("#name").val()}
$.ajax({
  type: "POST",
  url: "/url.do",
  data: params,
  dataType : "json",
  success: function(respMsg){
    // ...
  }
});
</script>
```

5. 上传文件（需设置：``` enctype ``` 字段）

```HTML
<form action="/url.do" enctype="multipart/form-data" method="post">
  <input type="file" name="name"/>
  <input type="submit" value="提交">
</form>
```


## 阻止表单提交

1. 阻止 ``` type="submit" ``` 的按钮默认事件

```javaScript
document.querySelector('#button1').addEventListener('click', function(e){
    e.preventDefault();
}, false);
```

2. 阻止 ``` form ``` 默认事件

```javaScript
document.querySelector('#form1').addEventListener('submit', function(e){
    e.preventDefault();
}, false);
```

3. 在 ``` onsubmit ``` 中返回 ``` false ```

```HTML
<HTML>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
    <form action="http://www.baidu.com" onsubmit="return toVaild()">
      <input type="text" id="ff" />
      <input type="submit" id="submit" value ="提交" />
    </form>
  </body>
  <script language="javascript">
    function toVaild(){
      var val = document.getElementById("ff").value;
      alert(val);
      if(val == "可以提交"){
        alert("校验成功，之后进行提交");
        return true;
      }else{
        alert("校验失败，不进行提交");
        return false;
      }
    }
  </script>
</HTML>
```


## 验证

在 ``` onsubmit ``` 监听到提交事件的时候，获取每个输入的值进行校验。

