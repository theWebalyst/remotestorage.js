(function() {

  function extractParams() {
    //FF already decodes the URL fragment in document.location.hash, so use this instead:
    var hashPos = document.location.href.indexOf('#');
    if(hashPos == -1) return;
    var hash = document.location.href.substring(hashPos+1);
    return hash.split('&').reduce(function(m, kvs) {
      var kv = kvs.split('=');
      m[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      return m;
    }, {});
  };

  RemoteStorage.Authorize = function(authURL, storageApi, scopes, redirectUri) {
    RemoteStorage.log('Authorize authURL = ',authURL)
    var scope = [];
    for(var key in scopes) {
      var mode = scopes[key];
      if(key == 'root') {
        if(! storageApi.match(/^draft-dejong-remotestorage-/)) {
          key = '';
        }
      }
      scope.push(key + ':' + mode);
    }
    scope = scope.join(' ');

    var clientId = redirectUri.match(/^(https?:\/\/[^\/]+)/)[0];

    var url = authURL;
    url += authURL.indexOf('?') > 0 ? '&' : '?';
    url += 'redirect_uri=' + encodeURIComponent(redirectUri.replace(/#.*$/, ''));
    url += '&scope=' + encodeURIComponent(scope);
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&response_type=token';
    document.location = url;
  };

  RemoteStorage.prototype.authorize = function(authURL) {
    RemoteStorage.Authorize(authURL, this.remote.storageApi, this.access.scopeModeMap, String(document.location));
  };

  RemoteStorage.Authorize._rs_supported = function(remoteStorage) {
    return typeof(document) != 'undefined';
  };

  RemoteStorage.Authorize._rs_init = function(remoteStorage) {
    var params = extractParams();
    if(params) {
      document.location.hash = '';
    }
    remoteStorage.on('features-loaded', function() {
      if(params) {
        if(params.access_token) {
          remoteStorage.remote.configure(undefined, undefined, undefined, params.access_token);
        }
        if(params.remotestorage) {
          remoteStorage.connect(params.remotestorage);
        }
        if(params.error) {
          throw "Authorization server errored: " + params.error;
        }
      }
    });
  }

})();
