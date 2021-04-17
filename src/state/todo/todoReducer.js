import { ADD_TODO, DELETE_TODO } from './todoActions';
import lib from '../../lib';
const { helper } = lib;

const initialState = {
    id: 0,
    todo_list: [],
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TODO:{
            const { item, id } = action.payload;
            // 유일 값 검증 후 추가
            const _state = state;
            _state.todo_list.push(item);
            const uniqArr = helper.getUniqObjFromArray(_state.todo_list, 'serviceAreaCode');
            
            return { ...state, todo_list: uniqArr }
        }
        case DELETE_TODO:
            const { id } = action.payload
            return {
                ...state,
                todo_list: state.todo_list.filter ((todo) => todo['serviceAreaCode'] != id)
            };
        default:
            return state;
    }
}

export default userReducer;