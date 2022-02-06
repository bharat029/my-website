const fs = require("fs");

fs.copyFile('./dist/robots.txt', './dist/my-website/robots.txt', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully copied ./dist/robots.txt to ./dist/my-website/robots.txt.');
  }
});