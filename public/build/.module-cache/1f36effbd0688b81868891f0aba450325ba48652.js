var ConfigForm = React.createClass({displayName: "ConfigForm",
  getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
	updateData: function(obj, state) {
		this.setState(state);
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "jsonDiv"}, 
					React.createElement("span", {className: "jsonSpan"}, "JSON: ", JSON.stringify(this.state.data))
				), 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(DictInput, {ref: "configComponents", value: this.state.data, dataMeta: this.state.dataMeta, valueChanged: this.updateData})
				)
			)
		);
	}
});

var ConfigPage = React.createClass({displayName: "ConfigPage",
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
		var confs = this.fetchConfigs();
		var meta = this.calculateDataMeta(confs);
		var buttons = [
			React.createElement("li", null, React.createElement("a", {onClick: this.showJSON}, "Show JSON")),
      React.createElement("li", null, React.createElement("a", {onClick: this.handleSave}, "SAVE"))
		];
		return (
		  React.createElement(Layout, {navBackArrow: true, navBackRef: "/", navbarButtons: buttons}, 
				React.createElement("div", null, 
					React.createElement("div", {className: "configHeader"}, 
						React.createElement("h1", {className: "systemTitle"}, this.props.system), 
						React.createElement("h2", {className: "configTitle"}, this.props.config)
					), 
					React.createElement(ConfigForm, {ref: "confForm", data: confs, dataMeta: meta}), 
					React.createElement("br", null)
				)
			)
		);
	}
});

React.render(
	React.createElement(ConfigPage, {system: sys, config: cfg}),
  document.getElementById('content')
);