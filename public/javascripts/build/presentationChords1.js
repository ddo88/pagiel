function VM(){var n=this;return n.currentList=ko.observable(),n.files=ko.observableArray(),n.init=function(){n.files([]),get("/api/lists/songs?properties=Chords,Name").done(function(i){AsyncFor(i,function(i){var s=new Song(i,n);n.files.push(s)}).done(loadReveal)})},n.init(),n}function loadReveal(){Reveal.initialize({controls:!0,progress:!0,history:!0,center:!0,transition:"slide",dependencies:[{src:"/javascripts/revealjs/lib/js/classList.js",condition:function(){return!document.body.classList}},{src:"/javascripts/revealjs/plugin/markdown/marked.js",condition:function(){return!!document.querySelector("[data-markdown]")}},{src:"/javascripts/revealjs/plugin/markdown/markdown.js",condition:function(){return!!document.querySelector("[data-markdown]")}},{src:"/javascripts/revealjs/plugin/highlight/highlight.js",async:!0,callback:function(){hljs.initHighlightingOnLoad()}},{src:"/javascripts/revealjs/plugin/zoom-js/zoom.js",async:!0},{src:"/javascripts/revealjs/plugin/notes/notes.js",async:!0}]})}$(function(){ko.applyBindings(new VM)});var transposeChord=function(n,i){var s=["C","Cb","C#","D","Db","D#","E","Eb","E#","F","Fb","F#","G","Gb","G#","A","Ab","A#","B","Bb","B#"],r=["Cb","C","C#","Bb","Cb","C","C","C#","D","Db","D","D#","C","Db","D","D","D#","E","Eb","E","F","D","Eb","E","E","E#","F#","E","F","F#","Eb","Fb","F","F","F#","G","Gb","G","G#","F","Gb","G","G","G#","A","Ab","A","A#","G","Ab","A","A","A#","B","Bb","B","C","A","Bb","B","B","B#","C#"],e=n.match(/[^b#][#b]?/g);for(var o in e)if(-1!==s.indexOf(e[o])){if(i>0)for(ix=0;ix<i;ix++){a=3*(t=s.indexOf(e[o]))-2+3;e[o]=r[a+1]}if(i<0)for(ix=0;ix>i;ix--){var t=s.indexOf(e[o]),a=3*t-2+3;e[o]=r[a-1]}}try{return e.join("")}catch(n){return""}};