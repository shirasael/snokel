

var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: Number(this.props.value)};
	},
	handleChange: function(event) {
		var newVal = Number(event.target.value);
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

var ListInput = React.createClass({displayName: "ListInput",
	getInitialState: function() {
		if (this.props.value) {
			return {value: this.props.value, dataMeta: this.props.dataMeta};
		}
		return {value: [], dataMeta: this.props.dataMeta};
	},
	renderInnerComponents: function() {
		var comps = [];
		var index = 0;
		for (innerComp in this.state.value) {
			for (innerCompAtt in innerComp) {
				var type = this.state.dataMeta[this.props.fieldName][innerComp][innerCompAtt];
				var val = this.state.value[index][innerCompAtt];
	  		comps.push(
	  			React.createElement(ConfigComponent, {ref: index, onChange: this.handleValChange, fieldName: innerCompAtt, fieldType: type, value: val, dataMeta: this.state.dataMeta})
	  		);
			}
  		index++;
		}
		return comps;
	},
	addComponent: function(compName, compType) {
		this.state.value.push({compName : null});
		this.state.dataMeta[this.props.fieldName][innerComp][innerCompAtt] = compType;
		this.setState({value: this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this.state.value);
	},
	handleChange: function(innerFieldName, newVal, compKey) {
		this.state.value[compKey][innerFieldName] = newVal;
    this.setState({value : this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this.state.value);
  },
	render: function() {
		return (
			React.createElement("div", {className: "listCompsDiv"}, 
				this.renderInnerComponents(), 
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
		} else if (elmType == "list") {
			return ( React.createElement(ListInput, {ref: ref, val: val, valueChanged: this.handleChange, dataMeta: this.props.dataMeta, fieldName: this.props.fieldName}) );
		} else {
			return null;
		}
	},
	handleChange: function(newVal) {
		console.log(this.state);
		this.setState({value: newVal});
		this.props.onChange(this.props.fieldName, newVal, this.props.key);
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