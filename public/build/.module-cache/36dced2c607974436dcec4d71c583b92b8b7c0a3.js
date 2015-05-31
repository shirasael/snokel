var converter = new Showdown.converter();

var Markable = React.createClass({displayName: "Markable",
	render: function() {
		var markableClass = 'markable' + this.props.marked ? ' marked' : '';
		return (
			React.createElement("div", {className: "markable"}, 
				this.props.children.toString()
			)
		);
	}
});

var TextArea = React.createClass({displayName: "TextArea",
  loadTextFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({textContent: data.textContent, textTitle: data.textTitle});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {textContent: "", textTitle: ""};
  },
  componentDidMount: function() {
    this.loadTextFromServer();
  },
  getMarkables: function() {
  	var words = this.props.children.toString().split
  	
  },
  render: function() {
    return (
      React.createElement("div", {className: "mainText"}, 
        React.createElement("h1", {className: "textTitle"}, this.state.textTitle), 
        React.createElement("span", {className: "textContent"}, this.state.textContent)
      )
    );
  }
});