import * as counteractions from './countersType';
import { v4 as uuidv4 } from "uuid";

const initialState = {
  counter: []
}

const counterreducer = (state = initialState, action) => {
  switch (action.type) {
    case counteractions.ADD_COUNTER_REQUEST:
      return {
        ...state,
        counter: [...state.counter, { id: uuidv4(), value: 0 }]
      }
    case counteractions.REMOVE_COUNTER_REQUEST:
      return {
        ...state,
        counter: state.counter.filter(counter => counter.id !== action.data)
      }
    case counteractions.INCREMENT_COUNTER_REQUEST:
      return {
        ...state,
        counter: state.counter.map(counter =>
          counter.id === action.data.id
            ? { ...counter, value: counter.value + 1 }
            : counter
        )
      }
    case counteractions.DECREMENT_COUNTER_REQUEST:
      return {
        ...state,
        counter: state.counter.map(counter =>
          counter.id === action.data.id && counter.value > 0
            ? { ...counter, value: counter.value - 1 }
            : counter
        )
      }
    case counteractions.RESET_COUNTER_REQUEST:
      return {
        ...state,
        counter: []
      }
    default: return state
  }
}

export default counterreducer
