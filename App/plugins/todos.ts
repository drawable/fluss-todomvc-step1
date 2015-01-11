/**
 * Created by Stephan on 04.01.2015.
 */

"use strict";

import Plugins      = require("fluss/plugins");
import Store        = require("fluss/store");
import Application  = require("../application");
import Dispatcher   = require("fluss/dispatcher");
import Actions      = require("../actions");

var todoIds = 1000;

/**
 * Plugin for adding a todo.
 */
export class AddTodo extends Plugins.BasePlugin {

    run(container:Application.Application, action:number, title:string) {
        container.todos.push(Store.record({id: todoIds++, title: title, completed: false}));
    }

    /**
     * Create the memento for that action
     * We store the index at which we created the item.
     * @param container
     * @param action
     * @param title
     * @returns {any}
     */
    getMemento(container:Application.Application, action:number, title:string):Dispatcher.IMemento {
        return Dispatcher.createMemento(null, { index: container.todos.length })
    }

    /**
     * Restore from memento, i.e. undo the action. Remove the item at the stored index.
     * @param container
     * @param memento
     */
    restoreFromMemento(container:Application.Application, memento:Dispatcher.IMemento) {
        container.todos.remove(memento.data.index, 1);
    }
}

export class CompleteTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        // the given todo may be immutable
        container.todos.item(todo).completed = true;
    }

    getMemento(container:Application.Application, action:number, todo:any):Dispatcher.IMemento {
        return Dispatcher.createUndoAction(Actions.ACTIONS.UNCOMPLETE_TODO, todo);
    }

}

export class UncompleteTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        // the given todo may be immutable
        container.todos.item(todo).completed = false;
    }

    /**
     * There are two kinds of mementos. The ones that hold the information neccessary to
     * reproduce the previous state and the ones that contain an action that reproduces the
     * previous state. We'll use the latter here. The restoreFromMemento-method is not needed
     * in this case.
     * @param container
     * @param action
     * @param todo
     * @returns {any}
     */
    getMemento(container:Application.Application, action:number, todo:any):Dispatcher.IMemento {
        return Dispatcher.createUndoAction(Actions.ACTIONS.COMPLETE_TODO, todo);
    }

}

export class RemoveTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        container.todos.splice(container.todos.indexOf(todo), 1);
    }

    getMemento(container:Application.Application, action:number, todo:any):Dispatcher.IMemento {
        var data = {
            index: container.todos.indexOf(todo),
            title: todo.title,
            completed: todo.completed,
            id: todo.id
        }

        return Dispatcher.createMemento(null, data);
    }

    restoreFromMemento(container:Application.Application, memento:Dispatcher.IMemento) {
        container.todos.splice(meneto.data.index,
            Store.record({ id: memento.data.id,
                           title: memento.data.title,
                           completed: memento.data.completed }));
    }

}

export class CompleteAll extends Plugins.BasePlugin {
    run(container:Application.Application, action:number) {
        container.todos.forEach(function(todo) {
            todo.completed = true;
        })
    }

    getMemento(container:Application.Application, action:number):Dispatcher.IMemento {
        //Use the immutable here: Map on the actual store will create an reactive mapped store
        //that would update with the todos-store holding only trues after the action is completed.
        var data = container.todos.immutable.map(function(todo) {
            return todo.completed;
        });

        return Dispatcher.createMemento(null, data);
    }

    restoreFromMemento(container:Application.Application, memento:Dispatcher.IMemento) {
        memento.data.forEach(function(completed, index) {
            container.todos[index].completed = completed;
        })
    }

}

export class UncompleteAll extends Plugins.BasePlugin {
    run(container:Application.Application, action:number) {
        container.todos.forEach(function(todo) {
            todo.completed = false;
        })
    }

    getMemento(container:Application.Application, action:number):Dispatcher.IMemento {
        //Use the immutable here: Map on the actual store will create an reactive mapped store
        //that would update with the todos-store holding only falses after the action is completed.
        var data = container.todos.immutable.map(function(todo) {
            return todo.completed;
        });
    }

    restoreFromMemento(container:Application.Application, memento:Dispatcher.IMemento) {
        memento.data.forEach(function(completed, index) {
            container.todos[index].completed = completed;
        })
    }
}