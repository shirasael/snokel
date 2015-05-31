var data = {
	"MaxLength" : 50,
	"BackupDirectory" : "/tmp",
	"ShouldForce" : true
};

var dataMeta = {
	"MaxLength" : {self: "num"},
	"BackupDirectory" : {self: "str"},
	"ShouldForce" : {self: "bool"}
}


var ConfigComponentsList = React.createClass({displayName: "ConfigComponentsList",
	getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
  handleChange: function(comp, newVals) {
  	this.state.data[comp.props.fieldName] = newVals.value;
  	this.state.dataMeta[comp.props.fieldName] = newVals.dataMeta;
  	this.setState({data : this.state.data, dataMeta : this.state.dataMeta});
  },
  renderComponents: function() {
  	var comps = [];
  	var index = 0;
  	for (compName in this.state.data) {
  		var val = this.state.data[compName];
  		var meta = this.state.dataMeta[compName];
  		comps.push(React.createElement(ConfigComponent, {key: index, onChange: this.handleChange, fieldName: compName, value: val, dataMeta: meta}))
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	this.state.data[compName] = null;
  	this.state.dataMeta[compName] = {self: compType};
  	this.setState({data: this.state.data, dataMeta: this.state.dataMeta});
  },
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "jsonDiv"}, 
					React.createElement("span", {className: "jsonSpan"}, "JSON: ", JSON.stringify(this.state.data))
				), 
				React.createElement("br", null), 
				React.createElement("div", null, 
					React.createElement("div", {className: "components"}, 
						this.renderComponents()
					), 
					React.createElement("br", null), 
					React.createElement(ConfigComponentCreator, {onComponentCreated: this.addComponent})
				)
			)
		);
	}
});

var ConfigForm = React.createClass({displayName: "ConfigForm",
	handleSubmit: function() {
		var toReturn = this.refs.configComponents.state.data;
		console.log(JSON.stringify(toReturn));
	},
	doSomething: function() {
		alert("YOooo");
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
  React.createElement(ConfigForm, null),
  document.getElementById('content')
);