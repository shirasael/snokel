var ConfigComponent = React.createClass({displayName: "ConfigComponent",
	getInitialState: function() {
		return {value : this.props.value};
	},
	getInputElement: function(ref) {
		var elmType = this.props.fieldType;
		var val =  this.state.value;
		if (elmType == "num") {
			return ( React.createElement(NumberInput, {ref: ref, value: val, valueChanged: this.handleChange}) );
		} else if (elmType == "str") {
			return ( React.createElement(StringInput, {ref: ref, value: val, valueChanged: this.handleChange}) );
		} else if (elmType == "bool") {
			return ( React.createElement(BoolInput, {ref: ref, value: val, valueChanged: this.handleChange}) );
		} else {
			return null;
		}
	},
	handleChange: function(newVal) {
		console.log(this.state);
		this.setState({value: newVal});
		this.props.onChange(this.props.fieldName, newVal);
	},
  render: function() {
  	var inputElem = this.getInputElement("input");
    return (
    	React.createElement("div", null, 
	      React.createElement("div", {className: "configComp"}, 
	      	React.createElement("span", null, this.props.fieldName), " : ", inputElem
	      ), 
	      React.createElement("button", {onClick: this.props.onRemove}, "Remove")
      )
    );
  }
});



var ConfigComponentCreator = React.createClass({displayName: "ConfigComponentCreator",
	genenrateComponent: function() {
		var fieldName = React.findDOMNode(this.refs.compName).value.trim();
		var fieldType = React.findDOMNode(this.refs.compType).value;
		this.props.onComponentCreated(fieldName, fieldType);
	},
	render: function() {
		return (
			React.createElement("div", {className: "componentCreator"}, 
        React.createElement("input", {type: "text", placeholder: "Name", ref: "compName"}), 
        React.createElement("span", null, " : "), 
        React.createElement(TypeSelector, {ref: "compType"}), 
				React.createElement("button", {onClick: this.genenrateComponent}, "Generate Component")
			)
		);
	}
});

var TypeSelector = React.createClass({displayName: "TypeSelector",
	getInitialState: function() {
		return {selected : null};
	},
	handleChange: function(event) {
		var newSelected = event.target.value;
    this.setState({selected : newSelected});
  },
	render: function() {
		return (
			React.createElement("select", {ref: "compType", value: this.state.selected, onChange: this.handleChange}, 
      	React.createElement("option", {value: "num"}, "Number"), 
      	React.createElement("option", {value: "str"}, "String"), 
      	React.createElement("option", {value: "bool"}, "Boolean")
      )
		);
	}
});


var data = {
	"MaxLength" : 50,
	"BackupDirectory" : "/tmp",
	"ShouldForce" : true
};

var dataMeta = {
	"MaxLength" : "num",
	"BackupDirectory" : "str",
	"ShouldForce" : "bool"
}


var ConfigComponentsList = React.createClass({displayName: "ConfigComponentsList",
	getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
  handleValChange: function(compName, compVal) {
  	this.state.data[compName] = compVal;
  	this.setState({data : this.state.data});
  },
  renderComponents: function() {
  	var comps = [];
  	var index = 0;
  	for (compName in this.state.data) {
  		var type = this.state.dataMeta[compName];
  		var val = this.state.data[compName];
  		comps.push(React.createElement(ConfigComponent, {key: index, onChange: this.handleValChange, fieldName: compName, fieldType: type, value: val}))
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	this.state.data[compName] = null;
  	this.state.dataMeta[compName] = compType;
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