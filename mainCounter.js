import { createStore } from 'redux';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { deepFreeze } from 'deep-freeze';

var counter = function (state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

var store = createStore(counter);

const render = () => {
    ReactDOM.render(
        <Counter 
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT'})}
        onDecrement={() => store.dispatch({ type: 'DECREMENT'})}
         />,
        document.getElementById('root')
    );
}


render();
store.subscribe(render);


expect(
    counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
    counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
    counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
    counter(1, { type: 'SOMETHING ELSE' })
).toEqual(1);

expect(
    counter(undefined, {})
).toEqual(0);




console.log("All test passed");
