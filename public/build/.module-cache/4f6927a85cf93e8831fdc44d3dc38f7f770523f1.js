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
			React.createElement("div", {className: "numInput"}, 
				React.createElement("input", {type: "number", value: this.state.value, onChange: this.handleChange})
			)
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
			React.createElement("div", {className: "strInput"}, 
	    	React.createElement("input", {value: this.state.value, type: "text", onChange: this.handleChange})
	    )
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
			React.createElement("div", {className: "switch boolInput"}, 
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
			comps.push(
				React.createElement(ConfigComponent, {key: index, onChange: this.handleChange.bind(this, index), fieldName: (index + 1) + ")", value: val, dataMeta: this.state.dataMeta[index]})
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
			React.createElement("div", {className: "listCompsDiv listInput"}, 
				React.createElement("div", {className: "row existingList"}, 
					this.renderInnerComponents()
				), 
				React.createElement("div", {className: "row listItemAdder"}, 
					React.createElement("div", {className: "col s2"}, 
						React.createElement(TypeSelector, {ref: "selector"})
					), 
					React.createElement("div", {className: "col s2"}, 
						React.createElement(MaterialButton, {onClick: this.addComponent, lable: "Add"})
					)
				)
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
  		comps.push(
  				React.createElement(ConfigComponent, {onChange: this.handleChange, key: index, fieldName: compName, value: val, dataMeta: meta})
  			)
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	if (!this.state.value[compName]) {
	  	this.state.dataMeta[compName] = {self: compType};
	  	this.setState({value: this.state.value, dataMeta: this.state.dataMeta});
	    this.props.valueChanged(this, {value : this.state.value, dataMeta: this.state.dataMeta});	
  	}
  },
	render: function() {
		return (
			React.createElement("div", {className: "dictCompsDiv"}, 
				React.createElement("div", {className: "existingDict"}, 
					this.renderInnerComponents()
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
  componentDidMount: function() {
		 $('select').material_select();
  },
	render: function() {
		return (
			React.createElement("select", {className: "typeSelector", ref: "compType", value: this.state.selected, onChange: this.handleChange}, 
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
		if (fieldName != "") {
			this.props.onComponentCreated(fieldName, fieldType);
		}
	},
	render: function() {
		return (
			React.createElement("div", {className: "componentCreator row"}, 
				React.createElement("div", {className: "input-field col s2"}, 
	        React.createElement("input", {id: "comp_name", type: "text", ref: "compName"}), 
	        React.createElement("label", {for: "comp_name"}, "Name")
	      ), 
				React.createElement("div", {className: "col s2"}, 
        	React.createElement(TypeSelector, {ref: "compType"})
				), 
				React.createElement("div", {className: "col s2"}, 
				  React.createElement("a", {className: "btn-floating btn-small waves-effect waves-light red", onClick: this.genenrateComponent}, React.createElement("i", {className: "mdi-content-add"}))
				)
			)
		);
	}
});

var ConfigComponent = React.createClass({displayName: "ConfigComponent",
	getInitialState: function() {
		return {value : this.props.value, dataMeta: this.props.dataMeta, over: false};
	},
	handleChange: function(comp) {
		this.setState({value: comp.state.value, dataMeta: comp.state.dataMeta});
		this.props.onChange(this, {value: comp.state.value, dataMeta: comp.state.dataMeta});
	},
	onMouseOver: function() {
		this.state.over = true;
		this.setState(this.state);
	},
	onMouseLeave: function() {
		this.state.over = false;
		this.setState(this.state);
	},
  render: function() {
  	var inputElem = InputGenerator.generateInputElement(this.state.value, this.handleChange, this.state.dataMeta);
  	var clazz = "configComp row" + (this.state.over ? " focused" : "");
  	var nameDiv = this.props.nameless ? null : (
  			React.createElement("div", {className: "col s2 nameDiv"}, 
	      	React.createElement("span", {className: "propName"}, this.props.fieldName)
    		)
    	);
    return (
    	React.createElement("div", {className: clazz, onMouseLeave: this.onMouseLeave, onMouseOver: this.onMouseOver}, 
    		nameDiv, 
	      React.createElement("div", {className: "col s9"}, 
	      	inputElem
	      )
      )
    );
  }
});