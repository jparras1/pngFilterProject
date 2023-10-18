/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 11, 2023
 * Author: Jonathan Parras
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");
const AdmZip = require("adm-zip");
const {pipeline} = require("stream");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise( (resolve, reject) => {
    const zip = new AdmZip(pathIn);
    zip.extractAllToAsync(pathOut, true, (err) => {
      if (err) {
        reject(err);
      } else {
        // output a message when the extraction is successful
        resolve("Extraction operation completed");
      }
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise( (resolve, reject) => {
    // create an array to store the png paths
    const pngArray = [];
    fs.readdir(dir, (err, files) => {
      if (err) {
        if (err.code === "ENOENT") {
          reject("Directory not found.");
        }
        reject(err);
      }
      else {
        for (const file of files){
          // check if the file is a '.png'
          if (path.extname(file) === ".png") {
            pngArray.push(path.join(dir, file));
          }
        }
        resolve(pngArray);
      }
    });
  });
}      

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise( (resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(new PNG({ filterType: 4, }))
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            // grayscale algorithm
            const gray = (this.data[idx] * 0.3) + (this.data[idx + 1] * 0.59) + (this.data[idx + 2] * 0.11)
            // convert to grayscale
            this.data[idx] = gray
            this.data[idx + 1] = gray
            this.data[idx + 2] = gray

            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }
        procImage = `${path.basename(pathIn, '.png')}_processed.png`;
        this.pack().pipe(fs.createWriteStream(path.join(pathOut, procImage)));
        resolve();
      })
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
