"use strict";

const fsP = require('fs/promises')

// const path = process.argv[2]

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


async function catWrite(path, filename) {
  try{
    let contents = await fsP.readFile(path, "utf8");
    await fsP.writeFile(filename, contents, "utf8");
    console.log(`no output, but ${filename} contains contents of ${path}`);
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

async function webCatWrite(url, filename){
  //console.debug("webCat")
  try{
    let contents = await fetch(url);
    let data = await contents.text();
    await fsP.writeFile(filename, data, "utf8");
    console.log(`no output, but ${filename} contains contents of ${url}`);
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

//handleCat

  //will check to see if "--out" is at process.argv.[2]
  //if so
    //pathRead = process.argv[4]
    //pathWrite = process.argv[3]
    //write to new file
  //if not
    //path = process.argv[2]
    //isUrl


const args = process.argv

function handleCat() {

  if (args[2] === '--out') {
    pathRead = process.argv[4];
    pathWrite = process.argv[3];


  } else {
    const path = process.argv[2];
    isURL(path);
  }

}

catWrite(process.argv[4], process.argv[3])