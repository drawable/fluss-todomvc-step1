/// <reference path="../../types/react.d.ts" />
/**
* Created by Stephan on 09.01.2015.
*/
"use strict";
define(["require", "exports", "react", "fluss/reactMixins"], function(require, exports, React, Mixins) {
    exports.TodoCount = React.createClass({
        mixins: [Mixins.componentLifecycle],
        componentDidMount: function () {
            var that = this;
            this.props.todos.allChanges.forEach(function () {
                that.forceUpdate();
            }).until(this._willUnmount);
        },
        render: function () {
            var count = this.props.todos.length;
            return React.DOM.span({ id: "todo-count" }, React.DOM.strong({}, count), count === 1 ? " item left" : " items left");
        }
    });
});
//# sourceMappingURL=todoCount.js.map
