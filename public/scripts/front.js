var SystemCard = React.createClass({
    render: function () {
        var sysUrl = "/system/" + this.props.sysName;
        var confs = this.props.configs.map(function (cfg, index) {
            return (
                <li className="collection-item" key={index}><div>{cfg}<a href={sysUrl + "/" + cfg} className="secondary-content"><i className="mdi-action-settings"></i></a></div></li>
            );
        });
        return (
        	<div className="col s4">
	          <div className="card small">
	            <div className="card-image waves-effect waves-block waves-light">
	              <img className="activator" src={this.props.sysImg} />
	            </div>
	            <div className="card-content">
	              <span className="card-title activator grey-text text-darken-4">{this.props.sysName}
	              	<i className="mdi-navigation-more-vert right"></i>
	              </span>
	            </div>
	            <div className="card-reveal">
	              <span className="card-title grey-text text-darken-4">{this.props.sysName}<i className="mdi-navigation-close right"></i></span>
	              <ul className="collection">
	              	{confs}
	              </ul>
	            </div>
	          </div>
          </div>
        );
    }
});

var SystemsList = React.createClass({
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
                <SystemCard sysName={sys.name} key={index} configs={sys.configs} sysImg='images/gear.jpg'/>
            );
        });
    },
    render: function () {
      return (
          <div className="row">
            {this.renderSystems()}
          </div>
      );

    }
});

