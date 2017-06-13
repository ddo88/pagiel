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
};


function sortableList(model,observableArrayName){
     model.orderAsc     = ko.observable(true);
     model.property     = ko.observable('name');
     model.setOrderBy   = function(property){
        if(model.property()!==property)
        {
            model.property(property);
            model.orderAsc(true);
        }
        else
            model.orderAsc(!model.orderAsc());
    };
    model.listOrdered=ko.computed(function(){
        var array=_.sortBy(model[observableArrayName](),function(item){
            return item[model.property()](); 
        });
        if(model.orderAsc())
            return array;
        else 
            return array.reverse();
    });
    return model;
};
function paginator(model, arrayName, numberOfElements) {
    /// <summary>
    /// Metodo para extender modelos de knockout y añadir propiedades adicionales para el paginador.
    /// </summary>
    /// <param name="model" type="type">Modelo de knockout</param>
    /// <param name="arrayName" type="type">nombre de la lista observable a paginar</param>
    /// <param name="numberOfElements" type="type">numero de registros por pagina que se van a visualizar.</param>
    /// <returns type=""></returns>


    if (numberOfElements === undefined || numberOfElements == null) {
        numberOfElements = 6;
    } else {
        numberOfElements = parseInt(numberOfElements);
    }

    var _self = model;

    _self.pageSize = ko.observable(numberOfElements);
    _self.pageIndex = ko.observable(0);

    _self.pagedView = ko.computed(function () {
        var size = _self.pageSize();
        var start = _self.pageIndex() * size;
        return _self[arrayName]().slice(start, start + size);
    });

    _self.maxPageIndex = ko.computed(function () {
        return Math.ceil(_self[arrayName]().length / _self.pageSize()) - 1;
    });

    _self.previousPage = function () {
        if (_self.pageIndex() > 0) {
            _self.pageIndex(_self.pageIndex() - 1);
        }
    };

    _self.nextPage = function () {
        if (_self.pageIndex() < _self.maxPageIndex()) {
            _self.pageIndex(_self.pageIndex() + 1);
        }
    };

    _self.moveToPage = function (index) {
        _self.pageIndex(index);
    };

    _self.allPages = ko.computed(function () {
        var pages = [];
        for (i = 0; i <= _self.maxPageIndex() ; i++) {
            pages.push({ pageNumber: (i + 1) });
        }
        return pages;
    });

    return _self;

}

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
        _self.tono(val.tono);
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
  if (padLeft) 
    return (pad + str).slice(-pad.length);
  else 
    return (str + pad).substring(0, pad.length);
}


function List(item)
{
    var _self=this;
    _self.Date=ko.observable(item.Date);
    _self.Songs=ko.observableArray([]);
    postItem('/api/songs/search',{ids:_.map(item.Songs,"id").join()}).done(function(data){
        For(data,function(item,idx){
            _self.Songs.push(new Song(item,_self));
        });
    });
    return _self;   
}

$(function(){
    $('#Carousel').carousel();
});