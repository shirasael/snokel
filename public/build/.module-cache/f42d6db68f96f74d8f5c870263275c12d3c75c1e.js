var ConfigForm = React.createClass({displayName: "ConfigForm",
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
	render: function() {
		var costume = React.createElement(JsonEditor, {data: this.state.data, onChange: this.updateDataCostume, ref: "costume"});
		var raw = React.createElement(RawEditor, {data: this.state.data, onChange: this.updateDataRaw, ref: "raw"})
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(Tabs, {raw: raw, costume: costume})
				)
			)
		);
	}
});

var ConfigPage = React.createClass({displayName: "ConfigPage",
	handleSave: function() {
		var toSave = this.refs.confForm.getDataToSave();
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
			React.createElement("li", null, React.createElement("a", {onClick: this.showJSON}, React.createElement("i", {className: "mdi-image-remove-red-eye left"}), "Show JSON")),
      React.createElement("li", null, React.createElement("a", {onClick: this.handleSave}, React.createElement("i", {className: "mdi-file-file-upload right"}), "SAVE"))
		];
		return (
		  React.createElement(Layout, {navBackArrow: true, navBackRef: "/", navbarButtons: buttons}, 
				React.createElement("div", null, 
					React.createElement("div", {className: "configHeader"}, 
						React.createElement("h1", {className: "systemTitle"}, this.props.system), 
						React.createElement("h2", {className: "configTitle"}, this.props.config)
					), 
					React.createElement("br", null), 
					React.createElement(ConfigForm, {ref: "confForm", data: confs})
				)
			)
		);
	}
});

React.render(
	React.createElement(ConfigPage, {system: sys, config: cfg}),
  document.getElementById('content')
);