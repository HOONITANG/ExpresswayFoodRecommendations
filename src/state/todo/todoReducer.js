import { ADD_TODO, DELETE_TODO, ADD_PARAM } from './todoActions';
import lib from '../../lib';
const { helper } = lib;

const initialState = {
    id: 0,
    todo_list: [],
    routeNo: "0010",
    placeholder: "경부선",
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
        case ADD_PARAM: 
            const { key, value } = action.payload;
            const _state = { ...state } ;
            _state[key] = value;
            if (state[key] == value) {
                return state;
            }
            return _state;
        default:
            return state;
    }
}

export default userReducer;