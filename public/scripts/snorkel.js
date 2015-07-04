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
		if (this.refs.costume) {
			this.refs.costume.updateData(state.data);
		}
		this.setState({data: state.data});
	},
	getCostumeEditor: function(data) {
		if (isJSON(data)) {
			return <JsonEditor data={this.state.data} onChange={this.updateDataCostume} ref="costume" />;
		}
		return null;
	},
	render: function() {
		var tabs = [];
		var costume = this.getCostumeEditor(this.state.data);
		if (costume != null) {
			tabs.push({title: "Costume Editor", content: costume});
		} 
		var raw = <RawEditor data={this.state.data} onChange={this.updateDataRaw} ref="raw" />
		tabs.push({title: "Raw Editor", content: raw});
		return (
			<div>
				<div className="configForm">
					<Tabs tabs={tabs}/>
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