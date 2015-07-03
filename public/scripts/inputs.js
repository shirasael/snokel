var NumberInput = React.createClass({
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
			<div className="strInput row">
				<div className="col s11">
	    		<input disabled={this.state.isNull} type="number" value={this.state.value} onChange={this.handleChange}/>
				</div>
				<div className="col s1">
		    	<p onClick={this.setNull}>
			      <input ref="nullbox" type="checkbox" id="nullbox" checked={this.state.isNull}/>
			      <label for="nullbox">Null</label>
			    </p>
				</div>
	    </div>
		);
	}
});

var StringInput = React.createClass({
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
			<div className="numInput row">
				<div className="col s11">
	    		<input disabled={this.state.isNull} value={this.state.lastVal} type="text" onChange={this.handleChange}></input>
				</div>
				<div className="col s1">
		    	<p onClick={this.setNull}>
			      <input ref="nullbox" type="checkbox" id="nullbox" checked={this.state.isNull}/>
			      <label for="nullbox">Null</label>
			    </p>
				</div>
	    </div>
		);
	}
});

var BoolInput = React.createClass({
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
			<div className="switch boolInput row">
				<div className="col s11">
			    <label>
			      False
			      <input disabled={this.state.isNull} type="checkbox" checked={this.state.value} onChange={this.handleChange}/>
			      <span className="lever"></span>
			      True
			    </label>
				</div>
			  <div className="col s1">
		    	<p onClick={this.setNull}>
			      <input ref="nullbox" type="checkbox" id="nullbox" checked={this.state.isNull}/>
			      <label for="nullbox">Null</label>
			    </p>
			  </div>
			</div>
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
			comps.push(
				<ConfigComponent key={index} onChange={this.handleChange.bind(this, index)} fieldName={(index + 1) + ")"} value={val} dataMeta={this.state.dataMeta[index]} />
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
			<div className="listCompsDiv listInput">
				<div className="row existingList">
					{this.renderInnerComponents()}
				</div>
				<ConfigComponentCreator nameless onComponentCreated={this.addComponent}></ConfigComponentCreator>
			</div>
		);
	}
});

var DictInput = React.createClass({
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
  				<ConfigComponent onChange={this.handleChange}  key={index} fieldName={compName} value={val} dataMeta={meta} />
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
			<div className="dictCompsDiv">
				<div className="existingDict">
					{this.renderInnerComponents()}
				</div>
				<ConfigComponentCreator onComponentCreated={this.addComponent}></ConfigComponentCreator>
			</div>
		);
	}
});


var TypeSelector = React.createClass({
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
			<div className="input-field typeSelectorDiv">
				<select className={"typeSelector " + this.state.selectorId} ref="selector" id={this.state.selectorId}>
					<option value="" disabled selected>Comp. Type</option>
	      	<option value={typeof 1}>Number</option>
	      	<option value={typeof ""}>String</option>
	      	<option value={typeof false}>Boolean</option>
	      	<option value="list">List</option>
	      	<option value={typeof {}}>Dict</option>
	      </select>
		  </div>
		);
	}
});

var InputHelper = {
	generateInputElement: function(val, onChange, meta, key) {
		var elmType = meta.self;
		if (elmType == typeof 1) {
			return ( <NumberInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == typeof "") {
			return ( <StringInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == typeof false) {
			return ( <BoolInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == "list") {
			return ( <ListInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else if (elmType == typeof {}) {
			return ( <DictInput value={val} valueChanged={onChange} dataMeta={meta} key={key}/> );
		} else {
			return null;
		}
	}
};

var ConfigComponentCreator = React.createClass({
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
				<div className="input-field col s4">
	        <input id="comp_name" type="text" ref="compName" />
	        <label for="comp_name">Comp. Name</label>
	      </div>
			);
		}
		return (
			<div className="componentCreator row">
				{nameDiv}
				<div className="col s4">
        	<TypeSelector ref="compType"></TypeSelector>
				</div>
				<div className="col s1">
				  <a className="btn-floating btn-small waves-effect waves-light" onClick={this.genenrateComponent}><i className="mdi-content-add"></i></a>
				</div>
			</div>
		);
	}
});

var ConfigComponent = React.createClass({
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
    	<div className={clazz} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
    		<div className="col s2 nameDiv">
	      	<span className="propName">{this.props.fieldName}</span>
    		</div>
    		<div className="col s9">
	      	{inputElem}
	      </div>
      </div>
    );
  }
});

var JsonEditor = React.createClass({
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
			<DictInput ref="input" value={this.state.data} dataMeta={this.state.dataMeta} valueChanged={this.onDataChanged}></DictInput>
		);
	}
});

var RawEditor = React.createClass({
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
			<div className="row">
        <div className="input-field col s12">
          <textarea className="materialize-textarea rawInput" value={this.state.data} onChange={this.handleChange}></textarea>
        </div>
		  </div>
		);
	}
});