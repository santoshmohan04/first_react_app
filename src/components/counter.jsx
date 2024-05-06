import React from "react";
import { useDispatch } from 'react-redux';
import { incrementCounter, decrementCounter, removeCounter } from "../redux";

function Counter({ counter }) {
  const dispatch = useDispatch();

  const getBadgeClasses = () => {
    let classes = "badge m-2 bg-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  const formatCount = () => {
    const { value: count } = counter;
    return count === 0 ? "Zero" : count;
  }

  return (
    <div>
      <span className={getBadgeClasses()}>
        {formatCount()}
      </span>
      <button
        onClick={() => dispatch(incrementCounter(counter))}
        className="btn btn-secondary btn-sm m-2"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrementCounter(counter))}
        className="btn btn-secondary btn-sm"
      >
        Decrement
      </button>
      <button
        onClick={() => dispatch(removeCounter(counter.id))}
        className="btn btn-danger btn-sm m-2"
      >
        Delete
      </button>
    </div>
  );
}

export default Counter;
