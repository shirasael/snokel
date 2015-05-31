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
		return this.props.servers.map(function(server, index) {
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
		      React.createElement(SystemFront, {color: "blue", sysName: this.props.sysName, imgSrc: this.props.sysImg}), 
		      React.createElement(SystemBack, {color: "red", servers: this.props.servers})
		    )
		  )
		);
	}
});

var SystemsList = React.createClass({displayName: "SystemsList",
	getInitialState: function() {
		return {systems: []};
	},
	componentDidMount: function() {
		this.fetchSystems();
	},
	fetchSystems: function() {
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
		return (
			React.createElement("div", null, 
				this.renderSystems()
			)
		);
	}
});

React.render(
  React.createElement(SystemsList, {url: "/systems"}),
  document.getElementById('content')
);