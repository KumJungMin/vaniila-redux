
# 1. 바닐라 Redux

## 1) 바닐라 JS로 증감버튼 만들기

### (1) index.html
- 증감 버튼과 값을 보여주는 `span` 태그
```html
<button id="add"></button>
<span></span>
<button id="minis"></button>
```

### (2) index.js
- `index.html`에 있는 태그 불러오기
```js
const plus = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");
```
<br/>

- `updateCount`는 `number`의 `text`값을 `count`로 변경해준다.

- `handle..`함수들은 호출 시, `count`값을 바꾸고 `updateCount`를 호출한다.

- `addEventListener`에 `click`이벤트시 `handle...`을 호출한다.
```js
let count = 0;
number.innerText = count;

const updateCount =()=>{
    number.innerText = count;
}

const handleAdd=()=>{
    count = count + 1;
    updateCount();
}
const handleMinus=()=>{
    count = count - 1;
    updateCount();
}


plus.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);


```


<br/>

## 2) 바닐라 JS + Redux로 증감버튼 만들기

### (0) redux 개념
- `redux`의 `store`는 `data`값이 저장되는 공간이다.(`state` 저장공간)

- `state`는 어플리케이션에서 변경되는 데이터를 말한다.

- 여기서는 `count`가 `state`이며, `count`를 수정하는 게 목표이다.

- 그 후 우리는 `html`에게 `count`를 업데이트하라고 알려줘야 한다.

- `store`는 `data`를 저장하는 저장소이고, `redux`는 `data` 관리를 한다.

- 이 코드에서는 `redux`가 `count+1`, `count-1`을 관리하는 역할이다.

<br/>

### (1) redux 설치하기

```
yarn add redux
```

### (2) index.js

- `redux`의 `createStore`을 `import`한다.
```js
import {createStore} from 'redux'

const plus = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;
const ADD = "add";
const Minus  = "minus";

```

- `store`를 생성한다.

- `createStore`는 `reducer`함수를 필요로 한다.

- `reducer`는 `data`를 수정하는 객체 함수이다.

- `store`에는 `dispatch`, `subscribe`, `getState`속성이 있다.

```js
const store = createStore(reducer);
```

<br/>

- `reducer`가 `return`하는 게 어플리케이션의 `data`가 된다.  
- `data`를 수정하고 싶으면 `reducer`에 접근하면 된다.
- `reducer`에서는 `action`을 인자로 받아, `action`타입에 따라 다른 값을 리턴한다.
```js
const reducer = (count=0, action) => {  //state, action을 인자로
   switch(action.type){                 //액션타입별로 다른 값을 return
       case ADD:
           return count + 1;
        case Minus:
            return count - 1;
        default : 
            return count;
   }
};
```
 
<br/>

- `reducer`에게 `action`은 어떻게 보낼까?

- `store`의 `dispatch`함수를 사용하여, `reducer`에 `action`을 보낼 수 있다.

- 이때, `action`은 객체형태여야(`{type : ADD}`) 한다.

- `store`의 `subscribe`는 우리에게 `state`안의 변화를 알려준다.

- `onChange`를 `subscribe`해서, `store.getState()`값 변경시 적용하게 한다.

```js
const onChange =()=> {
    number.innerText = store.getState();
};
store.subscribe(onChange);

plus.addEventListener("click", () => {
    store.dispatch({type : ADD});
})

minus.addEventListener("click", () => {
    store.dispatch({type : Minus});
})
```


<br/>

## 3) 바닐라 redux로 to-do list 만들기

### (1) index.html

```html
<form id="formid">
    <input type="text" id="inputid"/>
    <button>add</button>
</form>
<ul id="ulid"></ul>
```

<br/>

### (2) index.js

- `redux`의 `createStore`를 `import`하기

```js
import {createStore} from 'redux';
```
<br/>

- `html`에서 태그들을 불러온다.

- `action`에 쓰이는 타입들을 변수에 저장하여 사용한다.(`ADD_TODO..`)

```js
const form = document.getElementById("formid");
const input = document.getElementById("inputid");
const ul = document.getElementById("ulid");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

```

<br/>

- `ACTION_ADD_TODO`은 `addToDo`에서 `dispatch`하는 객체이다.

- `ACTION_ADD_TODO`은 `reducer`에게 보낼 `state`, `action`이 정의되어 있다. 

```js
const ACTION_ADD_TODO =(text)=>{
    return {
        type : ADD_TODO,
        text
    }
}
//addToDo에서는 값을 받아 -> store에 액션과 값을 넣어 보낸다.
//const addToDo = text => {
//    store.dispatch(ACTION_ADD_TODO(text));
//}


const ACTION_DELETE_TODO=(id)=>{
    return{
        type: DELETE_TODO,
        id
    }
}

```

<br/>

- `action`에 따라 `state`를 수정하는 `reducer`만든다.

