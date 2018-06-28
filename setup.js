const nunjucks = require("nunjucks");

function set_app (app) {
    nunjucks.configure("views", {
        autoescape: true,
        express: app,
        noCache: true
        });
      
}

exports.set_app = set_app;
exports.nunjucks = nunjucks;