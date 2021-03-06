/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';
  var destFile = path.join('app/scripts/layouts', this.name + ext);
  this.isRequireJsApp = this.isUsingRequireJS();

  if (!this.isRequireJsApp) {
    this.template('layout' + ext, destFile);
    this.addScriptToIndexGroup('layouts/' + this.name, 'layouts');
    return;
  }

  // TODO Implement requireJS support
};
