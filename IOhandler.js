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

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise( (resolve, reject) => {
    pipeline(
      fs.createReadStream(pathIn),
      unzipper.Extract({path: pathOut}),

      function onEnd(err) {
        if (err) {
          reject(`Error: ${err}`);
        } else {
          resolve("Extraction complete.");
        }
      },
    );
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
    pngPaths = [];
    fs.readdir(dir, (err, files) => {
      if (err) {
        if (err.code === "ENOENT") {
          reject("Directory does not exist")
        }
      } else {
        for (const file of files){
          if (path.extname === ".png") {
            pngPaths.push(file);
          }
        }
        resolve(pngPaths);
      }
    })
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
