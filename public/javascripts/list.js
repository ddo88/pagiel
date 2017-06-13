Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        return;
        //new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
Song.prototype.Up    = function(){
    this.tono(this.tono()+1);
 }
Song.prototype.Down  = function(){
    this.tono(this.tono()-1);
}

function VM()
{
    var _self           = this;
    _self.currentList   = ko.observable();
    _self.files         = ko.observableArray();
    _self.selectedFiles = ko.observable();
    _self.tonos             = [];
    _self.processPosition   = function(item,pos){
        var temp=_self.files();
        _.find(temp,function(song,idx){
            if(item.id()==song.id())
            {
                temp.move(idx,(idx+pos));
                return song;
            }
            return false;
        });

        _self.files([]);
        _self.files(_.filter(temp),function(song){
            return song;
        });
    }
    _self.up                = function(item){
       _self.processPosition(item,1);
    };
    _self.down              = function(item){
        _self.processPosition(item,-1);
    };
    _self.buscar            = function(){
        _self.files([]);
        var ids=undefined;
        if(_self.selectedFiles())
            ids=_self.selectedFiles().value();
        else
            ids=_.map(_self.currentList().Songs,function(x){ return x;});
        For(ids,function(item,i){
            var data = getSync('/api/songs/'+item)
            var song = new Song(data,_self);
            song.tono(_self.tonos[i]||0);
            _self.files.push(song);//new Song(item,_self));
        })
      };//https://wallpaperscraft.com/catalog/nature/1920x1080/page3
     _self.generar=function(){
         
         if(confirm("¿esta seguro de guardar la información?"))
         {
            var item={ data: JSON.stringify(_.map(_self.files(),function(item){ return {id:item.id(),tono:item.tono()}})) };
            if(_self.currentList()){
                item.id=_self.currentList()["_id"];
                updateItem("/api/lists",item).done(function(data){
                    //rev: validar alerts
                    alert("se ha guardado correctamente la información");
                });
            }else
                postItem('/api/lists',item).done(function(data){
                    //rev: validar alerts
                    alert("se ha guardado correctamente la información");
                });
         }
     };

     _self.UpdateSongsStatistics=function()
     {
         if(confirm("esta seguro de actualizar la lista?")){
            For(_.chain(_self.files()).map(function(q){ return q.id(); }).reduce(function(memo,current){ return memo+','+current;}).value().split(','),
            function(item){
                updateItem("/api/songs/"+item,{}).done(function(data){
                    //rev: validar alerts
                    alert("se ha guardado correctamente la información");
                   console.log(data);
                });
            });
            postItem("/api/lists/history",{}).done(function(){ console.log("update");});
         }
     };

     _self.goToPresentation=function(){
         window.location.href="/presentation";
     };
    _self.goToPresentationChords = function(){
         window.location.href="/presentationChords";
     };
     _self.goToSongs=function(){
         window.location.href="/songs";
     }
    _self.init              = function(){
        _self.initMultiselect();
        _self.files([]);
        _self.selectedFiles($("#required").data("kendoMultiSelect"));
        get('/api/lists/current').done(function(list){
            if(list.length){
                _self.currentList(list[0]);
                 var ids = _.map(_self.currentList().Songs,function(x){ return x.id;});
                _self.tonos = _.map(_self.currentList().Songs,function(x){ return x.tono;});
                try{_self.selectedFiles().value(ids);}catch(e){}
                setTimeout(function(){
                    _self.buscar();
                },2000);
                
            }
        });
      };
    _self.initMultiselect   = function(){
          $("#required").kendoMultiSelect({
            dataSource: { transport: { read: { dataType: "json", url: "/api/songs",}}},
            itemTemplate:'<span class="k-state-default">#:data.Name#</span><span class="k-state-default"><p>#: data.Type #</p></span>',
            dataTextField: "Name",
            dataValueField: "_id",
            change: _self.buscar,
            tagMode: "single",
            height:250,
            maxSelectedItems: 8
        });
      };
    
    _self.init();
    return _self;
}

$(function(){
     try{
        $(document).tooltip({ items: ".custom-tooltip", content: function() { var element = $(this).find('.custom-tooltip-message');return element.html();} });
     }catch(e){console.log(e);}
    ko.applyBindings(new VM());
});
