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
define(["require", "exports", "fluss/plugins", "fluss/store", "fluss/dispatcher"], function(require, exports, Plugins, Store, Dispatcher) {
    var todoIds = 1000;

    var AddTodo = (function (_super) {
        __extends(AddTodo, _super);
        function AddTodo() {
            _super.apply(this, arguments);
        }
        AddTodo.prototype.run = function (container, action, title) {
            container.todos.push(Store.record({ id: todoIds++, title: title, completed: false }));
        };

        AddTodo.prototype.getMemento = function (container, action, title) {
            return Dispatcher.createMemento(null, { index: container.todos.length });
        };

        AddTodo.prototype.restoreFromMemento = function (container, memento) {
            container.todos.remove(memento.data.index, 1);
        };
        return AddTodo;
    })(Plugins.BasePlugin);
    exports.AddTodo = AddTodo;

    var CompleteTodo = (function (_super) {
        __extends(CompleteTodo, _super);
        function CompleteTodo() {
            _super.apply(this, arguments);
        }
        CompleteTodo.prototype.run = function (container, action, todo) {
            // the given todo may be immutable
            container.todos.item(todo).completed = true;
        };
        return CompleteTodo;
    })(Plugins.BasePlugin);
    exports.CompleteTodo = CompleteTodo;

    var UncompleteTodo = (function (_super) {
        __extends(UncompleteTodo, _super);
        function UncompleteTodo() {
            _super.apply(this, arguments);
        }
        UncompleteTodo.prototype.run = function (container, action, todo) {
            // the given todo may be immutable
            container.todos.item(todo).completed = false;
        };
        return UncompleteTodo;
    })(Plugins.BasePlugin);
    exports.UncompleteTodo = UncompleteTodo;

    var RemoveTodo = (function (_super) {
        __extends(RemoveTodo, _super);
        function RemoveTodo() {
            _super.apply(this, arguments);
        }
        RemoveTodo.prototype.run = function (container, action, todo) {
            container.todos.splice(container.todos.indexOf(todo), 1);
        };
        return RemoveTodo;
    })(Plugins.BasePlugin);
    exports.RemoveTodo = RemoveTodo;

    var CompleteAll = (function (_super) {
        __extends(CompleteAll, _super);
        function CompleteAll() {
            _super.apply(this, arguments);
        }
        CompleteAll.prototype.run = function (container, action, todo) {
            container.todos.forEach(function (todo) {
                todo.completed = true;
            });
        };
        return CompleteAll;
    })(Plugins.BasePlugin);
    exports.CompleteAll = CompleteAll;

    var UncompleteAll = (function (_super) {
        __extends(UncompleteAll, _super);
        function UncompleteAll() {
            _super.apply(this, arguments);
        }
        UncompleteAll.prototype.run = function (container, action, todo) {
            container.todos.forEach(function (todo) {
                todo.completed = false;
            });
        };
        return UncompleteAll;
    })(Plugins.BasePlugin);
    exports.UncompleteAll = UncompleteAll;
});
//# sourceMappingURL=todos.js.map
