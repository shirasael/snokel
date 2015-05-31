var System = React.createClass({displayName: "System",

});

var SystemsList = React.createClass({displayName: "SystemsList",
	render: function() {
		return (
			React.createElement("div", null
			)
		);
					// <button onClick={this.handleSubmit}>Get JSON</button>
	}
});

React.render(
  React.createElement(SystemsList, null),
  document.getElementById('content')
);