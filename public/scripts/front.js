var SystemFront = React.createClass({
	render: function() {
		var style = {backgroundColor: this.props.color};
		return (
			<figure className="systemCardFront" style={style}>
				<img src={this.props.imgSrc}></img>
				<h1>{this.props.sysName}</h1>
			</figure>
		);
	}
});

var SystemBack = React.createClass({
	renderConfigs: function() {
		sysUrl = "/system/" + this.props.sysName;
		return this.props.configs.map(function(cfg, index) {
			return (
				<a className="cfgLink" key={index} href={sysUrl + "/" + cfg}>{cfg}</a>
			);
		});
	},
	render: function() {
		var style = {backgroundColor: this.props.color};
		return (
			<figure className="systemCardBack" style={style}>
				{this.renderConfigs()}
			</figure>
		);
	}
});

var SystemCard = React.createClass({
	getInitialState: function() {
		return {flipped: false, colors: getRandomColors()};
	},
	flip: function() {
  	this.setState({flipped : !this.state.flipped, colors: colors});
	},
	getClassName: function() {
		return "card" + (this.state.flipped ? " flipped" : "");
	},
	render: function() {
		return (
			<div className="container" onClick={this.flip}>
		    <div className={this.getClassName()}>
		      <SystemFront color={this.state.colors[0]} sysName={this.props.sysName} imgSrc={this.props.sysImg} />
		      <SystemBack color={this.state.colors[1]} configs={this.props.configs} sysName={this.props.sysName} />
		    </div>
		  </div>
		);
	}
});

var SystemsList = React.createClass({
	getInitialState: function() {
		return {systems: []};
	},
	componentDidMount: function() {
		this.fetchSystems();
	},
	fetchSystems: function() {
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({systems: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	renderSystems: function() {
		return this.state.systems.map(function (sys, index) {
			return (
				<SystemCard sysName={sys.name} key={index} configs={sys.configs}/>
			);
		});
	},
	render: function() {
		return (
			<div>
				{this.renderSystems()}
			</div>
		);

	}
});

