const fsP = require('fs/promises')

const path = process.argv[2]

async function cat(path){
  //console.debug("cat")
  try{
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}


async function webCat(url){
  //console.debug("webCat")
  try{
    let contents = await fetch(url);
    let data = await contents.text();
    console.log(data);
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}


function isURL(path){
  //console.debug("isURL")
  try{
    new URL(path);
    webCat(path);
  }catch{
    cat(path);
  }
}

isURL(path);