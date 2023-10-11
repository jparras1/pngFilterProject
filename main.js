const path = require("path");

/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: Oct 11, 2023
 * Author: Jonathan Parras
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped)
    .then( (data) => { console.log(data) })
    .then( () => {IOhandler.readDir(pathUnzipped)})
    .catch( (err) => { console.log(err) } )