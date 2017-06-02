
function VM()
{
    var _self           = this;
    _self.currentList   = ko.observable();
    _self.files         = ko.observableArray();
    _self.buscar        = function(){
        try{
            Reveal.destroy();
        }catch(e){}
        _self.files([]);
        var ids = _.map(_self.currentList().Songs,function(x){ return x;});
        For(ids,function(item){
            var data=getSync('/api/songs/'+item)
            _self.files.push(new Song(data,_self));//new Song(item,_self));
        })
        loadReveal();
     };
    _self.init          = function(){
        _self.files([]);
        // search().done(function(images){
        //     var imagesIds=_.map(images.data,function(item){ return item.id;});
        //     For(imagesIds,function(id){
        //         getImage(id).done(function(r){
        //             debugger;
        //         });
        //     })
        // });
        get('/api/lists/current').done(function(list){
            if(list.length){
                _self.currentList(list[0]);
                _self.buscar();
            }
        });
      };
    _self.init();
    return _self;
}

$(function(){
    ko.applyBindings(new VM());
});


function loadReveal(){
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        transition: 'slide', // none/fade/slide/convex/concave/zoom
        dependencies: [
            { src: '/javascripts/revealjs/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: '/javascripts/revealjs/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: '/javascripts/revealjs/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: '/javascripts/revealjs/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: '/javascripts/revealjs/plugin/zoom-js/zoom.js', async: true },
            { src: '/javascripts/revealjs/plugin/notes/notes.js', async: true }
        ]
    });	
}
