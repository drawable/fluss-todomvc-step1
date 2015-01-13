/// <reference path="../../types/react.d.ts" />
/// <reference path="../../node_modules/fluss/fluss.d.ts" />

/**
 * Created by Stephan on 12.01.2015.
 */

"use strict";

import React = require("react");
import Fluss = require("fluss");

export var Button = React.createClass({

   handleClick: function() {
      Fluss.BaseActions.undo();
   },

   render: function() {
      return React.DOM.button({ id: "undo", onClick: this.handleClick }, "Undo");
   }

});
