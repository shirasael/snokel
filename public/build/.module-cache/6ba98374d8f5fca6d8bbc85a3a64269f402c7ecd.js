var SystemsList = React.createClass({displayName: "SystemsList",
	handleSubmit: function() {
		var toReturn = this.refs.configComponents.state.data;
		console.log(JSON.stringify(toReturn));
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(ConfigComponentsList, {ref: "configComponents", data: data, dataMeta: dataMeta}), 
					React.createElement("br", null)
				)
			)
		);
					// <button onClick={this.handleSubmit}>Get JSON</button>
	}
});

React.render(
  React.createElement(SystemsList, null),
  document.getElementById('content')
);