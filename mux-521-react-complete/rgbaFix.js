const fs = require('fs');
const path = require('path');

// Function to convert hex to RGBA to fix issue in Crestron panels.
function hexToRGBA(hex) {
  let r = 0, g = 0, b = 0, a = 1;

  // 3 digits #FFF is really #FFFFFF
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  // 4 digits #FFFF is really #FFFFFFFF
  else if (hex.length === 5) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
    a = parseInt(hex[4] + hex[4], 16) / 255;
  }
  // 6 digits #FFFFFF
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  // 8 digits #FFFFFFFF
  else if (hex.length === 9) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
    a = parseInt(hex[7] + hex[8], 16) / 255;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Function to replace hex colors in CSS with RGBA
function replaceHexWithRGBA(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Regular expression to match hex color values
    const regex = /#([0-9a-f]{3,4}){1,2}\b/gi;
    let modifiedData = data.replace(regex, (match) => hexToRGBA(match));

    // Write the modified CSS back to the file
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Updated hex colors to RGBA in ${filePath}`);
      }
    });
  });
}

// Custom function to recursively find all files with a given extension
function getAllFilesWithExtension(dirPath, ext, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFilesWithExtension(filePath, ext, arrayOfFiles);
    } else if (path.extname(file) === ext) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Using the custom function to get all CSS files
const cssFiles = getAllFilesWithExtension('./build/static/css', '.css');

cssFiles.forEach((file) => {
  replaceHexWithRGBA(file);
});
