import React from 'react';
// import {useParams} from 'react-router-dom';
import {connect} from 'react-redux'; 

function Detail({toDo}){
    // const id = useParams();
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