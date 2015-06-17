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
	fetchConfigs: function() {
		var url = '/load/' + this.props.system + "/" + this.props.config;
		data = {};
		$.ajax({
	    url: url,
	    type: 'GET',
	    dataType: 'json',
	    async: false,
	    success: function(msg) {
	      data = msg;
	    }.bind(this),
	    error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
    return data;
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
	getMetaType: function(elm) {
		if (Array.isArray(elm)) {
				return "list";
		} else {
			return typeof elm;
		}
	},
	render: function() {
		confs = this.fetchConfigs();
		console.log(confs);
		meta = this.calculateDataMeta(confs);
		console.log(meta);
		return (
			<div>
				<div className="configHeader">
					<h1 className="systemTitle">{this.props.system}</h1>
					<h2 className="configTitle">{this.props.config}</h2>
				</div>
				<ConfigForm ref="confForm" data={confs} dataMeta={meta}/>
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