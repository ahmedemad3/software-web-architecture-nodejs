// core.js

// Define the core module and its methods
const core = {
    plugins: [],
    
    init() {
      console.log('Core module initialized');
    },
    
    registerPlugin(plugin) {
      console.log(`Plugin ${plugin.name} registered`);
      this.plugins.push(plugin);
    },
    
    start() {
      console.log('Starting core module...');
      this.plugins.forEach(plugin => {
        plugin.init();
      });
    }
  };
  
  // Export the core module
  module.exports = core;
  