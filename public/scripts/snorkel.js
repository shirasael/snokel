var ConfigForm = React.createClass({
  getInitialState: function() {
		return {data: this.props.data};
	},
	updateDataCostume: function(state) {
		var newData = this.refs.costume.getRawData(state.data);
		this.refs.raw.updateData(newData);
		this.setState({data: newData});
	},
	updateDataRaw: function(state) {
		this.refs.costume.updateData(state.data);
		this.setState({data: state.data});
	},
	getCostumeEditor: function(data) {
		if (isJSON(data)) {
			return <JsonEditor data={this.state.data} onChange={this.updateDataCostume} ref="costume" />;
		}
		return null;
	},
	render: function() {
		var costume = this.getCostumeEditor(this.state.data);
		var raw = <RawEditor data={this.state.data} onChange={this.updateDataRaw} ref="raw" />
		return (
			<div>
				<div className="configForm">
					<Tabs raw={raw} costume={costume}/>
				</div>
			</div>
		);
	}
});

var ConfigPage = React.createClass({
	handleSave: function() {
		var toSave = this.refs.confForm.state.data;
		console.log(toSave);
		var url = '/save/' + this.props.system + "/" + this.props.config;
		$.ajax({
	    url: url,
	    type: 'POST',
	    data: toSave,
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
	    dataType: 'text',
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
	render: function() {
		var confs = this.fetchConfigs();
		var buttons = [
			<li><a onClick={this.showJSON}><i className="mdi-image-remove-red-eye left"></i>Show JSON</a></li>,
      <li><a onClick={this.handleSave}><i className="mdi-file-file-upload right"></i>SAVE</a></li>
		];
		return (
		  <Layout navBackArrow navBackRef="/" navbarButtons={buttons}>
				<div>
					<div className="configHeader">
						<h1 className="systemTitle">{this.props.system}</h1>
						<h2 className="configTitle">{this.props.config}</h2>
					</div>
					<br/>
					<ConfigForm ref="confForm" data={confs}/>
				</div>
			</Layout>
		);
	}
});

React.render(
	<ConfigPage system={sys} config={cfg}/>,
  document.getElementById('content')
);