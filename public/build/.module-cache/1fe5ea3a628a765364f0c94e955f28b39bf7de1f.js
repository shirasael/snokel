var SystemCard = React.createClass({displayName: "SystemCard",
    render: function () {
        var sysUrl = "/system/" + this.props.sysName;
        var confs = this.props.configs.map(function (cfg, index) {
            return (
                React.createElement("li", {className: "collection-item", key: index}, React.createElement("div", null, cfg, React.createElement("a", {href: sysUrl + "/" + cfg, className: "secondary-content"}, React.createElement("i", {className: "mdi-content-send"}))))
            );
        });
        return (
        	React.createElement("div", {className: "col s4 m7"}, 
		          React.createElement("div", {className: "card"}, 
		            React.createElement("div", {className: "card-image waves-effect waves-block waves-light"}, 
		              React.createElement("img", {className: "activator", src: this.props.sysImg})
		            ), 
		            React.createElement("div", {className: "card-content"}, 
		              React.createElement("span", {className: "card-title activator grey-text text-darken-4"}, this.props.sysName, React.createElement("i", {className: "mdi-navigation-more-vert right"}))
		            ), 
		            React.createElement("div", {className: "card-reveal"}, 
		              React.createElement("span", {className: "card-title grey-text text-darken-4"}, this.props.sysName, React.createElement("i", {className: "mdi-navigation-close right"})), 
		              React.createElement("p", null, "Here is some more information about this product that is only revealed once clicked on.")
		            )
		          )
          )
        );
    }
});

var SystemsList = React.createClass({displayName: "SystemsList",
    getInitialState: function () {
        return {systems: []};
    },
    componentDidMount: function () {
        this.fetchSystems();
    },
    fetchSystems: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({systems: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    renderSystems: function () {
        return this.state.systems.map(function (sys, index) {
            return (
                React.createElement(SystemCard, {sysName: sys.name, key: index, configs: sys.configs, sysImg: "images/gear.jpg"})
            );
        });
    },
    render: function () {
      return (
          React.createElement("div", {className: "row"}, 
              this.renderSystems()
          )
      );

    }
});

