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
        onResultFetched();
      }.bind(this),
      error: function(xhr, status, err) {
        loading = false;
        result = null;
        onError();
      }.bind(this)
    });
	},
};