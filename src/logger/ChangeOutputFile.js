'use strict';

module.exports = ChangeOutputFile;

function ChangeOutputFile(paramObj) {
  this.VERSION = '2023-04-17';

  const fs = paramObj.fs;

  fs.writeFileSync('./logs/log_file.log', '');
  fs.writeFileSync('./logs/log_file_bk.log', '');

  this.checkFile = function () {
    let bkpFile = './logs/log_file_bk.log';

    let stats = fs.statSync('./logs/log_file.log');

    let fileSizeInBytes = stats.size;

    if (fileSizeInBytes >= paramObj.conf.log.maxSize) {
      //clean the old bkp file;
      fs.unlink(bkpFile, (err) => {
        fs.rename(paramObj.logFile, './logs/log_file_bk.log', (err) => {
          fs.writeFile('./logs/log_file.log', '', (err) => {
            return paramObj.logFile;
          });
        });
      });

      return paramObj.logFile;
    }

    return paramObj.logFile;
  };
}
