/// <reference path="../types/react.d.ts" />
/**
* Created by Stephan on 04.01.2015.
*/
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "react", "fluss/plugins", "fluss/store", "actions", "plugins/todos", "ui/todoList", "ui/newTodo", "ui/checkAll", "ui/todoCount", "fluss/baseActions"], function(require, exports, React, Plugins, Store, Actions, TodoPlugins, TodoList, NewTodo, CheckAll, TodoCount, BaseActions) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            _super.call(this);

            this.todos = Store.array();
        }
        return Application;
    })(Plugins.PluginContainer);
    exports.Application = Application;

    var Protocol = (function (_super) {
        __extends(Protocol, _super);
        function Protocol() {
            _super.apply(this, arguments);
        }
        Protocol.prototype.run = function (container, action, p1) {
            var t;

            switch (action) {
                case 0 /* ADD_TODO */:
                    t = '"' + p1 + '"';
                    break;

                case 1 /* COMPLETE_TODO */:
                case 2 /* UNCOMPLETE_TODO */:
                    t = '"' + p1.title + '(' + p1.id + ')"';
                    break;

                case 3 /* REMOVE_TODO */:
                    t = '"' + p1.title + '(' + p1.id + ', ' + p1.completed + ')"';
                    break;

                default:
                    t = "";
            }
            console.log("ACTION: ", Actions.ACTIONS[action], t);
        };
        return Protocol;
    })(Plugins.BasePlugin);

    function createApplication() {
        var app = new Application();

        app.wrap(0 /* ADD_TODO */, new TodoPlugins.AddTodo());
        app.wrap(1 /* COMPLETE_TODO */, new TodoPlugins.CompleteTodo());
        app.wrap(2 /* UNCOMPLETE_TODO */, new TodoPlugins.UncompleteTodo());
        app.wrap(3 /* REMOVE_TODO */, new TodoPlugins.RemoveTodo());
        app.wrap(4 /* COMPLETE_ALL */, new TodoPlugins.CompleteAll());
        app.wrap(5 /* UNCOMPLETE_ALL */, new TodoPlugins.UncompleteAll());

        app.wrap(BaseActions.ACTIONS.__ANY__, new Protocol());
        return app;
    }

    function init() {
        var container = document.getElementById("application");
        var app = createApplication();

        Actions.addTodo("Learn some fluss");

        // Always pass immutable stores to the frontend to prevent disruption of the data flow.
        React.render(React.DOM.section({ id: "todoapp" }, React.DOM.header({ id: "header" }, React.DOM.h1({}, "todos")), React.createElement(NewTodo.NewTodo, {}), React.DOM.section({ id: "main" }, React.createElement(CheckAll.CheckAll, { todos: app.todos.immutable }), React.createElement(TodoList.TodoList, { todos: app.todos.immutable })), React.DOM.footer({ id: "footer" }, React.createElement(TodoCount.TodoCount, {
            todos: app.todos.filter(function (todo) {
                return todo.completed === false;
            }).immutable
        }))), container);
    }
    exports.init = init;
});
//# sourceMappingURL=application.js.map
