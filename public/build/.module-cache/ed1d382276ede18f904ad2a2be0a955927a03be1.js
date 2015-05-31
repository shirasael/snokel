var System = React.createClass({displayName: "System",

	render: function() {
		return (
			React.createElement("div", {class: "systemCard"}

			)
		);
	}
});

var SystemsList = React.createClass({displayName: "SystemsList",
	render: function() {
		return (
			React.createElement("div", null
			)
		);
	}
});

React.render(
  React.createElement(SystemsList, null),
  document.getElementById('content')
);