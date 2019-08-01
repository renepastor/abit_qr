const { exec } = require('child_process');

console.log("BD Administracion......");
var inv =["ambientes",
  "dispositivos",
  "user_dispositivos"];
inv.map(r=>{
  exec(`node crud.js ${r}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`tabla: ${r}`);
  });
});
