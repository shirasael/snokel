var NumberInput = React.createClass({
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
			<input type="number" value={this.state.value} onChange={this.handleChange}/>
		);
	}
});

var StringInput = React.createClass({
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
			<input type="text" value={this.state.value} onChange={this.handleChange}/>
		);
	}
});

var BoolInput = React.createClass({
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
			<input type="checkbox" checked={this.state.value} onChange={this.handleChange}/>
		);
	}
});

var ListInput = React.createClass({
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
				<div key={index}>
					{comp}
				</div>
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
			<div className="listCompsDiv">
				<div className="existing">
					<span>[</span>
						{this.renderInnerComponents()}
					<span>]</span>
				</div>
				<TypeSelector ref="selector" />
				<button onClick={this.addComponent}>Add</button>
			</div>
		);
	}
});


var TypeSelector = React.createClass({
	getInitialState: function() {
		return {selected : null};
	},
	handleChange: function(event) {
		var newSelected = event.target.value;
    this.setState({selected : newSelected});
  },
	render: function() {
		return (
			<select ref="compType" value={this.state.selected} onChange={this.handleChange}>
      	<option value="num">Number</option>
      	<option value="str">String</option>
      	<option value="bool">Boolean</option>
      	<option value="list">List</option>
      	<option value="dict">Dict</option>
      </select>
		);
	}
});

var InputGenerator = {
	generateInputElement: function(val, onChange, meta, key) {
		var elmType = meta.self;
		if (elmType == "num") {
			return ( <NumberInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == "str") {
			return ( <StringInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == "bool") {
			return ( <BoolInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == "list") {
			return ( <ListInput val={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else {
			return null;
		}
	}
};

var ConfigComponentCreator = React.createClass({
	genenrateComponent: function() {
		var fieldName = React.findDOMNode(this.refs.compName).value.trim();
		var fieldType = React.findDOMNode(this.refs.compType).value;
		this.props.onComponentCreated(fieldName, fieldType);
	},
	render: function() {
		return (
			<div className="componentCreator">
        <input type="text" placeholder="Name" ref="compName" />
        <span> : </span>
        <TypeSelector ref="compType"></TypeSelector>
				<button onClick={this.genenrateComponent}>Generate Component</button>
			</div>
		);
	}
});

var ConfigComponent = React.createClass({
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
    	<div className="configComp">
	      <div>
	      	<span>{this.props.fieldName}</span> : {inputElem}
	      </div>
	      <button onClick={this.props.onRemove}>Remove</button>
      </div>
    );
  }
});