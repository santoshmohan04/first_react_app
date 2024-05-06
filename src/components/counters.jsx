import React from "react";
import Counter from "./counter";
import { useDispatch, useSelector } from 'react-redux';
import { addCounter, resetCounter } from "../redux";

function Counters() {
  const counters = useSelector(state => state.counters.counter);
  const dispatch = useDispatch();

    return (
      <div className="m-3">
        <button
          onClick={() => dispatch(resetCounter())}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(addCounter())}
          className="btn btn-primary btn-sm m-2"
        >
          Add
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
          />
        ))}
      </div>
    );
}

export default Counters;
