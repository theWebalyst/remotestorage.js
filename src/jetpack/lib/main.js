var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
 
var widget = widgets.Widget({
  id: "remotestorage-link",
  label: "remotestorage website",
  contentURL: "http://remotestorage.io/favicon.ico",
  onClick: function() {
    tabs.open("http://remotestorage.io/");
  }
});
