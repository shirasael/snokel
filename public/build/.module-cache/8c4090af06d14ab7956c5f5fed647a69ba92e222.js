var Ajax = {
	loading: false,
	result: null,
	fetch: function(onResultFetched, onError) {
		loading = true;
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        loading = false;
        result = data;
        onResultFetched(result);
      }.bind(this),
      error: function(xhr, status, err) {
        loading = false;
        result = null;
        onError(xhr, status, err);
      }.bind(this)
    });
	}
};

var MaterialButton = React.createClass({displayName: "MaterialButton",
  render: function() {
    var icon = null;
    if (this.props.icon) {
      var iconClassname = this.props.icon + (this.props.right ? " right" : " left");
      icon = React.createElement("i", {className: iconClassname});
    }
    var lable = this.props.lable;
    if (!lable) {
      lable = this.props.children;
    }
    return (
      React.createElement("a", {className: "waves-effect waves-light btn", onClick: this.props.onClick}, icon, lable)
    );
  }
});

var NavBar = React.createClass({displayName: "NavBar",
  render: function() {
    return (
      React.createElement("div", {className: "navbar-fixed"}, 
        React.createElement("nav", null, 
          React.createElement("div", {className: "nav-wrapper"}, 
            React.createElement("ul", {className: "left hide-on-med-and-down"}, 
              React.createElement("li", {style: {display: this.props.backArrow ? "" : "none"}}, React.createElement("a", {href: this.props.backRef}, React.createElement("i", {className: "mdi-navigation-arrow-back"})))
            ), 
            React.createElement("a", {href: "/", className: "brand-logo"}, "Snorkel"), 
            React.createElement("ul", {id: "nav-mobile", className: "right hide-on-med-and-down"}, 
              this.props.buttons
            )
          )
        )
      )
    );
  }
});


var Tabs = React.createClass({displayName: "Tabs",
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col s6"}, 
          React.createElement("ul", {className: "tabs"}, 
            React.createElement("li", {className: "tab col s3"}, React.createElement("a", {className: "active", href: "#editor"}, "Costume Editor")), 
            React.createElement("li", {className: "tab col s3"}, React.createElement("a", {href: "#raw"}, "Raw Editor"))
          )
        ), 
        React.createElement("div", {id: "editor", className: "col s12"}, this.props.editor), 
        React.createElement("div", {id: "raw", className: "col s12"}, this.props.raw)
      )
    );
  }
});


var Layout = React.createClass({displayName: "Layout",
  render: function() {
    return (
      React.createElement("div", {className: "mainLayout"}, 
        React.createElement(NavBar, {backArrow: this.props.navBackArrow, backRef: this.props.navBackRef, buttons: this.props.navbarButtons}), 
        React.createElement("br", null), 
        React.createElement("br", null), 
        React.createElement("div", {className: "container"}, 
          this.props.children
        )
      )
    );
  }
});
