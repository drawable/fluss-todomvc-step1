/**
* Created by Stephan on 04.01.2015.
*/
"use strict";
define(["require", "exports", "fluss/dispatcher"], function(require, exports, Dispatcher) {
    (function (ACTIONS) {
        ACTIONS[ACTIONS["ADD_TODO"] = 0] = "ADD_TODO";
        ACTIONS[ACTIONS["COMPLETE_TODO"] = 1] = "COMPLETE_TODO";
        ACTIONS[ACTIONS["UNCOMPLETE_TODO"] = 2] = "UNCOMPLETE_TODO";
        ACTIONS[ACTIONS["REMOVE_TODO"] = 3] = "REMOVE_TODO";
        ACTIONS[ACTIONS["COMPLETE_ALL"] = 4] = "COMPLETE_ALL";
        ACTIONS[ACTIONS["UNCOMPLETE_ALL"] = 5] = "UNCOMPLETE_ALL";
    })(exports.ACTIONS || (exports.ACTIONS = {}));
    var ACTIONS = exports.ACTIONS;

    function addTodo(title) {
        Dispatcher.dispatch(0 /* ADD_TODO */, title);
    }
    exports.addTodo = addTodo;

    function completeTodo(todo) {
        Dispatcher.dispatch(1 /* COMPLETE_TODO */, todo);
    }
    exports.completeTodo = completeTodo;

    function uncompleteTodo(todo) {
        Dispatcher.dispatch(2 /* UNCOMPLETE_TODO */, todo);
    }
    exports.uncompleteTodo = uncompleteTodo;

    function completeAll() {
        Dispatcher.dispatch(4 /* COMPLETE_ALL */);
    }
    exports.completeAll = completeAll;

    function uncompleteAll() {
        Dispatcher.dispatch(5 /* UNCOMPLETE_ALL */);
    }
    exports.uncompleteAll = uncompleteAll;

    function removeTodo(todo) {
        Dispatcher.dispatch(3 /* REMOVE_TODO */, todo);
    }
    exports.removeTodo = removeTodo;
});
//# sourceMappingURL=actions.js.map
