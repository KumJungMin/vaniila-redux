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

export default connect(null, mapDispatchToprops)(ToDo);