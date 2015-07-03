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
		confs = this.fetchConfigs();
		console.log(confs);
		meta = this.calculateDataMeta(confs);
		console.log(meta);
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configHeader"}, 
					React.createElement("h1", {className: "systemTitle"}, this.props.system), 
					React.createElement("h2", {className: "configTitle"}, this.props.config)
				), 
				React.createElement(ConfigForm, {ref: "confForm", data: confs, dataMeta: meta}), 
				React.createElement("button", {className: "saveButton", onClick: this.handleSave}, "SAVE!"), 
				React.createElement("br", null)
			)
		);
	}
});

var SideBar = React.createClass({displayName: "SideBar",
	render: function() {
		return (
			React.createElement("div", null, 
			  React.createElement("ul", {id: "slide-out", class: "side-nav"}, 
    React.createElement("li", null, React.createElement("a", {href: "#!"}, "First Sidebar Link")), 
    React.createElement("li", null, React.createElement("a", {href: "#!"}, "Second Sidebar Link")), 
    React.createElement("li", {class: "no-padding"}, 
      React.createElement("ul", {class: "collapsible collapsible-accordion"}, 
        React.createElement("li", null, 
          React.createElement("a", {class: "collapsible-header"}, "Dropdown", React.createElement("i", {class: "mdi-navigation-arrow-drop-down"})), 
          React.createElement("div", {class: "collapsible-body"}, 
            React.createElement("ul", null, 
              React.createElement("li", null, React.createElement("a", {href: "#!"}, "First")), 
              React.createElement("li", null, React.createElement("a", {href: "#!"}, "Second")), 
              React.createElement("li", null, React.createElement("a", {href: "#!"}, "Third")), 
              React.createElement("li", null, React.createElement("a", {href: "#!"}, "Fourth"))
            )
          )
        )
      )
    )
  ), 
  React.createElement("ul", {class: "right hide-on-med-and-down"}, 
    React.createElement("li", null, React.createElement("a", {href: "#!"}, "First Sidebar Link")), 
    React.createElement("li", null, React.createElement("a", {href: "#!"}, "Second Sidebar Link")), 
    React.createElement("li", null, React.createElement("a", {class: "dropdown-button", href: "#!", "data-activates": "dropdown1"}, "Dropdown", React.createElement("i", {class: "mdi-navigation-arrow-drop-down right"}))), 
    React.createElement("ul", {id: "dropdown1", class: "dropdown-content"}, 
      React.createElement("li", null, React.createElement("a", {href: "#!"}, "First")), 
      React.createElement("li", null, React.createElement("a", {href: "#!"}, "Second")), 
      React.createElement("li", null, React.createElement("a", {href: "#!"}, "Third")), 
      React.createElement("li", null, React.createElement("a", {href: "#!"}, "Fourth"))
    )
  ), 
  React.createElement("a", {href: "#", "data-activates": "slide-out", class: "button-collapse"}, React.createElement("i", {class: "mdi-navigation-menu"}))
        
		  )
		);
	}	
});

// Initialize collapse button
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
$('.collapsible').collapsible();

React.render(
  React.createElement(SideBar, {systems: sys}),
  document.getElementById('serversNav')
);