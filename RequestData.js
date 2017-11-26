define(['jquery'], function ($) {
    var callapi = function (url, callback) {
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          callback(data);
        }
      });
    }

    fetchData = function (url, callback){
      callapi(url, callback)
    }

    return {
      fetchData:fetchData
    };
  }
);
