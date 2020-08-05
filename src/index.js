//react-redux해보기
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(<Provider store={store}>
    <App/>
    </Provider>, document.getElementById("root"));










// //리덕스를 사용해 todoList를 만들고, 저장하기
// import {createStore} from 'redux';

// const form = document.getElementById("formid");
// const input = document.getElementById("inputid");
// const ul = document.getElementById("ulid");

// const ADD_TODO = "ADD_TODO";
// const DELETE_TODO = "DELETE_TODO";

// const ACTION_ADD_TODO =(text)=>{
//     return {
//         type : ADD_TODO,
//         text
//     }
// }
// const ACTION_DELETE_TODO=(id)=>{
//     return{
//         type: DELETE_TODO,
//         id
//     }
// }

// const reducer = (state=[], action)=>{
//     switch(action.type){
//         case ADD_TODO:
//             return [...state, {text : action.text, id: Date.now()}];
//         case DELETE_TODO : 
//             return state.filter(todo=> todo.id !== action.id);
//         default :
//             return [];
//     }

// }
// const store = createStore(reducer);
// // store.subscribe(store.getState());

// const paintToDos =()=>{
//     const toDos = store.getState();
//     ul.innerHTML = "";  //매번 입력때마다 다 쓰는데, 그렇게 하지 않고 지금작성한 것만 추가하기
//     toDos.forEach((toDo)=>{
//         const li = document.createElement("li");
//         const btn = document.createElement("button");
        
//         btn.innerText = "delete";
//         btn.addEventListener("click", deleteTodo);
         
//         li.id = toDo.id;
//         li.innerText = toDo.text;

//         li.appendChild(btn);
//         ul.appendChild(li);
//     })
// }
// store.subscribe(paintToDos);

// const addToDo = text => {
//     store.dispatch(ACTION_ADD_TODO(text));
// }
// const deleteTodo =e=>{
//     const id = parseInt(e.target.parentNode.id);
//     store.dispatch(ACTION_DELETE_TODO(id));
// }

// const onSubmit = e => {
//     e.preventDefault();
//     // 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드입니다. .
//     //.. a태그를 클릭 했을 때 preventDefault() 메서드를 실행시켜 주면 페이지 이동을 하는 기본 기능을 막는 것 
//     const toDo = input.value;
//     input.value = "";
//     addToDo(toDo);
// }
// form.addEventListener("submit", onSubmit);












//리덕스 후 더하기 빼기 버튼
// import {createStore} from "redux";

// const plus = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// number.innerText = 0;
// const ADD = "add";
// const Minus  = "minus";

// const reducer = (count=0, action) => {
//    switch(action.type){
//        case ADD:
//            return count + 1;
//         case Minus:
//             return count - 1;
//         default : 
//             return count;
//    }
   
//     // if(action.type === "add"){
//     //     return count + 1;
//     // }else if(action.type === "minus"){
//     //     return count - 1;
//     // }else{
//     //     return count;
//     // }

// };

// const store = createStore(reducer);

// const onChange =()=> {
//     number.innerText = store.getState();
// };
// store.subscribe(onChange);

// plus.addEventListener("click", () => {
//     store.dispatch({type : ADD});
// })

// minus.addEventListener("click", () => {
//     store.dispatch({type : Minus});
// })








//리덕스하기 전 바닐라 js
// const plus = document.getElementById("add");
// const minus = document.getElementById("minus");
// const number = document.querySelector("span");

// let count = 0;
// number.innerText = count;

// const updateCount =()=>{
//     number.innerText = count;
// }

// const handleAdd=()=>{
//     count = count + 1;
//     updateCount();
// }
// const handleMinus=()=>{
//     count = count - 1;
//     updateCount();
// }


// plus.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);


