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
function VM()
{
    var _self           = this;
    _self.currentList   = ko.observable();
    _self.files         = ko.observableArray();
    _self.selectedFiles = ko.observable();
    _self.processPosition= function(item,pos){
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
    _self.up= function(item){
       _self.processPosition(item,1);
    };
    _self.down= function(item){
        _self.processPosition(item,-1);
    };
    _self.buscar        = function(){
        _self.files([]);
        var ids=undefined;
        if(_self.selectedFiles())
            ids=_self.selectedFiles().value();
        else
            ids=_.map(_self.currentList().Songs,function(x){ return x;});
        AsyncFor(ids,function(item){
            get('/api/songs/'+item).done(function(data){
                _self.files.push(new Song(data,_self));//new Song(item,_self));
            });
        })
     };
     _self.generar=function(){
         var item={ ids: _.chain(_self.files()).map(function(q){ return q.id(); }).reduce(function(memo,current){ return memo+','+current;}).value() };
         if(_self.currentList()){
            item.id=_self.currentList()["_id"];
            updateItem("/api/lists",item).done(function(data){
            });
         }else
         {
            postItem('/api/lists',item).done(function(data){
                
            });
         }
     };
     _self.goToPresentation=function(){
         window.location.href="/presentation";
     };
    _self.init          = function(){
        _self.files([]);
        _self.selectedFiles($("#required").data("kendoMultiSelect"));
        get('/api/lists/current').done(function(list){
            if(list.length){
                _self.currentList(list[0]);
                try{_self.selectedFiles().value(list[0].Songs);}catch(e){}
                setTimeout(function(){
                    _self.buscar();
                },2000);
                
            }
        });
      };
    _self.init();
    return _self;
}

$(function(){
     $("#required").kendoMultiSelect({
        dataSource: {
                transport: {
                    read: {
                        dataType: "json",
                        url: "/api/songs",
                    }
                }
        },
        itemTemplate:
            '<span class="k-state-default">#:data.Name#</span>' +
            '<span class="k-state-default"><p>#: data.Type #</p></span>'
        ,dataTextField: "Name"
        ,dataValueField: "_id"
     });
    $( document ).tooltip({
      items: ".custom-tooltip",
      content: function() {
        var element = $(this).find('.custom-tooltip-message');
        return element.html();
      }
    });

    ko.applyBindings(new VM());
    
});
