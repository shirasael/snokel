var SystemFront = React.createClass({displayName: "SystemFront",
	render: function() {
		var color = "color: " + this.props.color;
		return (
			React.createElement("div", {class: "systemCardFront", style: color}, 
				React.createElement("img", {src: this.props.imgSrc}), 
				React.createElement("h1", null, this.props.sysName)
			)
		);
	}
});

var SystemBack = React.createClass({displayName: "SystemBack",
	renderServers: function() {
		var servers = ['Server-A', 'Server-B', 'Server-C'];
		return servert.map(function(server, index) {
			return (
				React.createElement("span", {class: "server", key: index}, server)
			);
		});
	},
	render: function() {
		var color = "color: " + this.props.color;
		return (
			React.createElement("div", {class: "systemCardBack", style: color}, 
				this.renderServers()
			)
		);
	}
});

var SystemCard = React.createClass({displayName: "SystemCard",
	render: function() {
		return (
			React.createElement("section", {class: "container"}, 
		    React.createElement("div", {class: "card"}, 
		      React.createElement(SystemFront, {color: "blue"}), 
		      React.createElement(SystemBack, {color: "red"})
		    )
		  )
		);
	}
});

var SystemsList = React.createClass({displayName: "SystemsList",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(SystemCard, null)
			)
		);
	}
});

React.render(
  React.createElement(SystemsList, null),
  document.getElementById('content')
);