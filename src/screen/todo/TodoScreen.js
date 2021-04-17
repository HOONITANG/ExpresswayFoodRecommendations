import React from 'react'
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { COLORS } from '../../common/elements/theme'
import {  deleteTodo } from '../../state/todo/todoActions'
import TodoList from './components/TodoList'
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';

const TodoScreen = ({ todo_list, deleteTodo, navigation }) => {

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    const handleDeleteTodo = (id) => {
        deleteTodo(id)
    }

    return ( 
        <SafeAreaView style={{flex : 1, backgroundColor: COLORS.white}}>
            <TodoList todo_list={todo_list} onNavi={navigationToFoodList} handleDeleteTodo={handleDeleteTodo} />
        </SafeAreaView>
    )
}


const mapStateToProps = (state, ownPros) => {
    return {
        todo_list: state.todos.todo_list
    }
}

const mapDispatchToProps = { deleteTodo }

// const mapDispatchToProps = dispatch => {
//     return {
//         addTodo: () => dispatch(addTodo),
//         deleteTodo: () => dispatch(deleteTodo)
//     }
// }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoScreen)