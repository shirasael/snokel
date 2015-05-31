var Ajax = {
	loading: false,
	result: null,
	fetch: function() {
		loading = true;
		$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({systems: data});
        loading = false;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        loading = false;
      }.bind(this)
    });
	},
};