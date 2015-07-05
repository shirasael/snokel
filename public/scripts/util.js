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

var DialogAction = React.createClass({
  render: function() {
    var closeClass = this.props.cancel ? " modal-close" : "";
    var wavesColor = " waves-" + (this.props.wavesColor ? this.props.wavesColor : "green");
    return (
      <a onClick={this.props.onAction} className={"modal-action waves-effect btn-flat" + closeClass + wavesColor}>
        {this.props.children}
      </a>
    );
  }
});

var Dialog = React.createClass({
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
      <div>
        <div id={this.props.modalId} className="modal modal-fixed-footer">
          <div className="modal-content">
            {this.props.children}
          </div>
          <div className="modal-footer">
            {this.props.actions}
          </div>
        </div>
      </div>
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
    var tabs = this.props.tabs.map((function (tab, index) {
            var tabID = String(tab.title).replace(new RegExp(' ', 'g'), '_') + String(index);
            return (<li className="tab col s2" key={"t" + index}><a href={"#" + tabID}>{tab.title}</a></li>);
        }));
    var pages = this.props.tabs.map((function (tab, index) {
            var tabID = String(tab.title).replace(new RegExp(' ', 'g'), '_') + String(index);
            return (<div id={tabID} className="col s12" key={"p" + index}>{tab.content}</div>);
        }));

    var colSize = this.props.tabs.length * 2;
    return (
      <div className="row">
        <div className={"col s" + colSize}>
          <ul className="tabs">
            {tabs}
          </ul>
        </div>
        <br/>
        <br/>
        {pages}
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