- 앱이 처음 시작될 때, `state`가 없으므로 비어있는 array로 둔다.

- `...state`는 ES6의 문법으로, `state`에 저장된 모든 값을 가져오는 코드이다.

- `ADD_TODO`은 기존의 `state`에 `{text : action.text, id: Date.now()}`를 추가한 복사본을 리턴한다.

- `DELETE_TODO`은 `state`에서 `filter`을 이용하여, 해당 `id`값과 다른 사본값들을 리턴한다.

*NEVER USE MUTATE STATE* 

```js
const store = createStore(reducer);  

const reducer = (state=[], action)=>{
    switch(action.type){
        case ADD_TODO:
            return [...state, {text : action.text, id: Date.now()}];
        case DELETE_TODO : 
            return state.filter(todo=> todo.id !== action.id);
        default :
            return [];
    }
}
```


<br/>

- `store.subscribe(paintToDos)`를 해서 `store`에서 `painToDos`의 변화감지 및 적용한다.

- `paintToDos`는 `store`의 `getState`를 해 변화된 값을 가져온다.

- `getState`결과, `state`값이 변경되었으면 html에 새로운 코드를 추가한다.


```js

const paintToDos =()=>{
    const toDos = store.getState();
    ul.innerHTML = "";  //매번 입력때마다 다 쓰는데, 그렇게 하지 않고 지금작성한 것만 추가하기
    toDos.forEach((toDo)=>{
        const li = document.createElement("li");
        const btn = document.createElement("button");
        
        btn.innerText = "delete";
        btn.addEventListener("click", deleteTodo);
         
        li.id = toDo.id;
        li.innerText = toDo.text;

        li.appendChild(btn);
        ul.appendChild(li);
    })
}

store.subscribe(paintToDos);     
//paintToDos에서는 getState()를 사용하여 state의 변화를 감지하고 가져온다.
//paintToDos에서 getState가 변화발생 역할을 한다.

```

- `addToDo`에서는 값을 받아 -> `store`의 `dispatch`를 사용해 `reducer`에게 액션과 값을 넣어 보낸다.

- `deleteTodo`은 id값을 받아 삭제하는 역할을 하므로, `id`값을 `dispatch`한다.
```js
const addToDo = text => {
    store.dispatch(ACTION_ADD_TODO(text));
}
const deleteTodo =e=>{
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(ACTION_DELETE_TODO(id));
}
```
<br/>

- 제출을 클릭했을 때, `input`에서 받은 값을 `toDo`에 저장하고 -> `addToDo`에 이 값을 보낸다.
```js

const onSubmit = e => {
    e.preventDefault();
    // 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드입니다. .
    //.. a태그를 클릭 했을 때 preventDefault() 메서드를 실행시켜 주면 페이지 이동을 하는 기본 기능을 막는 것 
    const toDo = input.value;
    input.value = "";
    addToDo(toDo);
}
form.addEventListener("submit", onSubmit);


```





<br/> <br/>


# 2. 리액트 Redux 

- 파일 구조 

    src
    
        components
            App.js
            ToDo.js
            
        routes
            Detail.js
            Home.js
            
        index.js
        store.js


<br/>

- 설치
`
yarn add react-redux react-router-dom
`

## 1) components

### (1) App.js

- `Home`, `Detail`로 가는 링크를 담느 컴포넌트.

```js
import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from "../routes/Home";
import Detail from "../routes/Detail";

function App(){
    return ( 
    <Router>
        <Route path="/" exact component={Home}></Route>
        <Route path="/:id" exact component={Detail}></Route>
    </Router>
    );       
}

export default App;
```

<br/>

### (2) ToDo.js
- 글과 삭제 버튼을 만드는 컴포넌트

- 누군가가 버튼을 클릭하면 -> `onBtnClick`이 실행된다.

- `onBtnClick`는 `mapDispatchToProps`에서 정한 함수로, `deleteToDo`로 `dispatch`한다.

- `actionCreaters`는 `id`값을 받아 -> `deleteToDo`한다.

```js
import React from 'react';
import {connect} from 'react-redux';
import {actionCreaters} from '../store';
import {Link} from 'react-router-dom';

const ToDo =({text, onBtnClick, id})=> {
return <li>
    
    <Link to={`/${id}`}>{text} </Link>
    <button onClick = {onBtnClick}>DELETE</button></li>
}

function mapDispatchToprops(dispatch, ownProps){
    return {
        onBtnClick : () => dispatch(actionCreaters.deleteToDo(ownProps.id))
    }
}

export default connect(null, mapDispatchToprops)(ToDo);  //ownProps는 ToDo
```



<br/>

## 2) routes

### (1) Home.js


