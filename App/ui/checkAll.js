/// <reference path="../../types/react.d.ts" />
/**
* Created by Stephan on 04.01.2015.
*/
"use strict";
define(["require", "exports", "react", "../actions", "fluss/reactMixins"], function(require, exports, React, Actions, Mixins) {
    exports.CheckAll = React.createClass({
        mixins: [Mixins.componentLifecycle],
        calculateAllComplete: function () {
            return this.props.todos.every(function (todo) {
                return todo.completed === true;
            });
        },
        handleChange: function (event) {
            if (event.target.checked) {
                Actions.completeAll();
            } else {
                Actions.uncompleteAll();
            }
        },
        componentDidMount: function () {
            var that = this;
            this.props.todos.updates.filter(function (update) {
                return update.item === "completed";
            }).forEach(function () {
                that.forceUpdate();
            }).until(this._willUnmount);

            this.props.todos.newItems.combine(this.props.todos.removedItems).forEach(function () {
                that.forceUpdate();
            }).until(this._willUnmount);
        },
        render: function () {
            return React.DOM.input({
                id: "toggle-all",
                type: "checkbox",
                checked: this.calculateAllComplete(),
                onChange: this.handleChange });
        }
    });
});
//# sourceMappingURL=checkAll.js.map
