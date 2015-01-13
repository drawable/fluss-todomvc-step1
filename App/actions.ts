/// <reference path="../node_modules/fluss/fluss.d.ts" />

/**
 * Created by Stephan on 04.01.2015.
 */

"use strict";


import Fluss = require("fluss");

var Dispatcher = Fluss.Dispatcher;
var BaseActions = Fluss.BaseActions;

/**
 * Decalre all actions in an enum.
 */
export enum ACTIONS {
    ADD_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    REMOVE_TODO,
    COMPLETE_ALL,
    UNCOMPLETE_ALL
}

export function addTodo(title:string) {
    Dispatcher.dispatch(ACTIONS.ADD_TODO, title);
}

export function completeTodo(todo) {
    Dispatcher.dispatch(ACTIONS.COMPLETE_TODO, todo);
}

export function uncompleteTodo(todo) {
    Dispatcher.dispatch(ACTIONS.UNCOMPLETE_TODO, todo);
}

export function completeAll() {
    Dispatcher.dispatch(ACTIONS.COMPLETE_ALL);
}

export function uncompleteAll() {
    Dispatcher.dispatch(ACTIONS.UNCOMPLETE_ALL);
}

export function removeTodo(todo) {
    Dispatcher.dispatch(ACTIONS.REMOVE_TODO, todo);
}