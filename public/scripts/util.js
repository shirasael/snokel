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

var MaterialButton = React.createClass({
  render: function() {
    var icon = null;
    if (this.props.icon) {
      var iconClassname = this.props.icon + (this.props.right ? " right" : " left");
      icon = <i className={iconClassname}></i>;
    }
    var lable = this.props.lable;
    if (!lable) {
      lable = this.props.children;
    }
    return (
      <a className="waves-effect waves-light btn" onClick={this.props.onClick}>{icon}{lable}</a>
    );
  }
});

var NavBar = React.createClass({
  render: function() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <ul className="left hide-on-med-and-down">
              <li style={{display: this.props.backArrow ? "" : "none"}}><a href={this.props.backRef}><i className="mdi-navigation-arrow-back"></i></a></li>
            </ul>
            <a href="/" className="brand-logo">Snorkel</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.props.buttons}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});


var Tabs = React.createClass({
  render: function() {
    var rawTab = null;
    if (this.props.raw != null) {
      rawTab = {tab: <li className="tab col s2"><a href="#raw">Raw Editor</a></li>,
                    page: <div id="raw" className="col s12">{this.props.raw}</div>};
    }
    var costumeTab = null;
    if (this.props.raw != null) {
      costumeTab = {tab: <li className="tab col s2"><a className="active" href="#costume">Costume Editor</a></li>,
                    page: <div id="costume" className="col s12">{this.props.costume}</div>};
    }
    return (
      <div className="row">
        <div className="col s4">
          <ul className="tabs">
            {costumeTab.tab}
            {rawTab.tab}
          </ul>
        </div>
        <br/>
        <br/>
        {costumeTab.page}
        {rawTab.page}
      </div>
    );
  }
});


var Layout = React.createClass({
  render: function() {
    return (
      <div className="mainLayout">
        <NavBar backArrow={this.props.navBackArrow} backRef={this.props.navBackRef} buttons={this.props.navbarButtons}></NavBar>
        <br/>
        <br/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
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

