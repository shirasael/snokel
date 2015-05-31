

var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: Number(this.props.value), dataMeta: this.props.dataMeta};
	},
	handleChange: function(event) {
		var newVal = Number(event.target.value);
    this.setState({value : newVal, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this, {value : newVal, dataMeta: this.state.dataMeta});
  },
	render: function() {
		return (
			React.createElement("input", {type: "number", value: this.state.value, onChange: this.handleChange})
		);
	}
});

var StringInput = React.createClass({displayName: "StringInput",
	getInitialState: function() {
		return {value: this.props.value, dataMeta: this.props.dataMeta};
	},
	handleChange: function(event) {
		var newVal = event.target.value;
    this.setState({value : newVal, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this, {value : newVal, dataMeta: this.state.dataMeta});
  },
	render: function() {
		return (
			React.createElement("input", {type: "text", value: this.state.value, onChange: this.handleChange})
		);
	}
});

var BoolInput = React.createClass({displayName: "BoolInput",
	getInitialState: function() {
		return {value: this.props.value, dataMeta: this.props.dataMeta};
	},
	handleChange: function(event) {
		var newVal = event.target.checked;
    this.setState({value : newVal, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this, {value : newVal, dataMeta: this.state.dataMeta});
  },
	render: function() {
		return (
			React.createElement("input", {type: "checkbox", checked: this.state.value, onChange: this.handleChange})
		);
	}
});

var ListInput = React.createClass({displayName: "ListInput",
	getInitialState: function() {
		if (this.props.value) {
			return {value: this.props.value, dataMeta: this.props.dataMeta};
		}
		return {value: [], dataMeta: this.props.dataMeta};
	},
	renderInnerComponents: function() {
		var comps = [];
		for (var index = 0; index < this.state.value.length; index++) {
			var val = this.state.value[index];
			var comp = InputGenerator.generateInputElement(val, this.handleChange.bind(this, index), this.state.dataMeta[index], index);
			comps.push(
				React.createElement("div", null, 
					comp, React.createElement("span", null, ",")
				)
			);
		}
		return comps;
	},
	handleChange: function(comp, newInput) {
		comsole.log("GOT: " + comp + "\n" + newInput);
		this.state.value[comp.props.key] = newInput.state.value;
		this.state.dataMeta[comp.props.key] = newInput.dataMeta;
    this.setState({value : this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this, {value : this.state.value, dataMeta: this.state.dataMeta});
  },
	addComponent: function() {
		var compType = React.findDOMNode(this.refs.selector).value;
		this.state.dataMeta[this.state.value.length] = {self : compType};
		this.state.value.push(null);
		this.setState({value: this.state.value, dataMeta: this.state.dataMeta});
		this.props.valueChanged(this, {value: this.state.value, dataMeta: this.state.dataMeta});
	},
	render: function() {
		return (
			React.createElement("div", {className: "listCompsDiv"}, 
				React.createElement("span", null, "["), 
					this.renderInnerComponents(), 
					React.createElement("span", null, ","), 
					React.createElement(TypeSelector, {ref: "selector"}), 
					React.createElement("button", {onClick: this.addComponent}, "Add"), 
				React.createElement("span", null, "]")
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
      	React.createElement("option", {value: "bool"}, "Boolean"), 
      	React.createElement("option", {value: "list"}, "List"), 
      	React.createElement("option", {value: "dict"}, "Dict")
      )
		);
	}
});

var InputGenerator = {
	generateInputElement: function(val, onChange, meta, key) {
		var elmType = meta.self;
		if (elmType == "num") {
			return ( React.createElement(NumberInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == "str") {
			return ( React.createElement(StringInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == "bool") {
			return ( React.createElement(BoolInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == "list") {
			return ( React.createElement(ListInput, {val: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else {
			return null;
		}
	}
};

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

var ConfigComponent = React.createClass({displayName: "ConfigComponent",
	getInitialState: function() {
		return {value : this.props.value, dataMeta: this.props.dataMeta};
	},
	handleChange: function(comp, newInput) {
		this.setState({value: newInput.value, dataMeta: newInput.dataMeta});
		this.props.onChange(this, {value: newInput.value, dataMeta: newInput.dataMeta});
	},
  render: function() {
  	var inputElem = InputGenerator.generateInputElement(this.state.value, this.handleChange, this.state.dataMeta);
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