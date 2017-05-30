function get(url){
    return $.getJSON(url);
 }

function postItem(url,item){
    return $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: item,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json;odata=verbose"
        }
    });
 }
function updateItem(url,item){
    return $.ajax({
        url: url,
        type: "PUT",
        contentType: "application/json;odata=verbose",
        data: item,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Accept": "application/json;odata=verbose"
        }
    });
  };

function AsyncFor(items,exec,init){
    var dfd = jQuery.Deferred();
    setTimeout(function(){
        var result=undefined;
        for(var i=init||0,length=items.length;i<length;i++)
        {
            result=exec(items[i],i);
        }
        dfd.resolve(result);
    },0);
     
     return dfd.promise();
 };
function Song(item,parent){
    var _self=this;
    _self.parent =parent;
    _self.id     = ko.observable();
    _self.name   = ko.observable();
    _self.lyrics = ko.observable();
    _self.chords = ko.observable();
    _self.tipo   = ko.observable();
    function setData(val){
        _self.id(val["_id"]);
        _self.name(val.Name);
        _self.lyrics(val.Lyrics);
        _self.chords(val.Chords);
        _self.tipo(val.Type)
     }
    setData(item);
    _self.toItem   =function(){
        var obj={
            lyrics:_self.lyrics(),
            chords:_self.chords(),
            name:  _self.name(),
            type:  _self.tipo()
        }
        if(_self.id())
            obj.id=_self.id();
        return obj;
     }
    return _self;
 }