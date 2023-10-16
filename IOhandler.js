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
const { pipeline, Transform } = require("stream");
const AdmZip = require("adm-zip");

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
    zip.extractAllTo(pathOut, true);
    console.log("Extraction operation completed");
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
    pngArray = [];
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
          for (const file of files){
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

            // invert color
            this.data[idx] = 255 - this.data[idx];
            this.data[idx + 1] = 255 - this.data[idx + 1];
            this.data[idx + 2] = 255 - this.data[idx + 2];

            // and reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }

        this.pack().pipe(fs.createWriteStream(path.join(pathOut, "processed.png")));
      })
      .on("err", (err) => {reject(`Error: ${err}`)})
      .on('end', () => {resolve("Done!")})
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
