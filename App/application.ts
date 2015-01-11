/// <reference path="../types/react.d.ts" />

/**
 * Created by Stephan on 04.01.2015.
 */

"use strict";

import React = require("react");

import Plugins = require("fluss/plugins");
import Store = require("fluss/store");

import Actions = require("actions");
import TodoPlugins = require("plugins/todos");

import TodoList = require("ui/todoList");
import NewTodo = require("ui/newTodo");
import CheckAll = require("ui/checkAll");
import TodoCount = require("ui/todoCount");

import BaseActions = require("fluss/baseActions");

export class Application extends Plugins.PluginContainer {

    todos:Store.IArrayStore;

    constructor() {
        super();

        this.todos = Store.array();

    }
}

class Protocol extends Plugins.BasePlugin {

    run(container:Application, action:number, p1?:any) {
        var t;

        switch(action) {

            case Actions.ACTIONS.ADD_TODO:
                t = '"' + p1 + '"';
                break;

            case Actions.ACTIONS.COMPLETE_TODO:
            case Actions.ACTIONS.UNCOMPLETE_TODO:
                t = '"' + p1.title + '(' + p1.id + ')"';
                break;

            case Actions.ACTIONS.REMOVE_TODO:
                t = '"' + p1.title + '(' + p1.id + ', ' + p1.completed + ')"';
                break;

            default:
                t = "";
        }
        console.log("ACTION: ", Actions.ACTIONS[action], t);
    }
}

function createApplication() {
    var app = new Application();

    app.wrap(Actions.ACTIONS.ADD_TODO, new TodoPlugins.AddTodo());
    app.wrap(Actions.ACTIONS.COMPLETE_TODO, new TodoPlugins.CompleteTodo());
    app.wrap(Actions.ACTIONS.UNCOMPLETE_TODO, new TodoPlugins.UncompleteTodo());
    app.wrap(Actions.ACTIONS.REMOVE_TODO, new TodoPlugins.RemoveTodo());
    app.wrap(Actions.ACTIONS.COMPLETE_ALL, new TodoPlugins.CompleteAll());
    app.wrap(Actions.ACTIONS.UNCOMPLETE_ALL, new TodoPlugins.UncompleteAll());


    app.wrap(BaseActions.ACTIONS.__ANY__, new Protocol());
    return app;
}

export function init() {
    var container = document.getElementById("application");
    var app = createApplication();

    Actions.addTodo("Learn some fluss");

    // Always pass immutable stores to the frontend to prevent disruption of the data flow.
    React.render(
        React.DOM.section({ id: "todoapp"},
        React.DOM.header({id: "header"},
            React.DOM.h1({}, "todos")),
            React.createElement(NewTodo.NewTodo, {}),
            React.DOM.section({ id: "main"},
                React.createElement(CheckAll.CheckAll, { todos: app.todos.immutable }),
                React.createElement(TodoList.TodoList, { todos: app.todos.immutable })
            ),
            React.DOM.footer({ id: "footer"},
                React.createElement(TodoCount.TodoCount, { todos: app.todos
                    .filter(function(todo) {
                        return todo.completed === false
                    })
                    .immutable
                } ))
        )
        , container);
}
