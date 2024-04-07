"use strict";

module.exports = SystemLogger;

function SystemLogger(level, paramObj) {

  this.VERSION = '2023-12-15';
  
  //imports
  const util = require('util');
  const fs = paramObj.fs;

  //my imports
  const DataFormatter = require('./DataFormatter');
  const dataFormatter = new DataFormatter();
  const ChangeOutputFile = require('./ChangeOutputFile');
  const changeOutputFile = new ChangeOutputFile(paramObj);

  const DEBUG = 1;
  const INFO = 2;
  const WARN = 3;
  const ERROR = 4;
    
  const RED = "\x1B[0;31m";
  const GREEN = "\x1B[0;32m";
  const YELLOW = "\x1B[0;33m";
  const BLUE = "\x1B[0;34m";

  const DEFAULT = "\x1B[0;38m";
  
  var agora = null;
    
  let levelMap;
  let levelNumber;
  let colorMessage = true;
  
  const appendToFileCallback = function(err) {
    if (err != null) {
      console.error(`index.js - appendToFileCallback() ${err}`);
    }

  }
  
  this._warn = function() {
    
    let logString;
    agora = dataFormatter.getNow().toString();
    changeOutputFile.checkFile();
    // awsLogger.updateFile();

    if (WARN >= levelNumber) {
      if (arguments.length == 1) {
        logString = arguments[0];
      } else {
        logString = util.format.apply(util, arguments);
      }
      if (colorMessage == true) {
        fs.appendFile(1, `${YELLOW}${agora} [WARN] - ${DEFAULT}${logString}\n`, appendToFileCallback);
      } else {
        fs.appendFile(1, `${agora} [WARN] - ${logString}\n`, appendToFileCallback);
      }
      fs.appendFile(paramObj.logFile, `${agora} [WARN] - ${logString}\n`, appendToFileCallback);
    }
  }

  let warn = this._warn;
  this.warn = this._warn;
  
  const _init = function() {
    
    levelMap = new Object();

    levelMap['DEBUG'] = DEBUG;
    levelMap['INFO'] = INFO;
    levelMap['WARN'] = WARN;
    levelMap['ERROR'] = ERROR;
    
    levelNumber = levelMap[level];
    
    if (level == null) {      
      level = 'WARN';
      levelNumber = levelMap[level];
      warn('Level is not defined! Using "WARN".');
    }
    
  }

  _init();
  this.debug = function() {
    agora = dataFormatter.getNow().toString();
    
    let logString;
    
    if (DEBUG >= levelNumber) {
      if (arguments.length == 1) {
        logString = arguments[0];
      } else {
        logString = util.format.apply(util, arguments);
      }
      if (colorMessage == true) { 
        fs.appendFile(1, `${BLUE}${agora} [DEBUG] - ${DEFAULT}${logString}\n`, appendToFileCallback);
      } else {
        fs.appendFile(1, `${agora} [DEBUG] - ${logString}\n`, appendToFileCallback);
      }
      fs.appendFile(paramObj.logFile, `${agora} [DEBUG] - ${logString}\n`, appendToFileCallback);
    }
  }
  
  
  this.info = function() {
    agora = dataFormatter.getNow().toString();
    let logString;
    changeOutputFile.checkFile();
    // awsLogger.updateFile();

    if (INFO >= levelNumber) {
      if (arguments.length == 1) {
        logString = arguments[0];
      } else {
        logString = util.format.apply(util, arguments);
      }
      if (colorMessage == true) { 
        fs.appendFile(1, `${GREEN}${agora} [INFO] - ${DEFAULT}${logString}\n`, appendToFileCallback);
      } else {
        fs.appendFile(1, `${agora} [INFO] - ${logString}\n`, appendToFileCallback);
      }
      fs.appendFile(paramObj.logFile, `${agora} [INFO] - ${logString}\n`, appendToFileCallback);
    }
  }
  
  
  this.error = function() {
    agora = dataFormatter.getNow().toString();
    let logString;
    changeOutputFile.checkFile();
    // awsLogger.updateFile();

    if (ERROR >= levelNumber) {
      if (arguments.length == 1) {
        logString = arguments[0];
      } else {
        logString = util.format.apply(util, arguments);
      }
      if (colorMessage == true) {
        fs.appendFile(1, `${RED}${agora} [ERROR] - ${DEFAULT}${logString}\n`, appendToFileCallback);
      } else {
        fs.appendFile(1, `${agora} [ERROR] - ${logString}\n`, appendToFileCallback); 
      }
      fs.appendFile(paramObj.logFile, `${agora} [ERROR] - ${logString}\n`, appendToFileCallback);
    }
  }
  
  
  const _setLevel = function(levelParam) {
    if (levelParam == null) {
      level = 'INFO';
    }
    level = levelParam;
    levelNumber = levelMap[level];
  }
  this.setLevel = _setLevel;

  this.getLevel = function() {
    return level;
  }  
  
  this.getMyConsole = function() {
    return myConsole;
  }
  
  this.setColorMessage = function(colorMessageParam) {
    colorMessage = colorMessageParam;
  }
  
}