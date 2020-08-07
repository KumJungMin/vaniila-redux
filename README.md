
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
















