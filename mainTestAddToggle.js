import { createStore, combineReducers } from 'redux';
import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
var deepFreeze = require('deep-freeze');

const log = (data) => console.log(data);

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) return state;
            return Object.assign({}, state, { completed: !state.completed });
        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);

}

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: "Learn Redux",
            completed: false
        },
        {
            id: 1,
            text: "Go Redux",
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: "Learn Redux",
            completed: false
        },
        {
            id: 1,
            text: "Go Redux",
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
}

//testAddTodo();
//testToggleTodo();
//console.log("ALL TEST PASSED");

const visFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VIS_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({ todos, visFilter });
const store = createStore(todoApp);

log('Initial state: ');
log(store.getState());
log('---------------');

log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
});

log('Current state: ');
log(store.getState());
log('---------------');

log('Dispatching TOGGLE_TODO.');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 0
});

log('Current state: ');
log(store.getState());
log('---------------');

log('Dispatching SET_VIS_FILTER');
store.dispatch({
    type: 'SET_VIS_FILTER',
    filter: 'SHOW_COMPLETED'
});

log('Current state: ');
log(store.getState());
log('---------------');
