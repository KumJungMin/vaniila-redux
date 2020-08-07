
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

## 1) 바닐라 JS + Redux로 증감버튼 만들기

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







