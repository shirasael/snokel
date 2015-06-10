
var data = {
	"MaxLength" : 50,
	"BackupDirectory" : "/tmp",
	"ShouldForce" : true
};

var dataMeta = {
	"MaxLength" : {self: "num"},
	"BackupDirectory" : {self: "str"},
	"ShouldForce" : {self: "bool"}
}


var ConfigComponentsList = React.createClass({
	getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
  handleChange: function(comp, newVals) {
  	this.state.data[comp.props.fieldName] = newVals.value;
  	this.state.dataMeta[comp.props.fieldName] = newVals.dataMeta;
  	this.setState({data : this.state.data, dataMeta : this.state.dataMeta});
  	this.props.onChange(this.state);
  },
  renderComponents: function() {
  	var comps = [];
  	var index = 0;
  	for (compName in this.state.data) {
  		var val = this.state.data[compName];
  		var meta = this.state.dataMeta[compName];
  		comps.push(<ConfigComponent key={index} onChange={this.handleChange} fieldName={compName} value={val} dataMeta={meta} />)
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	this.state.data[compName] = null;
  	this.state.dataMeta[compName] = {self: compType};
  	this.setState({data: this.state.data, dataMeta: this.state.dataMeta});
  	this.props.onChange(this.state);
  },
	render: function() {
		return (
			<div>
				<br/>
				<div>
					<div className="components">
						{this.renderComponents()}
					</div>
					<br/>
					<ConfigComponentCreator onComponentCreated={this.addComponent}></ConfigComponentCreator>
				</div>
			</div>
		);
	}
});

var ConfigForm = React.createClass({
  getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
	updateData: function(obj, state) {
		this.setState(state);
	},
	render: function() {
		return (
			<div>
				<div className="jsonDiv">
					<span className="jsonSpan">JSON: {JSON.stringify(this.state.data)}</span>
				</div>
				<div className="configForm">
					<DictInput ref="configComponents" value={this.state.data} dataMeta={this.state.dataMeta} valueChanged={this.updateData}></DictInput>
				</div>
			</div>
		);
	}
});

var ConfigPage = React.createClass({
	handleSave: function() {
		var jsonData = this.refs.confForm.state.data;
		console.log(jsonData);
		var url = '/save/' + this.props.system + "/" + this.props.config;
		$.ajax({
	    url: url,
	    type: 'POST',
	    data: JSON.stringify(jsonData),
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    async: false,
	    success: function(msg) {
	      alert(msg);
	    }.bind(this),
	    error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
	},
	render: function() {
		return (
			<div>
				<div className="configHeader">
					<h1 className="systemTitle">{this.props.system}</h1>
					<h2 className="configTitle">{this.props.config}</h2>
				</div>
				<ConfigForm ref="confForm" data={data} dataMeta={dataMeta}/>
				<button className="saveButton" onClick={this.handleSave}>SAVE!</button>
				<br/>
			</div>
		);
	}
});

React.render(
  <ConfigPage system={sys} config={cfg} />,
  document.getElementById('content')
);