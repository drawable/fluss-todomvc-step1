/// <reference path="../../types/react.d.ts" />
/// <reference path="../../node_modules/fluss/fluss.d.ts" />

/**
 * Created by Stephan on 04.01.2015.
 */

"use strict";

import React = require("react");
import Fluss = require("fluss");

import Actions = require("app/actions");



export var TodoList = React.createClass({

    mixins: [Fluss.ReactMixins.componentLifecycle],

    componentDidMount: function() {
        var that = this;
        this.props.todos.newItems
            .forEach(function() {
                that.forceUpdate();
            }).until(this._willUnmount);

        this.props.todos.removedItems
            .forEach(function() {
                that.forceUpdate();
            }).until(this._willUnmount);
    },

    render: function() {
        return React.DOM.ul({ id: "todo-list" },
            this.props.todos.map(function(todo, index) {
                return React.createElement(Todo, { todo: todo, key: todo.id })
            })
        )
    }
});



var Todo = React.createClass({

    mixins: [Fluss.ReactMixins.componentLifecycle],

    handleToggle: function() {
        if (!this.props.todo.completed) {
            Actions.completeTodo(this.props.todo);
        } else {
            Actions.uncompleteTodo(this.props.todo);
        }
    },

    handleDestroy: function() {
        Actions.removeTodo(this.props.todo);
    },

    componentDidMount: function() {
        var that = this;
        this.props.todo.updates
            .forEach(function() {
                that.forceUpdate();
            }).until(this._willUnmount);
    },

    render: function() {
        return React.DOM.li({ className: this.props.todo.completed ? "completed" : ""},
            React.DOM.div({ className: "view" },
                React.DOM.input({ className: "toggle",
                                  type: "checkbox",
                                  checked: this.props.todo.completed,
                                  onChange: this.handleToggle
                                }),
                React.DOM.label({ }, this.props.todo.title ),
                React.DOM.button({ className: "destroy", onClick: this.handleDestroy })
            )
        );
    }
});