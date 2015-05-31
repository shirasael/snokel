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
	handleChange: function() {
		console.log("chchchchch");
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

var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: this.props.value};
	},
	handleChange: function(event) {
		var newVal = event.target.value;
    this.setState({value : newVal});
    this.props.valueChanged(newVal);
  },
	render: function() {
		return (
			React.createElement("input", {type: "number", value: this.state.value, onChange: this.handleChange})
		);
	}
});

var StringInput = React.createClass({displayName: "StringInput",
	getInitialState: function() {
		return {value: this.props.value};
	},
	handleChange: function(event) {
		var newVal = event.target.value;
    this.setState({value : newVal});
    this.props.valueChanged(newVal);
  },
	render: function() {
		return (
			React.createElement("input", {type: "text", value: this.state.value, onChange: this.handleChange})
		);
	}
});

var BoolInput = React.createClass({displayName: "BoolInput",
	getInitialState: function() {
		return {value: this.props.value};
	},
	handleChange: function(event) {
		var newVal = event.target.checked;
    this.setState({value : newVal});
    this.props.valueChanged(newVal);
  },
	render: function() {
		return (
			React.createElement("input", {type: "checkbox", checked: this.state.value, onChange: this.handleChange})
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


var data = [
	{fieldName: "MaxLength", fieldValue: 50, fieldType: "num"},
	{fieldName: "BackupDirectory", fieldValue: "/tmp", fieldType: "str",},
	{fieldName: "ShouldForce", fieldValue: true, fieldType: "bool"}
];


var ConfigComponentsList = React.createClass({displayName: "ConfigComponentsList",
	getInitialState: function() {
		return {data: this.props.data};
	},
  renderComponents: function() {
  	return this.state.data.map(function (compData, index) {
  		return (React.createElement(ConfigComponent, {key: index, fieldName: compData.fieldName, fieldType: compData.fieldType, fieldValue: compData.fieldValue}))
  	});
  },
  addComponent: function(compName, compType) {
  	this.state.data.push({fieldName: compName, fieldType: compType, fieldValue: null});
  	this.setState({data: this.state.data});
  },
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "components"}, 
					this.renderComponents()
				), 
				React.createElement("br", null), 
				React.createElement(ConfigComponentCreator, {onComponentCreated: this.addComponent})
			)
		);
	}
});

var ConfigForm = React.createClass({displayName: "ConfigForm",
	handleSubmit: function() {
		var componentsList = this.refs.configComponents.state.data;
		var toReturn = {};
		var allComps = componentsList.map(function(comp) {
			toReturn[comp.fieldName] = comp.fieldValue;
		});
		console.log(JSON.stringify(toReturn));
	},
	render: function() {
		return (
			React.createElement("div", {className: "configForm"}, 
				React.createElement(ConfigComponentsList, {ref: "configComponents", data: data}), 
				React.createElement("br", null), 
				React.createElement("button", {onClick: this.handleSubmit}, "Get JSON")
			)
		);
	}
});

React.render(
  React.createElement(ConfigForm, null),
  document.getElementById('content')
);