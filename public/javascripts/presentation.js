var presenter=false;
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
        var ids = _.map(_self.currentList().Songs,function(x){ return x.id;});
        var images=getImageRamdon(ids.length);
        For(ids,function(item,idx){
            var data=getSync('/api/songs/'+item)
            var song=new Song(data,_self);
            song.image=ko.observable('/images/'+images[idx]);
            _self.files.push(song);//new Song(item,_self));
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
    loadSocket();
    return _self;
}

$(function(){
    ko.applyBindings(new VM());
    $('#presenter').on('click',presenterClick);
});

function loadSocket(){
    Core.SocketsIO.Subscribe('presentationEvent',function(event){
        if(!presenter)
            Reveal.slide( event.indexh, event.indexv);
    });
    Core.SocketsIO.Subscribe('presenterSelect',function(){
        if(!presenter)
            $('#presenter').hide(500);
    });
}
function loadReveal(){
    Reveal.initialize({
        minScale: 0.2,
	    maxScale: 1.5,
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
var presenterClick = _.once(function(){
    presenter      = true;
    Core.SocketsIO.Send('presenterSel');
    Reveal.addEventListener( 'slidechanged', function( event ) {
	   Core.SocketsIO.Send('commandEvent',{ previous:event.previousSlide, current: event.currentSlide, indexh:  event.indexh, indexv:  event.indexv });
    });
});
