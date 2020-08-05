import { createStore } from "redux";
import {createAction} from "@reduxjs/toolkit";

// const addToDo = createAction("ADD");
// const deleteToDo = createAction("DELETE");
 const ADD = "ADD";
 const DELETE = "DELETE";


 export const addToDo = text => {
   return {
     type: ADD,
     text
   };
 };

 export const deleteToDo = id => {
   return {
     type: DELETE,
     id : parseInt(id)
   };
 };

 const reducer = (state = [], action) => {
   switch (action.type) {
     case ADD:
       return [{ text: action.text, id: Date.now() }, ...state];
     case DELETE:
       return state.filter(toDo => toDo.id !== action.id);
     default:
       return state;
   }
 };

 const store = createStore(reducer);

 export const actionCreaters = {
  addToDo,
  deleteToDo
 }
 export default store;