var React = require('react');
var ConfigPage = require('./snorkel.js').ConfigPage;

React.render(
  React.createElement(ConfigPage, {system: sys, config: cfg}),
  document.getElementById('content')
);