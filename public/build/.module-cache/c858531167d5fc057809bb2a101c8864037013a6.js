

var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: Number(this.props.value), dataMeta: this.props.dataMeta};
	},
	handleChange: function(event) {
		var newVal = Number(event.target.value);
    this.setState({value : newVal, dataMeta: this.state.dataMeta});
    this.props.valueChanged({value : newVal, dataMeta: this.state.dataMeta});
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
    this.props.valueChanged({value : newVal, dataMeta: this.state.dataMeta});
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
    this.props.valueChanged(this);
  },
	render: function() {
		return (
			React.createElement("input", {type: "checkbox", checked: this.state.value, onChange: this.handleChange})
		);
	}
});

// var ListInput = React.createClass({
// 	getInitialState: function() {
// 		if (this.props.value) {
// 			return {value: this.props.value, dataMeta: this.props.dataMeta};
// 		}
// 		return {value: [], dataMeta: this.props.dataMeta};
// 	},
// 	renderInnerComponents: function() {
// 		var comps = [];
// 		var index = 0;
// 		for (innerComp in this.state.value) {
// 			for (innerCompAtt in innerComp) {
// 				var type = this.state.dataMeta[this.props.fieldName][innerCompAtt].self;
// 				var val = this.state.value[index][innerCompAtt];
// 	  		comps.push(
// 	  			<ConfigComponent ref={index} onChange={this.handleValChange} fieldName={innerCompAtt} fieldType={type} value={val} dataMeta={this.state.dataMeta}/>
// 	  		);
// 			}
//   		index++;
// 		}
// 		return comps;
// 	},
// 	addComponent: function(compName, compType) {

// 		this.setState({value: this.state.value, dataMeta: this.state.dataMeta});
// 		this.props.valueChanged(this);
// 	},
// 	handleChange: function(newVal, compKey) {
		
//   },
// 	render: function() {
// 		return (
// 			<div className="listCompsDiv">
// 				<span>[</span>
// 					{this.renderInnerComponents()}
// 					<span>,</span>
// 					<TypeSelector ref="selector" />
// 					<button onClick={this.addComponent}>Add</button>
// 				<span>]</span>
// 			</div>
// 		);
// 	}
// });


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
	generateInputElement: function(val, onChange, meta) {
		var elmType = meta.self;
		if (elmType == "num") {
			return ( React.createElement(NumberInput, {value: val, valueChanged: onChange, dataMeta: meta}) );
		} else if (elmType == "str") {
			return ( React.createElement(StringInput, {value: val, valueChanged: onChange, dataMeta: meta}) );
		} else if (elmType == "bool") {
			return ( React.createElement(BoolInput, {value: val, valueChanged: onChange, dataMeta: meta}) );
		} else if (elmType == "list") {
			return ( React.createElement(ListInput, {val: val, valueChanged: onChange, dataMeta: meta}) );
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
	handleChange: function(newInput) {
		this.setState({value: newInput.state.value, dataMeta: newInput.state.dataMeta});
		this.props.onChange(this);
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