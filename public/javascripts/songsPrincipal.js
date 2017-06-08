var dropbox,current,currentModal;
function showModal(id,title,height){
    currentModal=$(id);
    currentModal.dialog({
            title: title,
            height: height || 500,
            width: 600,
            modal: true,
        });
 }
function closeModal(id){
    $(id).dialog("close");
 }

Song.prototype.getIcon   = function(){
        if(this.chords())
            return 'fa fa-check text-success';
        else
            return 'fa fa-exclamation-triangle text-warning';
 };
Song.prototype.showLetra = function(){
        this.parent.currentFile(this);
        this.parent.enableLyrics(true);
        showModal("#lyrics",this.name(),500);
 };
Song.prototype.showNotas = function(){
        this.parent.currentFile(this);
        this.parent.enableChords(true);
        showModal("#chords",this.name(),500);
 };
Song.prototype.editSong  = function(){
        this.parent.currentFile(this);
        this.parent.enableEdit(true);
        showModal("#edit",this.name(),600);
 };
Song.prototype.Save      = function(){
        postItem('/api/songs',this.toItem()).done(function(data){
            //parent.init();
            $("#new").dialog( "close" );
        });
 };
Song.prototype.Update    = function(){
    updateItem('/api/songs',this.toItem()).done(function(data){
        //parent.init();
        $("#edit").dialog( "close" );
    });
 };
Song.prototype.Cancel    = function(){
    this.parent.clearSelected();
};

function VM(){
    var _self=this;
    _self.files        = ko.observableArray();
    _self              = sortableList(_self,'files');
    _self.currentFile  = ko.observable();
    _self.enableNew    = ko.observable(false);
    _self.enableEdit   = ko.observable(false);
    _self.enableLyrics = ko.observable(false);
    _self.enableChords = ko.observable(false);
    _self.selectedFile = function(song){
        _self.enableEdit(true);
        _self.currentFile(song);    
        showModal("#edit",_self.currentFile().name());
     }
    _self.goToList=function(){
        window.location.href="/list";
    }
    _self.clearSelected= function(){
        currentModal.dialog( "close" );
        _self.enableEdit  (false);
        _self.enableChords(false);
        _self.enableLyrics(false);
        _self.currentFile (undefined);
     }
    _self.newItem      = function(){
        _self.currentFile(new Song({Name:"",Lyrics:"",Chords:""},_self));
        showModal('#new','new',600);
     }
    _self.init         = function(){
        _self.files([]);
        get('/api/songs').done(function(data){
            AsyncFor(data,function(item){
                _self.files.push(new Song(item,_self));
            });
        });
     };

    
    _self.init();
    return _self;
}

$(function(){
    ko.applyBindings(new VM());
});
