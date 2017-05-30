function VM()
{
    var _self           = this;
    _self.files         = ko.observableArray();
    _self.selectedFiles = ko.observable();
    _self.buscar        = function(){
        _self.files([]);
        var ids=_self.selectedFiles().value();
        AsyncFor(ids,function(item){
            get('/api/songs/'+item).done(function(data){
                _self.files.push(new Song(data,_self));//new Song(item,_self));
            });
        })
     };
     _self.generar=function(){

     };
    _self.init          = function(){
        _self.files([]);
        _self.selectedFiles($("#required").data("kendoMultiSelect"));
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
