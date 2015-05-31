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
        loading = false;
        result = data;
      }.bind(this),
      error: function(xhr, status, err) {
        loading = false;
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
};