var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: Number(this.props.value), dataMeta: this.props.dataMeta};
	},
	handleChange: function(event) {
		this.state.value = Number(event.target.value);
    this.setState({value : this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this);
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
		this.state.value = event.target.value;
    this.setState({value : this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this);
  },
	render: function() {
		return (
	    React.createElement("input", {value: this.state.value, type: "text", onChange: this.handleChange})
		);
	}
});

var BoolInput = React.createClass({displayName: "BoolInput",
	getInitialState: function() {
		return {value: this.props.value, dataMeta: this.props.dataMeta};
	},
	handleChange: function(event) {
		this.state.value = event.target.checked;
    this.setState({value : this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this);
  },
	render: function() {
		return (
			React.createElement("div", {className: "switch"}, 
		    React.createElement("label", null, 
		      "False", 
		      React.createElement("input", {type: "checkbox", checked: this.state.value, onChange: this.handleChange}), 
		      React.createElement("span", {className: "lever"}), 
		      "True"
		    )
		  )
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
				React.createElement("div", {key: index}, 
					comp
				)
			);
		}
		return comps;
	},
	handleChange: function(index, newInput) {
		this.state.value[index] = newInput.state.value;
		this.state.dataMeta[index] = newInput.state.dataMeta;
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
				React.createElement("div", {className: "existingList"}, 
					React.createElement("span", null, "["), 
						this.renderInnerComponents(), 
					React.createElement("span", null, "]")
				), 
				React.createElement(TypeSelector, {ref: "selector"}), 
				React.createElement("button", {onClick: this.addComponent}, "Add")
			)
		);
	}
});

var DictInput = React.createClass({displayName: "DictInput",
	getInitialState: function() {
		if (this.props.value) {
			return {value: this.props.value, dataMeta: this.props.dataMeta};
		}
		return {value: {}, dataMeta: this.props.dataMeta};
	},
  handleChange: function(comp, newVals) {
  	this.state.value[comp.props.fieldName] = newVals.value;
  	this.state.dataMeta[comp.props.fieldName] = newVals.dataMeta;
  	this.setState({value : this.state.value, dataMeta : this.state.dataMeta});
    this.props.valueChanged(this, {value : this.state.value, dataMeta: this.state.dataMeta});
  },
  renderInnerComponents: function() {
  	var comps = [];
  	var index = 0;
  	for (compName in this.state.value) {
  		var val = this.state.value[compName];
  		var meta = this.state.dataMeta[compName];
  		comps.push(React.createElement(ConfigComponent, {key: index, onChange: this.handleChange, fieldName: compName, value: val, dataMeta: meta}))
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	this.state.value[compName] = null;
  	this.state.dataMeta[compName] = {self: compType};
  	this.setState({value: this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this, {value : this.state.value, dataMeta: this.state.dataMeta});
  },
	render: function() {
		var openCluase = '{';
		var closeCluase = '}';
		return (
			React.createElement("div", {className: "dictCompsDiv"}, 
				React.createElement("div", {className: "existingDict"}, 
					React.createElement("span", null, openCluase), 
						this.renderInnerComponents(), 
					React.createElement("span", null, closeCluase)
				), 
				React.createElement(ConfigComponentCreator, {onComponentCreated: this.addComponent})
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
			React.createElement("select", {id: "bla", ref: "compType", value: this.state.selected, onChange: this.handleChange}, 
      	React.createElement("option", {value: typeof 1}, "Number"), 
      	React.createElement("option", {value: typeof ""}, "String"), 
      	React.createElement("option", {value: typeof false}, "Boolean"), 
      	React.createElement("option", {value: "list"}, "List"), 
      	React.createElement("option", {value: typeof {}}, "Dict")
      )
		);
	}
});

var InputGenerator = {
	generateInputElement: function(val, onChange, meta, key) {
		var elmType = meta.self;
		if (elmType == typeof 1) {
			return ( React.createElement(NumberInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == typeof "") {
			return ( React.createElement(StringInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == typeof false) {
			return ( React.createElement(BoolInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == "list") {
			return ( React.createElement(ListInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
		} else if (elmType == typeof {}) {
			return ( React.createElement(DictInput, {value: val, valueChanged: onChange, dataMeta: meta, key: key}) );
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
			React.createElement("div", {className: "row componentCreator"}, 
				React.createElement("div", {className: "col s2"}, 
        	React.createElement("input", {type: "text", placeholder: "Name", ref: "compName"})
				), 
				React.createElement("div", {className: "col s2"}, 
        	React.createElement(TypeSelector, {ref: "compType"})
				), 
				React.createElement("div", {className: "col s2"}, 
					React.createElement("button", {onClick: this.genenrateComponent}, "Generate Component")
				)
			)
		);
	}
});

var ConfigComponent = React.createClass({displayName: "ConfigComponent",
	getInitialState: function() {
		return {value : this.props.value, dataMeta: this.props.dataMeta};
	},
	handleChange: function(comp) {
		this.setState({value: comp.state.value, dataMeta: comp.state.dataMeta});
		this.props.onChange(this, {value: comp.state.value, dataMeta: comp.state.dataMeta});
	},
	calculateIndent: function() {
		return this.props.level * 50;
	},
  render: function() {
  	var inputElem = InputGenerator.generateInputElement(this.state.value, this.handleChange, this.state.dataMeta);
    return (
    	React.createElement("div", {className: "row configComp"}, 
	      React.createElement("div", {className: "col s3"}, 
	      	React.createElement("span", null, this.props.fieldName), " :"
	      ), 
	      React.createElement("div", {className: "col s8"}, 
	      	inputElem
	      ), 
	      React.createElement("div", {className: "col s1"}, 
	      	React.createElement("button", {onClick: this.props.onRemove}, "Remove")
	      )
      )
    );
  }
});