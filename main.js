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
const sample = path.join(__dirname, "unzipped", "in.png");

// IOhandler.unzip(zipFilePath, pathUnzipped)
// IOhandler.readDir(pathUnzipped)
//     .then((pngPaths) => {
//         for (const img of pngPaths) {
//             IOhandler.grayScale(img)}          
//         })
IOhandler.grayScale(sample, pathProcessed)
    .catch( (err) => { console.log(err) })
// console.log(sample)