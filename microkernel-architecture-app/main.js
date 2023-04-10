// main.js

// Load the core and plugin modules
const core = require('./core');
const pluginA = require('./plugins/pluginA');
const pluginB = require('./plugins/pluginB');

// Initialize the core module and register the plugins
core.init();
core.registerPlugin(pluginA);
core.registerPlugin(pluginB);
core.start();
