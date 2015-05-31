var SystemFront = React.createClass({displayName: "SystemFront",
	render: function() {
		var style = {color: this.props.color};
				// <img src={this.props.imgSrc}></img>
				// <h1>{this.props.sysName}</h1>
		return (
			React.createElement("figure", {className: "systemCardFront", style: style}, 
			"1"
			)
		);
	}
});

var SystemBack = React.createClass({displayName: "SystemBack",
	renderServers: function() {
		var servers = ['Server-A', 'Server-B', 'Server-C'];
		return servers.map(function(server, index) {
			return (
				React.createElement("div", {className: "server", key: index}, server)
			);
		});
	},
	render: function() {
		var style = {color: this.props.color};
				{this.renderServers()}
		return (
			React.createElement("figure", {className: "systemCardBack", style: style}, 
			"2"
			)
		);
	}
});

var SystemCard = React.createClass({displayName: "SystemCard",
	getInitialState: function() {
		return {flipped: false};
	},
	flip: function() {
		console.log("Flipping!");
  	this.setState({flipped : !this.state.flipped});
	},
	getClassName: function() {
		return "card" + this.state.flipped ? " flipped" : "";
	},
	render: function() {
		return (
			React.createElement("section", {className: this.getClassName(), onClick: this.flip}, 
		    React.createElement("div", {className: "card"}, 
		      React.createElement(SystemFront, {color: "blue", sysName: this.props.sysName}), 
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
				React.createElement(SystemCard, {sysName: "SomeSys"})
			)
		);
	}
});

React.render(
  React.createElement(SystemsList, null),
  document.getElementById('content')
);