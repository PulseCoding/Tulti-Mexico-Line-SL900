var Service = require('node-windows').Service


var svc = new Service({
  name:'PULSE SL900 SERVICE',
  description: 'Control of the PULSE code',
  script: __dirname + '\\mex_tulti_Line_SL900.js',
  env: {
    name: "HOME",
    value: process.env["USERPROFILE"]
  }
})

svc.on('uninstall',function(){
  console.log('Uninstall complete.')
  console.log('The service exists: ',svc.exists)
})

svc.uninstall()
