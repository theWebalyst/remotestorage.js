// "self" is a global object in content scripts
// Listen for a "drawBorder"
self.port.on("drawBorder", function(color) {
  document.body.style.border = "5px solid " + color;
  document.defaultView.postMessage("Message from content script", "http://example.com/");
  console.log('abcd');
});
self.port.on('callback', function(cb, key) {
   cb(key);
});
document.defaultView.addEventListener('message', function(event) {
  console.log(event.data);
  console.log(event.origin);
}, false);
/*{
  setItem: function(key, val) {
    self.port.emit('setItem', key, val);
  },
  getItem: function(key, cb) {
    self.port.emit('getItem', key, cb);
  }
};*/
