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
		if (this.refs.costume) {
			this.refs.costume.updateData(state.data);
		}
		this.setState({data: state.data});
	},
	getCostumeEditor: function(data) {
		if (isJSON(data)) {
			return React.createElement(JsonEditor, {data: this.state.data, onChange: this.updateDataCostume, ref: "costume"});
		}
		return null;
	},
	render: function() {
		var tabs = [];
		var costume = this.getCostumeEditor(this.state.data);
		if (costume != null) {
			tabs.push({title: "Costume Editor", content: costume});
		} 
		var raw = React.createElement(RawEditor, {data: this.state.data, onChange: this.updateDataRaw, ref: "raw"})
		tabs.push({title: "Raw Editor", content: raw});
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(Tabs, {tabs: tabs})
				)
			)
		);
	}
});

var ConfigPage = React.createClass({displayName: "ConfigPage",
	getInitialState: function() {
		return {confsToSave: ""};
	},
	handleSaveConfirm: function() {
		var toSave = this.refs.confForm.state.data;
		var dialog = this.refs.saveDialog;
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
	      dialog.close();
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
	handleSave: function() {
		var dialog = this.refs.saveDialog;
		this.setState({confsToSave: this.refs.confForm.state.data}, function() {
			dialog.open();
		});
	},
	render: function() {
		var confs = this.fetchConfigs();
		var navbarBtns = [
      React.createElement("li", null, React.createElement("a", {onClick: this.handleSave}, React.createElement("i", {className: "mdi-file-file-upload right"}), "SAVE"))
		];
		var dialogBtns = [
			React.createElement(DialogAction, {onAction: this.handleSaveConfirm}, "Seems good!"),
			React.createElement(DialogAction, {cancel: true, wavesColor: "red"}, "Cancel")
		];
		return (
		  React.createElement(Layout, {navBackArrow: true, navBackRef: "/", navbarButtons: navbarBtns}, 
		  	React.createElement(Dialog, {modalId: "save", actions: dialogBtns, ref: "saveDialog"}, 
		  		React.createElement("h4", null, "Save these configurations?"), 
		  		React.createElement("p", {className: "rawConfigs"}, this.state.confsToSave)
		  	), 
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