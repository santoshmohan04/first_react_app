import * as todoactions from './todoType';

const initialState = {
    todos: []
}

const todoreducer = (state = initialState, action) => {
    switch (action.type) {
        case todoactions.ADD_TODO_REQUEST:
            return {
                ...state,
                todos: [...state.todos, action.data]
            }
            
        case todoactions.REMOVE_TODO_REQUEST:
            return {
                ...state,
                todos: [
                    ...state.todos.filter((todo) => {
                        return todo.id !== action.data;
                    }),
                ],
            }
        case todoactions.COMPLETE_TODO_REQUEST:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.data) {
                        return {
                            ...todo,
                            completed: !todo.completed,
                        };
                    }
                    return todo;
                })
            }
        case todoactions.UPDATE_TODO_REQUEST:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.data.id) {
                        todo.title = action.data.title;
                    }
                    return todo;
                }),
            }
        default: return state
    }
}

export default todoreducer