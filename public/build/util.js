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

var DialogAction = React.createClass({displayName: "DialogAction",
  render: function() {
    var closeClass = this.props.cancel ? " modal-close" : "";
    var wavesColor = " waves-" + (this.props.wavesColor ? this.props.wavesColor : "green");
    return (
      React.createElement("a", {onClick: this.props.onAction, className: "modal-action waves-effect btn-flat" + closeClass + wavesColor}, 
        this.props.children
      )
    );
  }
});

var Dialog = React.createClass({displayName: "Dialog",
  getInitialState: function() {
    return {content: this.props.children};
  },
  open: function() {
    $('#' + this.props.modalId).openModal();
  },
  close: function() {
    $('#' + this.props.modalId).closeModal();
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {id: this.props.modalId, className: "modal modal-fixed-footer"}, 
          React.createElement("div", {className: "modal-content"}, 
            this.props.children
          ), 
          React.createElement("div", {className: "modal-footer"}, 
            this.props.actions
          )
        )
      )
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
    var tabs = this.props.tabs.map((function (tab, index) {
            var tabID = String(tab.title).replace(new RegExp(' ', 'g'), '_') + String(index);
            return (React.createElement("li", {className: "tab col s2", key: "t" + index}, React.createElement("a", {href: "#" + tabID}, tab.title)));
        }));
    var pages = this.props.tabs.map((function (tab, index) {
            var tabID = String(tab.title).replace(new RegExp(' ', 'g'), '_') + String(index);
            return (React.createElement("div", {id: tabID, className: "col s12", key: "p" + index}, tab.content));
        }));

    var colSize = this.props.tabs.length * 2;
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col s" + colSize}, 
          React.createElement("ul", {className: "tabs"}, 
            tabs
          )
        ), 
        React.createElement("br", null), 
        React.createElement("br", null), 
        pages
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

function getRandomColors() {
  colors = [["orange", "blue"], ["green", "red"], ["yellow", "purple"]];
  return colors[Math.floor(Math.random() * (colors.length - 1) + 0.5)];
};

function isJSON(data) {
  try {
    JSON.parse(data);
    return true;
  } catch(e) {
    return false;
  }
};

