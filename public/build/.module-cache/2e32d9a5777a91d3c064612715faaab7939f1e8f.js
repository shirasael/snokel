var converter = new Showdown.converter();

var Markable = React.createClass({displayName: "Markable",
	render: function() {
		var markableClass = 'markable' + this.props.marked ? ' marked' : '';
		var rawMarkup = this.props.children.toString();
		return (
			React.createElement("div", {className: "markable"}, 
        		React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
			)
		);
	}
});

var TextArea = React.createClass({displayName: "TextArea",
  getMarkables: function() {
  	var words = converter.makeHtml(this.props.children.toString()).split(" ");
  	
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