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