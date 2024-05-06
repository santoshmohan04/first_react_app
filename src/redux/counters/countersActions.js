import * as counteractions from './countersType';
  
  export const addCounter = () => {
    return {
      type: counteractions.ADD_COUNTER_REQUEST
    }
  }

  export const removeCounter = (data) => {
    return {
      type: counteractions.REMOVE_COUNTER_REQUEST,
      data: data
    }
  }

  export const incrementCounter = (data) => {
    return {
      type: counteractions.INCREMENT_COUNTER_REQUEST,
      data: data
    }
  }

  export const decrementCounter = (data) => {
    return {
      type: counteractions.DECREMENT_COUNTER_REQUEST,
      data: data
    }
  }
  
  export const resetCounter = () => {
    return {
      type: counteractions.RESET_COUNTER_REQUEST
    }
  }
