var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: this.props.value, lastVal: (this.props.value == null ? 0 : this.props.value), dataMeta: this.props.dataMeta, isNull: this.props.value == null};
	},
	handleChange: function(event) {
		this.state.value = Number(event.target.value);
		this.state.lastVal = this.state.value;
    this.setState(this.state);
    this.props.valueChanged(this);
  },
  setNull: function() {
  	this.state.isNull = !this.state.isNull;
  	this.state.value = this.state.isNull ? null : this.state.lastVal;
  	this.setState(this.state);
    this.props.valueChanged(this);
  },
	render: function() {
		return (
			React.createElement("div", {className: "strInput row"}, 
				React.createElement("div", {className: "col s11"}, 
	    		React.createElement("input", {disabled: this.state.isNull, type: "number", value: this.state.value, onChange: this.handleChange})
				), 
				React.createElement("div", {className: "col s1"}, 
		    	React.createElement("p", {onClick: this.setNull}, 
			      React.createElement("input", {ref: "nullbox", type: "checkbox", id: "nullbox", checked: this.state.isNull}), 
			      React.createElement("label", {for: "nullbox"}, "Null")
			    )
				)
	    )
		);
	}
});

var StringInput = React.createClass({displayName: "StringInput",
	getInitialState: function() {
		return {value: this.props.value, lastVal: (this.props.value == null ? "" : this.props.value), dataMeta: this.props.dataMeta, isNull: this.props.value == null};
	},
	handleChange: function(event) {
		this.state.value = event.target.value;
		this.state.lastVal = event.target.value;
    this.setState(this.state);
    this.props.valueChanged(this);
  },
  setNull: function() {
  	this.state.isNull = !this.state.isNull;
  	this.state.value = this.state.isNull ? null : this.state.lastVal;
  	this.setState(this.state);
    this.props.valueChanged(this);
  },
	render: function() {
		return (
			React.createElement("div", {className: "numInput row"}, 
				React.createElement("div", {className: "col s11"}, 
	    		React.createElement("input", {disabled: this.state.isNull, value: this.state.lastVal, type: "text", onChange: this.handleChange})
				), 
				React.createElement("div", {className: "col s1"}, 
		    	React.createElement("p", {onClick: this.setNull}, 
			      React.createElement("input", {ref: "nullbox", type: "checkbox", id: "nullbox", checked: this.state.isNull}), 
			      React.createElement("label", {for: "nullbox"}, "Null")
			    )
				)
	    )
		);
	}
});

