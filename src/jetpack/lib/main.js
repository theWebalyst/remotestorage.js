var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var ss = require("sdk/simple-storage");
 
var widget = widgets.Widget({
  id: "remotestorage-link",
  label: "remotestorage website",
  contentURL: "http://remotestorage.io/favicon.ico",
  onClick: function() {
    worker = tabs.activeTab.attach({
      contentScriptFile: self.data.url('in-page.js') 
    });
    ss.storage.color = 'red';
    worker.port.on('setItem', function(key, val) {
      ss.storage[key] = val;
    });
    worker.port.on('getItem', function(key, cb) {
      worker.port.emit('callback', cb, ss.storage[key]);
    });
    worker.port.emit('drawBorder', ss.storage.color);
  }
});
