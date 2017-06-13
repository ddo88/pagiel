
function VM()
{
    var _self           = this;
    _self.currentList   = ko.observable();
    _self.files         = ko.observableArray();
    _self.init          = function(){
        _self.files([]);
        get('/api/lists/songs?properties=Chords,Name').done(function(data){
            AsyncFor(data,function(d){
                var song=new Song(d,_self);
                _self.files.push(song);
            }).done(loadReveal);
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
    try{
        return subst.join("");
    }catch(e){
        return "";
    }
};