var BoolInput = React.createClass({displayName: "BoolInput",
	getInitialState: function() {
		return {value: this.props.value, lastVal: (this.props.value == null ? false : this.props.value), dataMeta: this.props.dataMeta, isNull: this.props.value == null};
	},
	handleChange: function(event) {
		this.state.value = event.target.checked;
		this.state.lastVal = this.state.value;
    this.setState(this.state);
    this.props.valueChanged(this);
  },
  setNull: function() {
  	this.state.isNull = !this.state.isNull;
  	this.state.value = this.state.isNull ? null : this.state.lastVal;
  	this.setState(this.state);
    this.props.valueChanged(this);
  },
	render: function() {
		return (
			React.createElement("div", {className: "switch boolInput row"}, 
				React.createElement("div", {className: "col s11"}, 
			    React.createElement("label", null, 
			      "False", 
			      React.createElement("input", {disabled: this.state.isNull, type: "checkbox", checked: this.state.value, onChange: this.handleChange}), 
			      React.createElement("span", {className: "lever"}), 
			      "True"
			    )
				), 
			  React.createElement("div", {className: "col s1"}, 
		    	React.createElement("p", {onClick: this.setNull}, 
			      React.createElement("input", {ref: "nullbox", type: "checkbox", id: "nullbox", checked: this.state.isNull}), 
			      React.createElement("label", {for: "nullbox"}, "Null")
			    )
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
	handleChange: function(index, comp, newInput) {
		this.state.value[index] = newInput.value;
		this.state.dataMeta[index] = newInput.dataMeta;
    this.setState({value : this.state.value, dataMeta: this.state.dataMeta});
    this.props.valueChanged(this, {value : this.state.value, dataMeta: this.state.dataMeta});
  },
	addComponent: function(compType) {
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
				React.createElement(ConfigComponentCreator, {nameless: true, onComponentCreated: this.addComponent})
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
  		this.state.value[compName] = null;
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
		return {selectorId: (Math.floor(Math.random() * 10000000000000)).toString(36)};
	},
	getSelectedValue: function() {
		return this.refs.selector.getDOMNode().value;
	},
  componentDidMount: function() {
  	$('#' + this.state.selectorId).material_select();
  },
	render: function() {
		return (
			React.createElement("div", {className: "input-field typeSelectorDiv"}, 
				React.createElement("select", {className: "typeSelector " + this.state.selectorId, ref: "selector", id: this.state.selectorId}, 
					React.createElement("option", {value: "", disabled: true, selected: true}, "Comp. Type"), 
	      	React.createElement("option", {value: typeof 1}, "Number"), 
	      	React.createElement("option", {value: typeof ""}, "String"), 
	      	React.createElement("option", {value: typeof false}, "Boolean"), 
	      	React.createElement("option", {value: "list"}, "List"), 
	      	React.createElement("option", {value: typeof {}}, "Dict")
	      )
		  )
		);
	}
});

var InputHelper = {
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
		var fieldType = this.refs.compType.getSelectedValue();
		if (fieldType != "") {
			if (!this.props.nameless) {
				var fieldName = React.findDOMNode(this.refs.compName).value.trim();
				if (fieldName != "") {
					this.props.onComponentCreated(fieldName, fieldType);
				}	
			} else {
				this.props.onComponentCreated(fieldType);
			}
		}
	},
	render: function() {
		var nameDiv = null;
		if (!this.props.nameless) {
			nameDiv = (
				React.createElement("div", {className: "input-field col s4"}, 
	        React.createElement("input", {id: "comp_name", type: "text", ref: "compName"}), 
	        React.createElement("label", {for: "comp_name"}, "Comp. Name")
	      )
			);
		}
		return (
			React.createElement("div", {className: "componentCreator row"}, 
				nameDiv, 
				React.createElement("div", {className: "col s4"}, 
        	React.createElement(TypeSelector, {ref: "compType"})
				), 
				React.createElement("div", {className: "col s1"}, 
				  React.createElement("a", {className: "btn-floating btn-small waves-effect waves-light", onClick: this.genenrateComponent}, React.createElement("i", {className: "mdi-content-add"}))
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
  	var inputElem = InputHelper.generateInputElement(this.state.value, this.handleChange, this.state.dataMeta);
  	var clazz = "configComp row" + (this.state.over ? " focused" : "");
    return (
    	React.createElement("div", {className: clazz, onMouseLeave: this.onMouseLeave, onMouseOver: this.onMouseOver}, 
    		React.createElement("div", {className: "col s2 nameDiv"}, 
	      	React.createElement("span", {className: "propName"}, this.props.fieldName)
    		), 
    		React.createElement("div", {className: "col s9"}, 
	      	inputElem
	      )
      )
    );
  }
});

var JsonEditor = React.createClass({displayName: "JsonEditor",
	getInitialState: function() {
		var data = this.props.data;
		if (typeof data == typeof "") {
			data = JSON.parse(data);
		}
		return {data: data, dataMeta: this.calculateDataMeta(data)};
	},
	calculateDataMeta: function(confs) {
		var meta = {self: this.getMetaType(confs)};
		if (meta.self == typeof {} || meta.self == "list") {
			for (conf in confs) {
				meta[conf] = this.calculateDataMeta(confs[conf]);
			}
		}
		return meta;
	},
	onDataChanged: function(obj, state) {
		this.setState({data: state.value, dataMeta: state.dataMeta});
		this.props.onChange({data: state.value});
	},
	getRawData: function(data) {
		return JSON.stringify(data, null, 4);
	},
	getRawData: function() {
		return JSON.stringify(this.state.data, null, 4);
	},
	updateData: function(newData) {
		console.log(newData);
		var data = newData;
		if (typeof data == typeof "") {
			data = JSON.parse(data);
		}
		this.setState({data: data, dataMeta: this.calculateDataMeta(data)});
	},
	getMetaType: function(elm) {
		if (Array.isArray(elm)) {
			return "list";
		} else {
			return typeof elm;
		}
	},
	render: function() {
		return (
			React.createElement(DictInput, {ref: "input", value: this.state.data, dataMeta: this.state.dataMeta, valueChanged: this.onDataChanged})
		);
	}
});

var RawEditor = React.createClass({displayName: "RawEditor",
	getInitialState: function() {
		return {data: this.props.data};
	},
	handleChange: function(event) {
		var newData = event.target.value;
		this.setState({data: newData});
		this.props.onChange({data: newData});
	},
	updateData: function(newData) {
		this.setState({data: newData});
	},
	render: function() {
		return (
			React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "input-field col s12"}, 
          React.createElement("textarea", {id: "icon_prefix2", className: "materialize-textarea", value: this.state.data, onChange: this.handleChange}), 
          React.createElement("label", {for: "icon_prefix2"}, "Raw Data")
        )
		  )
		);
	}
});