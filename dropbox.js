var Dropbox = require('dropbox');
var dropboxApi = new Dropbox({ accessToken: 'rQbx2WVaCCMAAAAAAAACM1737RJ_TBS3FWn65a9YzGq39MDNqUffbxyk_kgmBBQW' });

function getFiles(path)
{
    var deferred=$.Deferred();
    setTimeout(function(){
        dropbox.filesListFolder({path: path})
        .then(function(response) {
            var q=processRequest(response);
            deferred.resolve(q);
        })
        .catch(function(error) {
            deferred.reject(arguments);
        });
    },250);
    return deferred.promise();
}

dropbox.filesListFolder({path: '/Aplicaciones/Demo-db-api/'})
  .then(function(response) {
      debugger;
    console.log(response);
  })
  .catch(function(error) {
      debugger;
    console.log(error);
  });


  module.exports=dropboxApi;