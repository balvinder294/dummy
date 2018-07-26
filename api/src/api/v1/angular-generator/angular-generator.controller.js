const httpStatus = require('http-status');
const shellJs = require('shelljs');
const fs = require('fs');

/**
 * angularGenerator
 * @public
 */
exports.angularGenerator = async (req, res, next) => {
  res.status(httpStatus.OK);
  return res.json({
    responseCode: 200,
    responseMessage: 'OK',
    response: {}
  });
};

exports.angularCliVersionCheck = async (req,res, next) => {
  var angularCliVersion = shellJs.exec('ng -v');
  var whoAmI = shellJs.exec('whoami');
  var listFiles = shellJs.ls('-A','src');
  var changeDirectory = shellJs.cd('src'); 
//  var newDirectory = shellJs.mkdir('AngularApp');
  var listFiles2 = shellJs.ls();
  var listFiles3 = shellJs.ls('-A','AngularApp/')
  var chdirtoAngular = shellJs.cd('AngularApp')
  var presentDirectoryName = shellJs.exec('echo -n "$(basename $PWD)"');
  //var presentDirectoryCheck = shellJs.exec('basename $PWD');
  
  var isAngularDirectoryName = new Boolean(false);
  if (presentDirectoryCheck == 'AngularApp') {
    isAngularDirectory = true;
  } else {
    isAngularDirectory = false;
  }
  return res.json({
    userName: whoAmI,
    DirectoryChange: changeDirectory,
    Files: listFiles,
    FilesInSrc: listFiles2,
    FilesInAngularApp: listFiles3,
    PresentDirectory: presentDirectoryCheck,
    AngularDirectoryBoolean: isAngularDirectory,
    responseMessage: 'OK'
  });
};

exports.generateAngularCliApp = async (req,res, next) => {
  var requestBody = req.body;
  if ( typeof(requestBody.appName) == 'undefined' || requestBody.appName === null){
    return res.json({
      'Status': 'You must supply a name'
    });

  } else {
    var skipInstall = new Boolean();
    skipInstall = requestBody.skipInstall;
    var appName = requestBody.appName;
    var projectFolderExistOrNot = fs.existsSync('~/phloxdb/projects');
    if ( projectFolderExistOrNot) {
      shellJs.cd('~/phloxdb/projects');
    } else if ( !projectFolderExistOrNot) {
      shellJs.mkdir('~/phloxdb');
      shellJs.mkdir('~/phloxdb/projects');
      shellJs.cd('~/phloxdb/projects');
    }
    var presentDirectoryName = shellJs.exec('echo -n "$(basename $PWD)"');
    shellJs.echo('');
    var isProjectsDirectory = new Boolean(false);
    if (presentDirectoryName == 'projects') {
      isProjectsDirectory = true;
      var angularInstallDirectory = shellJs.pwd();
      if (skipInstall === 'true'){
          var createAngularCliApp = shellJs.exec(`ng new ${appName} --skip-install`,'true');
      } else if (skipInstall === 'false') {
          var createAngularCliApp = shellJs.exec(`ng new ${appName}`,'true');
      }
      var showOutputOfCli = createAngularCliApp.replace(RegExp("\n","g"), "<br>");
    } else {
      isProjectsDirectory = false;
    }
    return res.json({
      'SkipInstall': skipInstall,
      'angularProgress': showOutputOfCli,
      'responseMessage': 'OK, app was created',
      'AppName': appName,
      'directory': angularInstallDirectory
    });
  }
};

exports.checkPost = async (req,res, next) => {
  var requestBody = req.body;
  var name = req.body.appName;
  var work = req.body.work;
  var another = req.body.another;
  var echoName = shellJs.echo('-n',`${name}`);
  var listFileInHome = shellJs.ls('~');
  var version = shellJs.exec('ng -v','false');
  var angularVersion = version;
  var angularVersion = version.replace(RegExp("\n","g"), "<br>");
  return res.json({
    first: name,
    second: work,
    third: another,
    fourth: requestBody,
    ApppNAme: echoName,
    'angularCliVersion': angularVersion,
    status : 'OK'
  });
};