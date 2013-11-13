// "self" is a global object in content scripts
// Listen for a "drawBorder"
self.port.on("drawBorder", function(color) {
  document.body.style.border = "5px solid " + color;
});
