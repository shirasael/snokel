var ConfigComponent = React.createClass({displayName: "ConfigComponent",
	getValue: function() {
		return React.findDOMNode(this.refs.input).value;
	},
  render: function() {
  	var inputElem = getInputElement(this.props.fieldType, "input", this.props.value);
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

function getInputElement(elmType, ref, val) {
	if (elmType == "num") {
		return ( React.createElement(NumberInput, {ref: ref, value: val}) );
	} else if (elmType == "str") {
		return ( React.createElement(StringInput, {ref: ref, value: val}) );
	} else if (elmType == "bool") {
		return ( React.createElement(BoolInput, {ref: ref, value: val}) );
	} else {
		return null;
	}
};

var NumberInput = React.createClass({displayName: "NumberInput",
	render: function() {
		return (
			React.createElement("input", {type: "number", value: this.props.value})
		);
	}
});

var StringInput = React.createClass({displayName: "StringInput",
	render: function() {
		return (
			React.createElement("input", {type: "text", value: this.props.value})
		);
	}
});

var BoolInput = React.createClass({displayName: "BoolInput",
	render: function() {
		return (
			React.createElement("input", {type: "checkbox", checked: this.props.value})
		);
	}
});

var ConfigComponentCreator = React.createClass({displayName: "ConfigComponentCreator",
	genenrateComponent: function() {
		var fieldName = React.findDOMNode(this.refs.compName).value.trim();
		var fieldType = React.findDOMNode(this.refs.compType).selected;
		this.props.onComponentCreated(fieldName, fieldType);
	},
	render: function() {
		return (
			React.createElement("div", {className: "componentCreator"}, 
        React.createElement("input", {type: "text", placeholder: "Name", ref: "compName"}), 
        React.createElement("span", null, " : "), 
        React.createElement(TypeSelector, {ref: "compType"}), 
				React.createElement("button", {value: "Generate Component", onClick: this.genenrateComponent})
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

	},
  renderComponents: function() {
  	console.log(this.state.data);
  	return this.state.data.map(function (compData, index) {
  		return (React.createElement(ConfigComponent, {key: index, fieldName: compData.fieldName, fieldType: compData.fieldType, fieldValue: compData.fieldValue}))
  	});
  },
  addComponent: function(compName, compType) {
  	this.state.data.push({fieldName: compName, fieldType: compType, fieldValue: null});
  	console.log(this.state.data);
  },
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "components"}, 
					this.renderComponents()
				), 
				React.createElement(ConfigComponentCreator, {onComponentCreated: this.addComponent})
			)
		);
	}
});

var ConfigForm = React.createClass({displayName: "ConfigForm",
	handleSubmit: function() {
		var componentsList = React.findDOMNode(this.refs.configComponents);
	},
	render: function() {
		return (
			React.createElement("div", {className: "configForm", onSubmit: this.handleSubmit}, 
				React.createElement(ConfigComponentsList, {ref: "configComponents", data: data}), 
				React.createElement("br", null), 
				React.createElement("input", {type: "submit", value: "Save"})
			)
		);
	}
});

React.render(
  React.createElement(ConfigForm, null),
  document.getElementById('content')
);