```js
import React, { useState } from "react";
import {connect} from 'react-redux';
import { actionCreaters } from "../store";
import ToDo from '../components/ToDo'

 function Home({ toDos, addToDo }) {       //toDos 값 객체, mapDispatchToProps의 addToDo
   const [text, setText] = useState("");   //text state
   function onChange(e) {                  //input(e)의 target.value가 변하면 -> value로 setTexgt
     setText(e.target.value);
   }
   function onSubmit(e) {                  //제출시->addToDo로 text값 보냄
     e.preventDefault();                   //e객체가 가진 원래 기능 차단
     setText("");                          //input안에 보일 text값 리셋
     addToDo(text);                        //addToDo에 text값 추가
   }
   return (
     
       <h1>To Do</h1>
       <form onSubmit={onSubmit}>           //text를 value로 함
         <input type="text" value={text} onChange={onChange} />
         <button>Add</button>
       </form>
   <ul>{toDos.map(toDo=>(
       <ToDo {...toDo} key={toDo.id}/>
   ))}</ul>
    
   );
 }
```
- `mapStateToProps`

: `redux store`에서 온 `state`, `components`의 `ownProps`인자를 가진다.

: 우리는 `mapStateToProps`를 사용해서 `redux store`에서 무언가를 가져올 수 있다.

: ` store`에 있는 `state`를 `getState()`를 통해 가져와서 컴포넌트에 전해주는 역할을 한다.

: `connect`는 `Home`컴포넌트 `props`에 값을 추가하도록 허용해준다.

<br/>

- `mapDispatchToProps`

: `component`가 `dispatch`동작을 하게 한다.

: `connect`의 두 번째 인자로 들어간다.

: `mapState..`함수를 사용하면 `Home`에서 직접 dispatch, creator를 처리하지 않아도 된다.

```js
function mapStateToProps(state){  //redux의 state를 가져와서 toDos에 담음
    return {toDos : state};
}
function mapDispatchToProps(dispatch){
    return {
        addToDo: text => dispatch(actionCreaters.addToDo(text))
        //addToDo는 dispatch를 호출한다.
        //dispatch는 actionCreaters를 호출한다.
        //actionCreaters의 addToDo는 text값을 필요로 한다.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```


<br/>

### (2) Detail.js

```js
import React from 'react';
import {connect} from 'react-redux'; 

function Detail({toDo}){
    return(<div>
        <h1>{toDo?.text}</h1>
        <h5>created at : {toDo?.id}</h5>
    </div> 
    );
}

function mapStateToProps(state, ownProps){
    const id = ownProps.match.params.id;
    return {toDo: state.find(toDo=>toDo.id === parseInt(id))}
}

export default connect(mapStateToProps, null)(Detail);
```


<br/>

## 3) store.js

- `redux`의 `store`관련 코드를 작성한 곳이다.

- `store`, `reducer` 을 만든다.

```js
import { createStore } from "redux";

 //추가, 삭제하는 액션 정의
 const ADD = "ADD";
 const DELETE = "DELETE";

 //addToDo는 text를 받아 -> reducer에 ADD액션, text값을 보냄
 export const addToDo = text => {
   return {
     type: ADD,
     text
   };
 };

 //deleteToDo는 id를 받아->reducer에 DELETE, id값으 보내
 export const deleteToDo = id => {
   return {
     type: DELETE,
     id : parseInt(id)
   };
 };

 //reducer는 array형태의 state, action값을 인자로 하
 const reducer = (state = [], action) => {
   switch (action.type) {
   
     //ADD액션의 경우, 기존 state에 text값을 추가함
     case ADD:
       return [{ text: action.text, id: Date.now() }, ...state];
       
     //DELETE액션의 경우, 기존state에서 해당id값을 제외한 객체를 리턴함
     case DELETE:
       return state.filter(toDo => toDo.id !== action.id);
       
     //일반적인 경우, state를 리턴함
     default:
       return state;
   }
 };

 //store에 reducer객체 함수를 적용한다.
 const store = createStore(reducer);

 //id 혹은 text를 받아->action을 리턴하는 함수를 export한다.
 //외부에서 store에 있는 reducer에 접근할 수 있음
 export const actionCreaters = {
  addToDo,
  deleteToDo
 }
 export default store;
```

<br/>

## 4) index.js

- 리액트는 모든 부분을 render하지 않는다.

- 변화가 일어난 부분만 render한다.

- 그러므로, `subscribe`를 하기 위해서는 `redux-react`가 필요하다.

- `react-redux`를 사용하여, 우리는 `store`의 변동사항을 `subscribe`할 수 있다.

- 그리고 `store`에 변동이 생기면 react의 모든 걸 render한다.

- 이 과정을 위해 `index`와 `store`를 연결해야한다.

```js
//react-redux해보기
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store';

//index에 store를 연결하기 위해 Provider의 store에 import하 store를 추가함
//-redux state로부터 정보를 가져오기 용이함
ReactDOM.render(<Provider store={store}>
    <App/>
    </Provider>, document.getElementById("root"));


```
