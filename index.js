var through = require("through2");

function hexPad(s) {
  for(var i = 8 - s.length; i > 0; i--) s = "0" + s;
  return s;
}

module.exports = function(offset) {
  if(typeof offset === "string") {
    offset = parseInt(offset, 16);
  }
  var data = "";

  var tr = through(function(chunk) {
    data += chunk.toString();
    var parts = data.split("\n");
    data = parts.pop();

    var push = this.push.bind(this);

    parts.forEach(function(part) {
      var m = part.match(/(......): (.*)/);
      var addr = eval("0x" + m[1]) + offset;
      push(hexPad(addr.toString(16)) + ": " + m[2] + "\n");
    });
  });

  return tr;
}
