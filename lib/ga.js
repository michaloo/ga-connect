var fs     = require("fs");
var path   = require('path');
var harmon = require("harmon");

function ga(options) {

  console.log(options);
  if (typeof options === 'string') {
    options = {
      trackingId: options
    };
  }

  if (typeof options.template !== 'string') {
    options.template = fs.readFileSync(path.resolve(__dirname, 'ga.html'))
      .toString();
  }

  var data = options.template.replace("{{trackingId}}", options.trackingId);


  var selects = [];
  var ga_select = {
    query: 'body',
    func: function ga_select_func(node) {
      var read = node.createReadStream();
      var write = node.createWriteStream();

      write.write(data);
      read.pipe(write);
    }
  };

  selects.push(ga_select);


  return harmon([], selects, true);

}

module.exports = ga;
