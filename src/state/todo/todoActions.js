// fetch all events
export const ADD_TODO = 'ADD_TODO'
//update current event id 
export const DELETE_TODO = 'DELETE_TODO'

let nextTodoId = 0;

export const updateUser = (user_id) => {
    return {
        type: UPDATE_USER,
        payload: user_id,
    }
}

export const addTodo = item => ({
    type: ADD_TODO,
    payload: { item }
});

export const deleteTodo = id => ({
    type: DELETE_TODO,
    payload: {
        id
    }
});


// export const fetchUsers = () => {
//     return (dispatch) => {
//         fetch(`${URL}/`)
//             .then(response => response.json())
//             .then(data => {
//                 dispatch({
//                     type: FETCH_USER,
//                     payload: data
//                 })
//             }).catch(function(err) {
//                 console.log(err);
//             })
//     }
// };
