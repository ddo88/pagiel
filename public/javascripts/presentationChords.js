
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
        var tonos = _.map(_self.currentList().Songs,function(x){ return x.tono;});
        For(ids,function(item,i){
            var data=getSync('/api/songs/'+item);
            var song=new Song(data,_self);
            song.tono(tonos[i]);
            _self.files.push(song);//new Song(item,_self));
        });
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



var transposeChord   = function (chord, amount) {
    var scale = ["C", "Cb", "C#", "D", "Db", "D#", "E", "Eb", "E#", "F", "Fb", "F#", "G", "Gb", "G#",
          "A", "Ab", "A#", "B", "Bb", "B#"];
    var transp = ["Cb", "C", "C#", "Bb", "Cb", "C", "C", "C#", "D", "Db", "D", "D#", "C", "Db", "D",
                  "D", "D#", "E", "Eb", "E", "F", "D", "Eb", "E", "E", "E#", "F#", "E", "F", "F#",
                  "Eb", "Fb", "F", "F", "F#", "G", "Gb", "G", "G#", "F", "Gb", "G", "G", "G#", "A",
                  "Ab", "A", "A#", "G", "Ab", "A", "A", "A#", "B", "Bb", "B", "C", "A", "Bb", "B",
                  "B", "B#", "C#"];
    var subst = chord.match(/[^b#][#b]?/g);
    for (var ax in subst) {
        if (scale.indexOf(subst[ax]) !== -1) {
            if (amount > 0) {
                for (ix = 0; ix < amount; ix++) {
                    var pos = scale.indexOf(subst[ax]);
                    var transpos = 3 * pos - 2 + 3;
                    subst[ax] = transp[transpos + 1];
                }
            }
            if (amount < 0) {
                for (ix = 0; ix > amount; ix--) {
                    var pos = scale.indexOf(subst[ax]);
                    var transpos = 3 * pos - 2 + 3;
                    subst[ax] = transp[transpos - 1];
                }
            }
        }
    }
    //chord = subst.join("");
    return subst.join("");
};