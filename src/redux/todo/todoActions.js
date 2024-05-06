import * as todoactions from './todoType';
  
  export const addTodo = (data) => {
    return {
      type: todoactions.ADD_TODO_REQUEST,
      data: data
    }
  }

  export const removeTodo = (data) => {
    return {
      type: todoactions.REMOVE_TODO_REQUEST,
      data: data
    }
  }

  export const updateTodo = (data) => {
    return {
      type: todoactions.UPDATE_TODO_REQUEST,
      data: data
    }
  }

  export const completeTodo = (data) => {
    return {
      type: todoactions.COMPLETE_TODO_REQUEST,
      data: data
    }
  }