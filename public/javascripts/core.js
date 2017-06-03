function getSync(url){
    var result;
    $.ajax({
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: url,
      async: false, 
      success: function(data) {
        result=data;
      },error:function(){
          console.log(arguments);
      }
    });
    return result;
}

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
function For(items,exec,init){
    var result=undefined;
    for(var i=init||0,length=items.length;i<length;i++)
    {
        result=exec(items[i],i);
    }
    return result;
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
    _self.views  = ko.observable();
    _self.tono   = ko.observable(0);
    _self.lyricsFormat = ko.computed(function(){
        var r=_self.lyrics();
        return "";
    })
    function setData(val){
        _self.id(val["_id"]);
        _self.name(val.Name);
        _self.lyrics(val.Lyrics);
        _self.chords(val.Chords);
        _self.tipo(val.Type);
        _self.views(val.Views);
     }
    setData(item);
    _self.toItem   =function(){
        var obj={
            lyrics:_self.lyrics(),
            chords:_self.chords(),
            name:  _self.name(),
            type:  _self.tipo()
            //views: _self.views()
        }
        if(_self.id())
            obj.id=_self.id();
        return obj;
     }
    return _self;
 }
 function pad(pad, str, padLeft) {
  if (typeof str === 'undefined') 
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}
function getImageRamdon(number){
    var arr=[];
    _(31).times(function(i){
        arr.push(i);
    });
    var result=[];
    var q=_.sample(arr, number);
    _(number).times(function(idx){
        result.push(pad('000',q[idx],true)+".jpg");
    })
    return result;
}
