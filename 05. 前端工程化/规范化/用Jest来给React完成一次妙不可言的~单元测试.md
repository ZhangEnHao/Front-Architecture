> 小型测试，通常也叫单元测试，一般来说都是自动化实现的。用于验证一个单独的函数，组件，独立功能模块是否可以按照预期的方式运行。

### 技术栈选择

当我们想要为 React 应用编写单元测试的时候，官方推荐是使用 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) + [Jest](https://jestjs.io/) 的方式。

counter.js
```javaScript

// counter.js
import React from "react";

class Counter extends React.Component {
  state = { count: 0 };
  increment = () => this.setState(({ count }) => ({ count: count + 1 }));
  decrement = () => this.setState(({ count }) => ({ count: count - 1 }));
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
```

counter-rtl.test.js
```javaScript
// counter-rtl.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./counter";

describe("<Counter />", () => {
  it("properly increments and decrements the counter", () => {
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    fireEvent.click(incrementButton);
    expect(counter.textContent).toEqual("1");

    fireEvent.click(decrementButton);
    expect(counter.textContent).toEqual("0");
  });
});
```

### 可遵循的简单规则

AAA 模式：编排（Arrange），执行（Act），断言（Assert）。

几乎所有的测试都是这样写的。
  - 首先，编排 (初始化) 代码，以便为接下来的步骤做好一切准备。
  - 然后，执行用户应该执行的步骤 (例如单击)。
  - 最后，对应该发生的事情进行断言。

```javaScript

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./app";

describe("<Counter />", () => {
  it("properly increments the counter", () => {
    // Arrange
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    // Act
    fireEvent.click(incrementButton);
    // Assert
    expect(counter.textContent).toEqual("1");

    // Act
    fireEvent.click(decrementButton);
    // Assert
    expect(counter.textContent).toEqual("0");
  });
});
```

1. 编排（Arrange）

编排需要完成 2 项任务：
  - 渲染组件
  - 获取所需的 DOM 的不同元素

渲染组件可以使用 RTL's API 的 render 方法完成。签名如下：
```javaScript 
function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult
```

``` ui ```  是你要加载的组件。``` options ``` 通常不需要指定选项。[官方文档在这里](https://testing-library.com/docs/react-testing-library/api#render-options)，如果要指定的话，如下值是对官方文档的简单摘录：
  - ```container```：React Testing 库将创建一个 div 并将该 div 附加到文档中。而通过这个参数，可以自定义容器。
  - ```baseElement```：如果指定了容器，则此值默认为该值，否则此值默认为 document.documentElement。这将用作查询的基本元素，以及在使用 debug() 时打印的内容。
  - ```hydrate```：用于服务端渲染，使用 ReactDOM.hydrate 加载你的组件。
  - ```wrapper```：传递一个组件作为包裹层，将我们要测试的组件渲染在其中。这通常用于创建可以重用的自定义 render 函数，以便提供常用数据。
  - ```queries```：查询绑定。除非合并，否则将覆盖 DOM 测试库中的默认设置。

基本上，这个函数所做的就是使用 ReactDOM 呈现组件。在直接附加到 document.body 的新创建的 div 中呈现 (或为服务器端呈现提供水合物)。因此，可以从 DOM 测试库和其他一些有用的方法 (如 debug、rerender 或 unmount) 获得大量查询。

文档：[https://testing-library.com/docs/dom-testing-library/api-queries#queries](https://testing-library.com/docs/dom-testing-library/api-queries#queries)

有些实用程序允许您像用户那样查询 DOM:通过标签文本、占位符和标题查找元素。以下是一些来自文档的查询示例：
  - ```getByLabelText```: 搜索与作为参数传递的给定文本匹配的标签，然后查找与该标签关联的元素。
  - ```getByText```: 搜索具有文本节点的所有元素，其中的 textContent 与作为参数传递的给定文本匹配。
  - ``getByTitle``: 返回具有与作为参数传递的给定文本匹配的 title 属性的元素。
  - ```getByPlaceholderText```: 搜索具有占位符属性的所有元素，并找到与作为参数传递的给定文本相匹配的元素。

一个特定的查询有很多变体：
  - ```getBy```: 返回查询的第一个匹配节点，如果没有匹配的元素或找到多个匹配，则抛出一个错误。
  - ```getAllBy```: 返回一个查询中所有匹配节点的数组，如果没有匹配的元素，则抛出一个错误。
  - ```queryBy```: 返回查询的第一个匹配节点，如果没有匹配的元素，则返回 null。这对于断言不存在的元素非常有用。
  - ```queryAllBy```: 返回一个查询的所有匹配节点的数组，如果没有匹配的元素，则返回一个空数组 ([])。
  - ```findBy```: 返回一个 promise，该 promise 将在找到与给定查询匹配的元素时解析。如果未找到任何元素，或者在默认超时时间为 4500 毫秒后找到了多个元素，则承诺将被拒绝。
  - ```findAllBy```: 返回一个 promise，当找到与给定查询匹配的任何元素时，该 promise 将解析为元素数组。

2. 执行（Act）

fireEvent
```javaScript
fireEvent(node: HTMLElement, event: Event)
```

简单地说，这个函数接受一个 DOM 节点并触发 DOM 事件，如单击、焦点、更改等。可以在这里找到许多其他可以调度的事件。

例子相当简单，因为我们只是想点击一个按钮，所以我们只需：
```javaScript
fireEvent.click(incrementButton);
// OR
fireEvent.click(decrementButton);
```

3. 断言（Assert）

接下来是最后一部分。触发事件通常会触发应用程序中的一些更改，因此必须执行一些断言来确保这些更改发生。在测试中，这样做的一个好方法是确保呈现给用户的计数已经更改。因此，只需断言 textContent 属性的计数器是递增或递减：

```javaScript
expect(counter.textContent).toEqual("1");
expect(counter.textContent).toEqual("0");
```

> 注意：这个 AAA 模式并不特定于测试库。事实上，它甚至是任何测试用例的一般结构。

### 8 个典型的例子

先下载示例：[rts-guide-demo](https://github.com/jokingzhang/rts-guide-demo)。

1. 如何创建测试快照

快照，顾名思义，允许我们保存给定组件的快照。当您进行更新或重构，并希望获取或比较更改时，它会提供很多帮助。

现在，让我们看一下 App.js 文件的快照。

App.test.js
```javaScript
import React from 'react'
import {render, cleanup} from '@testing-library/react'
import App from '../App'

 afterEach(cleanup)

 it('should take a snapshot', () => {
    const { asFragment } = render(<App />)

    expect(asFragment()).toMatchSnapshot()
})

```

要获取快照，首先必须导入 ``` render ``` 和 ```cleanup``` 。这两种方法将在本文中大量使用。

 ``` render ``` ，顾名思义，有助于渲染 React 组件。```cleanup``` 作为一个参数传递给 ```afterEach``` ，以便在每次测试后清理所有东西，以避免内存泄漏。

接下来，可以使用 ``` render ``` 呈现 App 组件，并从方法中获取 ```afterEach``` 作为返回值。最后，确保 App 组件的片段与快照匹配。

现在，要运行测试，打开终端并导航到项目的根目录，并运行以下命令：
```javaScript
npm test
```

因此，它将创建一个新的文件夹 __snapshots__ 和一个文件 App.test.js:

App.test.js.snap
```javaScript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`should take a snapshot 1`] = `
<DocumentFragment>
  <div
    class="App"
  >
    <h1>
      Testing Updated
    </h1>
  </div>
</DocumentFragment>
`;
```

如果，你在 App.js 中做出更改，测试将失败，因为快照将不再匹配。更新快照可以按 u，或者将对应快照文件删除即可。

2. 测试 DOM 元素

要测试 DOM 元素，首先必须查看 TestElements.js 文件。

TestElements.js
```javaScript
import React from 'react'

const TestElements = () => {
 const [counter, setCounter] = React.useState(0)

 return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={() => setCounter(counter + 1)}> Up</button>
    <button disabled data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }

  export default TestElements
```

在这里，您唯一需要保留的是``` data-testid ```。它将用于从测试文件中选择这些元素。现在，让我们完成单元测试：

测试计数器是否为 0，以及按钮的禁用状态：

TestElements.test.js
```javaScript
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from '@testing-library/react';
import TestElements from '../components/TestElements'

afterEach(cleanup);

  it('should equal to 0', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('counter')).toHaveTextContent(0)
   });

   it('should be enabled', () => {
    const { getByTestId } = render(<TestElements />);
    expect(getByTestId('button-up')).not.toHaveAttribute('disabled')
  });

  it('should be disabled', () => {
    const { getByTestId } = render(<TestElements />); 
    expect(getByTestId('button-down')).toBeDisabled()
  });
```

正如您所看到的，语法与前面的测试非常相似。唯一的区别是，我们使用 getByTestId 选择必要的元素 (根据 data-testid ) 并检查是否通过了测试。换句话说，我们检查 <h1 data-testid="counter">{ counter }</h1> 中的文本内容是否等于 0。

这里，像往常一样，我们使用 getByTestId 选择元素和检查第一个测试如果按钮禁用属性。对于第二个，如果按钮是否被禁用。

如果您保存文件或在终端纱线测试中再次运行，测试将通过。

3. 测试事件

TestEvents.js
```javaScript
import React from 'react'

const TestEvents = () => {
  const [counter, setCounter] = React.useState(0)

return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={() => setCounter(counter + 1)}> Up</button>
    <button data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
 </>
    )
  }

  export default TestEvents
```

编写测试：点击按钮时，测试计数器的增减是否正确：
```javaScript
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from '@testing-library/react';
import TestEvents from '../components/TestEvents'

  afterEach(cleanup);

  it('increments counter', () => {
    const { getByTestId } = render(<TestEvents />); 

    fireEvent.click(getByTestId('button-up'))

    expect(getByTestId('counter')).toHaveTextContent('1')
  });

  it('decrements counter', () => {
    const { getByTestId } = render(<TestEvents />); 

    fireEvent.click(getByTestId('button-down'))

    expect(getByTestId('counter')).toHaveTextContent('-1')
  });
```

可以看到，除了预期的文本内容之外，这两个测试非常相似。第一个测试使用 fireEvent.click() 触发一个 click 事件，检查单击按钮时计数器是否增加到 1。第二个检查当点击按钮时计数器是否减为 -1。

fireEvent 有几个可以用来测试事件的方法，可以自由地深入文档了解更多信息。

4. 测试异步操作

异步操作是需要时间才能完成的操作。它可以是 HTTP 请求、计时器等等。

TestAsync.js
```javaScript

import React from 'react'

const TestAsync = () => {
  const [counter, setCounter] = React.useState(0)

  const delayCount = () => (
    setTimeout(() => {
      setCounter(counter + 1)
    }, 500)
  )

  return (
    <>
      <h1 data-testid="counter">{ counter }</h1>
      <button data-testid="button-up" onClick={delayCount}> Up</button>
      <button data-testid="button-down" onClick={() => setCounter(counter - 1)}>Down</button>
  </>
      )
    }

  export default TestAsync
```

这里，我们使用 setTimeout() 将递增事件延迟 0.5 秒。测试计数器在 0.5 秒后判断是否增加：

TestAsync.test.js
```javaScript
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import TestAsync from '../components/TestAsync'

afterEach(cleanup);

  it('increments counter after 0.5s', async () => {
    const { getByTestId, getByText } = render(<TestAsync />); 

    fireEvent.click(getByTestId('button-up'))

    const counter = await waitForElement(() => getByText('1')) 

    expect(counter).toHaveTextContent('1')

});
```

要测试递增事件，首先必须使用 async/await 来处理操作，因为如前所述，完成它需要时间。接下来，我们使用一个新的助手方法 getByText()。这类似于 getByTestId()。getByText() 选择文本内容，而不是 id。现在，在单击按钮之后，我们等待 waitForElement(() => getByText('1') 来增加计数器。一旦计数器增加到 1，我们现在可以移动到条件并检查计数器是否等于 1。

5. 测试 React Redux

TestRedux.js
```javaScript
import React from 'react'
import { connect } from 'react-redux'

const TestRedux = ({counter, dispatch}) => {

 const increment = () => dispatch({ type: 'INCREMENT' })
 const decrement = () => dispatch({ type: 'DECREMENT' })

 return (
  <>
    <h1 data-testid="counter">{ counter }</h1>
    <button data-testid="button-up" onClick={increment}>Up</button>
    <button data-testid="button-down" onClick={decrement}>Down</button>
 </>
    )
  }

export default connect(state => ({ counter: state.count }))(TestRedux)
```

store/reducer.js
```javaScript

export const initialState = {
    count: 0,
  }

  export function reducer(state = initialState, action) {
    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1,
        }
      case 'DECREMENT':
        return {
          count: state.count - 1,
        }
      default:
        return state
    }
  }
```

编写单元测试。测试初始状态是否为 0:
```javaScript
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, cleanup, fireEvent } from '@testing-library/react';
import { initialState, reducer } from '../store/reducer'
import TestRedux from '../components/TestRedux'

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

 afterEach(cleanup);

it('checks initial state is equal to 0', () => {
    const { getByTestId } = renderWithRedux(<TestRedux />)
    expect(getByTestId('counter')).toHaveTextContent('0')
  })

  it('increments the counter through redux', () => {
    const { getByTestId } = renderWithRedux(<TestRedux />, 
      {initialState: {count: 5}
  })
    fireEvent.click(getByTestId('button-up'))
    expect(getByTestId('counter')).toHaveTextContent('6')
  })

  it('decrements the counter through redux', () => {
    const { getByTestId} = renderWithRedux(<TestRedux />, {
      initialState: { count: 100 },
    })
    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('99')
  })
```

我们需要导入一些东西来测试 React Redux。这里，我们创建了自己的助手函数 renderWithRedux() 来呈现组件，因为它将被多次使用。

renderWithRedux() 作为参数接收要呈现的组件、初始状态和存储。如果没有存储，它将创建一个新的存储，如果它没有接收初始状态或存储，它将返回一个空对象。

接下来，我们使用 render() 来呈现组件并将存储传递给提供者。

也就是说，我们现在可以将组件 TestRedux 传递给 renderWithRedux() 来测试计数器是否等于 0。

测试计数器的增减是否正确：

为了测试递增和递减事件，我们将初始状态作为第二个参数传递给 renderWithRedux()。现在，我们可以单击按钮并测试预期的结果是否符合条件。

6. 测试 React Context

TextContext.js
```javaScript
import React from "react"

export const CounterContext = React.createContext()

const CounterProvider = () => {
  const [counter, setCounter] = React.useState(0)
  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)

  return (
    <CounterContext.Provider value={{ counter, increment, decrement }}>
      <Counter />
    </CounterContext.Provider>
  )
}

export const Counter = () => {  
    const { counter, increment, decrement } = React.useContext(CounterContext)   
    return (
     <>
       <h1 data-testid="counter">{ counter }</h1>
       <button data-testid="button-up" onClick={increment}> Up</button>
       <button data-testid="button-down" onClick={decrement}>Down</button>
    </>
       )
}

export default CounterProvider
```

通过 React Context 管理计数器状态。编写单元测试来检查它是否按预期运行。测试初始状态是否为 0:

TextContext.test.js
```javaScript
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup,  fireEvent } from '@testing-library/react'
import CounterProvider, { CounterContext, Counter } from '../components/TestContext'

const renderWithContext = (
  component) => {
  return {
    ...render(
        <CounterProvider value={CounterContext}>
            {component}
        </CounterProvider>)
  }
}

afterEach(cleanup);

it('checks if initial state is equal to 0', () => {
    const { getByTestId } = renderWithContext(<Counter />)
    expect(getByTestId('counter')).toHaveTextContent('0')
})

it('increments the counter', () => {
    const { getByTestId } = renderWithContext(<Counter />)

    fireEvent.click(getByTestId('button-up'))
    expect(getByTestId('counter')).toHaveTextContent('1')
  })

  it('decrements the counter', () => {
    const { getByTestId} = renderWithContext(<Counter />)

    fireEvent.click(getByTestId('button-down'))
    expect(getByTestId('counter')).toHaveTextContent('-1')
  })
```

与前面的 React Redux 部分一样，这里我们使用相同的方法，创建一个助手函数 renderWithContext() 来呈现组件。但是这一次，它只接收作为参数的组件。为了创建新的上下文，我们将 CounterContext 传递给 Provider。

现在，我们可以测试计数器最初是否等于 0。那么，计数器的增减是否正确呢？

正如您所看到的，这里我们触发一个 click 事件来测试计数器是否正确地增加到 1 并减少到 -1。

7. 测试 React Router

TestRouter.js
```javaScript
import React from 'react'
import { Link, Route, Switch,  useParams } from 'react-router-dom'

const About = () => <h1>About page</h1>
const Home = () => <h1>Home page</h1>

const Contact = () => {
 const { name } = useParams()
 return <h1 data-testid="contact-name">{name}</h1>
}

const TestRouter = () => {
    const name = 'John Doe'
    return (
    <>
      <nav data-testid="navbar">
        <Link data-testid="home-link" to="/">Home</Link>
        <Link data-testid="about-link" to="/about">About</Link>
        <Link data-testid="contact-link" to={`/contact/${name}`}>Contact</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/about:name" component={Contact} />
      </Switch>
    </>
  )
}

export default TestRouter
```

TestRouter.test.js
```javaScript
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { Router } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import TestRouter from '../components/TestRouter'


const renderWithRouter = (component) => {
  const history = createMemoryHistory()
  return { 
    ...render (
    <Router history={history}>
        {component}
    </Router>
    )
  }
}

it('should render the home page', () => {

  const { container, getByTestId } = renderWithRouter(<TestRouter />) 
  const navbar = getByTestId('navbar')
  const link = getByTestId('home-link')

  expect(container.innerHTML).toMatch('Home page')
  expect(navbar).toContainElement(link)
})

it('should navigate to the about page', ()=> {
  const { container, getByTestId } = renderWithRouter(<TestRouter />) 
  fireEvent.click(getByTestId('about-link'))
  expect(container.innerHTML).toMatch('About page')
})

it('should navigate to the contact page with the params', ()=> {
  const { container, getByTestId } = renderWithRouter(<TestRouter />) 
  fireEvent.click(getByTestId('contact-link'))
  expect(container.innerHTML).toMatch('John Doe')
})
```

要测试 React Router，首先必须有一个导航历史记录。因此，使用 createMemoryHistory() 来创建导航历史。

接下来，使用助手函数 renderWithRouter() 来呈现组件，并将历史记录传递给路由器组件。这样，就可以测试在开始时加载的页面是否是主页。以及导航栏是否加载了预期的链接。

测试当点击链接时，它是否用参数导航到其他页面：


现在，要检查导航是否工作，必须触发导航链接上的单击事件。

对于第一个测试，检查内容是否等于 About 页面中的文本，对于第二个测试，测试路由参数并检查它是否正确通过。

8. 测试 HTTP 请求

TestRouter.js 
```javaScript
import React from 'react'
import axios from 'axios'

const TestAxios = ({ url }) => {
  const [data, setData] = React.useState()

  const fetchData = async () => {
    const response = await axios.get(url)
    setData(response.data.greeting)    
  }     

  return (
    <>
      <button onClick={fetchData} data-testid="fetch-data">Load Data</button>
      { 
        data ?
        <div data-testid="show-data">{data}</div> :
        <h1 data-testid="loading">Loading...</h1>
      }
    </>
  )
}

export default TestAxios
```

TextAxios.test.js
```javaScript
import React from 'react'
import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement, fireEvent } from '@testing-library/react'
import axiosMock from 'axios'
import TestAxios from '../components/TestAxios'

jest.mock('axios')

it('should display a loading text', () => {
  const { getByTestId } = render(<TestAxios />)
  expect(getByTestId('loading')).toHaveTextContent('Loading...')
})

it('should load and display the data', async () => {
  const url = '/greeting'
  const { getByTestId } = render(<TestAxios url={url} />)

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: 'hello there' },
  })

  fireEvent.click(getByTestId('fetch-data'))

  const greetingData = await waitForElement(() => getByTestId('show-data'))

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(greetingData).toHaveTextContent('hello there')
})
```

这个测试用例有点不同，因为必须处理 HTTP 请求。为此，必须在 jest.mock('axios') 的帮助下模拟 axios 请求。

现在，可以使用 axiosMock 并对其应用 get() 方法。最后，使用 Jest 函数 mockResolvedValueOnce() 来传递模拟数据作为参数。

现在，对于第二个测试，可以单击按钮来获取数据并使用 async/await 来解析它。现在要测试三件事：
  - 如果 HTTP 请求已经正确完成
  - 如果使用 url 完成了 HTTP 请求
  - 如果获取的数据符合期望。

对于第一个测试，只检查加载消息在没有数据要显示时是否显示。









