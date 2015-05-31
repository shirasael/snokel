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
  },
	render: function() {
		return (
			<div>
				<div className="jsonDiv">
					<span className="jsonSpan">JSON: {JSON.stringify(this.state.data)}</span>
				</div>
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
	render: function() {
		return (
			<div>
				<div className="configForm">
					<ConfigComponentsList ref="configComponents" data={data} dataMeta={dataMeta}></ConfigComponentsList>
					<br />
				</div>
			</div>
		);
	}
});

var ConfigPage = React.createClass({
	render: function() {
		return (
			<div>
				<div className="configHeader">
					<h1 className="systemTitle">{this.props.system}</h1>
					<h2 className="configTitle">{this.props.config}</h2>
				</div>
				<ConfigForm />
			</div>
		);
	}
});