var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
 
var widget = widgets.Widget({
  id: "remotestorage-link",
  label: "remotestorage website",
  contentURL: "http://remotestorage.io/favicon.ico",
  onClick: function() {
    tabs.activeTab.attach({
      contentScriptFile: self.data.url('in-page.js') 
    })
  }
});
