var SystemFront = React.createClass({displayName: "SystemFront",
    render: function () {
        var style = {backgroundColor: this.props.color};
        return (
            React.createElement("figure", {className: "systemCardFront", style: style}, 
                React.createElement("img", {src: this.props.imgSrc}), 

                React.createElement("h1", null, this.props.sysName)
            )
        );
    }
});

var SystemBack = React.createClass({displayName: "SystemBack",
    renderConfigs: function () {
        var sysUrl = "/system/" + this.props.sysName;
        return this.props.configs.map(function (cfg, index) {
            return (
                React.createElement("a", {className: "cfgLink", key: index, href: sysUrl + "/" + cfg}, cfg)
            );
        });
    },
    render: function () {
        var style = {backgroundColor: this.props.color};
        return (
            React.createElement("figure", {className: "systemCardBack", style: style}, 
                this.renderConfigs()
            )
        );
    }
});

var SystemCard = React.createClass({displayName: "SystemCard",
    getInitialState: function () {
        return {flipped: false, colors: getRandomColors()};
    },
    flip: function () {
        this.setState({flipped: !this.state.flipped, colors: colors});
    },
    getClassName: function () {
        return "card" + (this.state.flipped ? " flipped" : "");
    },
    render: function () {
        var sysUrl = "/system/" + this.props.sysName;
        var confs = this.props.configs.map(function (cfg, index) {
            return (
                React.createElement("li", {className: "collection-item", key: index}, React.createElement("div", null, cfg, React.createElement("a", {href: sysUrl + "/" + cfg, className: "secondary-content"}, React.createElement("i", {className: "mdi-content-send"}))))
            );
        });
        return (
            React.createElement("div", {className: "card small"}, 
                React.createElement("div", {className: "card-content"}, 
                    React.createElement("span", {className: "card-title activator grey-text text-darken-4"}, this.props.sysName, React.createElement("i", {className: "mdi-navigation-more-vert right"})), 
                    React.createElement("p", null, React.createElement("a", {href: "#"}, "This is a link"))
                ), 
                React.createElement("div", {className: "card-reveal"}, 
                    React.createElement("span", {className: "card-title grey-text text-darken-4"}, this.props.sysName, React.createElement("i", {className: "mdi-navigation-close right"})), 
                    React.createElement("ul", {className: "collection"}, 
                        confs
                    )
                )
            )
        );
        //return (
        //    <div className="container" onClick={this.flip}>
        //        <div className={this.getClassName()}>
        //            <SystemFront color={this.state.colors[0]} sysName={this.props.sysName} imgSrc={this.props.sysImg}/>
        //            <SystemBack color={this.state.colors[1]} configs={this.props.configs} sysName={this.props.sysName}/>
        //        </div>
        //    </div>
        //);
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
                React.createElement(SystemCard, {sysName: sys.name, key: index, configs: sys.configs})
            );
        });
    },
    render: function () {
        return (
            React.createElement("div", null, 
                this.renderSystems()
            )
        );

    }
});

