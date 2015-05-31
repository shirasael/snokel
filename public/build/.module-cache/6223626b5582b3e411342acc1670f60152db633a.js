var Loading = React.createClass({displayName: "Loading",
	render: function() {
		return (
			React.createElement("span", {className: "loading", style: this.props.style}, "Loading...")
		);
	}
});

var SystemFront = React.createClass({displayName: "SystemFront",
	render: function() {
		var style = {color: this.props.color};
		return (
			React.createElement("figure", {className: "systemCardFront", style: style}, 
				React.createElement("img", {src: this.props.imgSrc}), 
				React.createElement("h1", null, this.props.sysName)
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
		return (
			React.createElement("figure", {className: "systemCardBack", style: style}, 
				this.renderServers()
			)
		);
	}
});

var SystemCard = React.createClass({displayName: "SystemCard",
	getInitialState: function() {
		return {flipped: false};
	},
	flip: function() {
  	this.setState({flipped : !this.state.flipped});
	},
	getClassName: function() {
		return "card" + (this.state.flipped ? " flipped" : "");
	},
	render: function() {
		return (
			React.createElement("div", {className: "container", onClick: this.flip}, 
		    React.createElement("div", {className: this.getClassName()}, 
		      React.createElement(SystemFront, {color: "blue", sysName: this.props.sysName}), 
		      React.createElement(SystemBack, {color: "red"})
		    )
		  )
		);
	}
});

var SystemsList = React.createClass({displayName: "SystemsList",
	getInitialState: function() {
		return {systems: []};
	},
	fetchSystems: function() {
		console.log("Fetching data...");
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({systems: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	renderSystems: function() {
		return this.state.systems.map(function (sys, index) {
			return (
				React.createElement(SystemCard, {sysName: sys, key: index})
			);
		});
	},
	render: function() {
		content = React.createElement(Loading, null);
		if (this.state.systems == []) {
			this.fetchSystems();
		} else {
			content = this.renderSystems();
		}
		return (
			React.createElement("div", null, 
				content
			)
		);
	}
});

React.render(
  React.createElement(SystemsList, {url: "/systems"}),
  document.getElementById('content')
);