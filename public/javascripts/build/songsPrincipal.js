var dropbox,current,currentModal;function showModal(e,t,o){(currentModal=$(e)).dialog({title:t,height:o||500,width:600,modal:!0})}function closeModal(e){$(e).dialog("close")}function VM(){var e=this;return e.files=ko.observableArray(),(e=sortableList(e,"files")).currentFile=ko.observable(),e.enableNew=ko.observable(!1),e.enableEdit=ko.observable(!1),e.enableLyrics=ko.observable(!1),e.enableChords=ko.observable(!1),e.selectedFile=function(t){e.enableEdit(!0),e.currentFile(t),showModal("#edit",e.currentFile().name())},e.goToList=function(){window.location.href="/list"},e.clearSelected=function(){currentModal.dialog("close"),e.enableEdit(!1),e.enableChords(!1),e.enableLyrics(!1),e.currentFile(void 0)},e.newItem=function(){e.currentFile(new Song({Name:"",Lyrics:"",Chords:""},e)),showModal("#new","new",600)},e.init=function(){e.files([]),get("/api/songs").done(function(t){AsyncFor(t,function(t){e.files.push(new Song(t,e))})})},e.init(),e}Song.prototype.getIcon=function(){return this.chords()?"fa fa-check text-success":"fa fa-exclamation-triangle text-warning"},Song.prototype.showLetra=function(){this.parent.currentFile(this),this.parent.enableLyrics(!0),showModal("#lyrics",this.name(),500)},Song.prototype.showNotas=function(){this.parent.currentFile(this),this.parent.enableChords(!0),showModal("#chords",this.name(),500)},Song.prototype.editSong=function(){this.parent.currentFile(this),this.parent.enableEdit(!0),showModal("#edit",this.name(),600)},Song.prototype.addToList=function(){postItem("/api/lists/current/AddSong",{id:this.id()}).done(function(e){alert("ingresado")})},Song.prototype.Save=function(){postItem("/api/songs",this.toItem()).done(function(e){$("#new").dialog("close")})},Song.prototype.Update=function(){updateItem("/api/songs",this.toItem()).done(function(e){$("#edit").dialog("close")})},Song.prototype.Cancel=function(){this.parent.clearSelected()},$(function(){ko.applyBindings(new VM)});