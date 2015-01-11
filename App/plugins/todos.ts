/**
 * Created by Stephan on 04.01.2015.
 */

"use strict";

import Plugins      = require("fluss/plugins");
import Store        = require("fluss/store");
import Application  = require("../application");
import Dispatcher   = require("fluss/dispatcher");

var todoIds = 1000;

export class AddTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, title:string) {
        container.todos.push(Store.record({id: todoIds++, title: title, completed: false}));
    }

    getMemento(container:Application.Application, action:number, title:string):Dispatcher.IMemento {
        return Dispatcher.createMemento(null, { index: container.todos.length })
    }

    restoreFromMemento(container:Application.Application, memento:Dispatcher.IMemento) {
        container.todos.remove(memento.data.index, 1);
    }
}

export class CompleteTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        // the given todo may be immutable
        container.todos.item(todo).completed = true;
    }
}

export class UncompleteTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        // the given todo may be immutable
        container.todos.item(todo).completed = false;
    }
}

export class RemoveTodo extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        container.todos.splice(container.todos.indexOf(todo), 1);
    }
}

export class CompleteAll extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        container.todos.forEach(function(todo) {
            todo.completed = true;
        })
    }
}

export class UncompleteAll extends Plugins.BasePlugin {
    run(container:Application.Application, action:number, todo:any) {
        container.todos.forEach(function(todo) {
            todo.completed = false;
        })
    }
}