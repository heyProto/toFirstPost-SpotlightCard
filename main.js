import React from 'react';
import ReactDOM from 'react-dom';
import Card from './src/js/card.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toMeTooModal = function() {
    this.cardType = 'Down To Earth';
}

ProtoGraph.Card.toMeTooModal.prototype.init = function(options) {
    this.options = options;
}

ProtoGraph.Card.toMeTooModal.prototype.getData = function(data) {
    return this.containerInstance.exportData();
}

ProtoGraph.Card.toMeTooModal.prototype.renderCol7 = function(data) {
    this.mode = 'col7';
    this.render();
}
ProtoGraph.Card.toMeTooModal.prototype.renderCol4 = function(data) {
    this.mode = 'col4';
    this.render();
}

ProtoGraph.Card.toMeTooModal.prototype.renderScreenshot = function(data) {
    this.mode = 'screenshot';
    this.render();
}

ProtoGraph.Card.toMeTooModal.prototype.render = function() {
   ReactDOM.render(
    <Card
      dataURL={this.options.data_url}
      selector={this.options.selector}
      clickCallback={this.options.onClickCallback}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }} />,
    this.options.selector);
}