var ConfigForm = React.createClass({displayName: "ConfigForm",
  getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
	updateData: function(obj, state) {
		this.props.onChange(state.value);
		this.setState({data: state.value, dataMeta: state.dataMeta});
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(DictInput, {ref: "configComponents", value: this.state.data, dataMeta: this.state.dataMeta, valueChanged: this.updateData})
				)
			)
		);
	}
});

var ConfigPage = React.createClass({displayName: "ConfigPage",
	getInitialState: function() {
		return {confs: this.fetchConfigs()};
	},
	handleSave: function() {
		var jsonData = this.state.confs;
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
	handleChange: function(newConfs) {
		this.setState({confs: newConfs});
		console.log(newConfs);
	},
	handleRawChange: function(newConfs) {
		var newConfsObj = JSON.parse(newConfs);
		this.handleChange(newConfsObj);
	},
	render: function() {
		var meta = this.calculateDataMeta(this.state.confs);
		var buttons = [
			React.createElement("li", null, React.createElement("a", {onClick: this.showJSON}, React.createElement("i", {className: "mdi-image-remove-red-eye left"}), "Show JSON")),
      React.createElement("li", null, React.createElement("a", {onClick: this.handleSave}, React.createElement("i", {className: "mdi-file-file-upload right"}), "SAVE"))
		];
		var costumeEditor = React.createElement(ConfigForm, {ref: "confForm", data: this.state.confs, dataMeta: meta, onChange: this.handleChange});
		var rawEditor = React.createElement(RawEditor, {data: JSON.stringify(this.state.confs, null, 4), onChange: this.handleRawChange});
		return (
		  React.createElement(Layout, {navBackArrow: true, navBackRef: "/", navbarButtons: buttons}, 
				React.createElement("div", null, 
					React.createElement("div", {className: "configHeader"}, 
						React.createElement("h1", {className: "systemTitle"}, this.props.system), 
						React.createElement("h2", {className: "configTitle"}, this.props.config)
					), 
					React.createElement("br", null), 
					React.createElement(Tabs, {editor: costumeEditor, raw: rawEditor})
				)
			)
		);
	}
});

React.render(
	React.createElement(ConfigPage, {system: sys, config: cfg}),
  document.getElementById('content')
);