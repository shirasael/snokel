var Ajax = React.createClass({displayName: "Ajax",
	getInitialState: function() {
		return {loading: false, result: null};
	},
	render: function() {
		var style = {visibility: 'hidden', width: '0px', height: '0px'};
		return (
			React.createElement("div", {style: style})
		);
	}
});