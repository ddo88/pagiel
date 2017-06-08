/// <reference path="core.js" />
function indexVM()
{
    var _self=this;
    _self.history=ko.observableArray([]);
    _self.songsMostView=ko.observableArray([]);
    _self.songsLessView=ko.observableArray([]);
    // _self=paginator(_self,"history",3);
    _self.pageSize  = ko.observable(3);
    _self.pageIndex = ko.observable(0);
    _self.init=function(){
        get('/api/songs/details?order=-1')
        .done(function(data){
            For(data,function(item){ 
                _self.songsMostView.push(new Song(item,_self));
            })
        });
        get('/api/songs/details?order=1')
        .done(function(data){
            For(data,function(item){ 
                _self.songsLessView.push(new Song(item,_self));
            })
        });
        
        updateItem('/api/lists/history',{
            pageSize:_self.pageSize(),
            pageIndex: _self.pageIndex()
        }).done(function(data){
            For(data,function(item){
                _self.history.push(new List(item));
            });

             $("#panel").kendoPanelBar({
                expandMode: "single"
            });

            $('#tabs').kendoTabStrip({
                animation:  {
                    open: {
                        effects: "fadeIn"
                    }
                }
            });
        });
    };

    _self.init();
    return _self;
}


$(function(){
    ko.applyBindings(new indexVM());
});