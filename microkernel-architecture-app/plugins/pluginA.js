// plugins/pluginA.js

// Define the plugin module and its methods
const pluginA = {
    name: 'PluginA',
    
    init() {
      console.log(`${this.name} initialized`);
    }
  };
  
  // Export the plugin module
  module.exports = pluginA;
  