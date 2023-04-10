// plugins/pluginB.js

// Define the plugin module and its methods
const pluginB = {
    name: 'PluginB',
    
    init() {
      console.log(`${this.name} initialized`);
    }
  };
  
  // Export the plugin module
  module.exports = pluginB;
  