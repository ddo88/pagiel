function VM(){var t=this;return t.currentList=ko.observable(),t.files=ko.observableArray(),t.selectedFiles=ko.observable(),t.tonos=[],t.processPosition=function(n,e){var o=t.files();_.find(o,function(t,i){return n.id()==t.id()&&(o.move(i,i+e),t)}),t.files([]),t.files(_.filter(o),function(t){return t})},t.up=function(n){t.processPosition(n,1)},t.down=function(n){t.processPosition(n,-1)},t.buscar=function(){t.files([]);var n=void 0;n=t.selectedFiles()?t.selectedFiles().value():_.map(t.currentList().Songs,function(t){return t}),For(n,function(n,e){var o=getSync("/api/songs/"+n),i=new Song(o,t);i.tono(t.tonos[e]||0),t.files.push(i)})},t.generar=function(){if(confirm("¿esta seguro de guardar la información?")){var n={data:JSON.stringify(_.map(t.files(),function(t){return{id:t.id(),tono:t.tono()}}))};t.currentList()?(n.id=t.currentList()._id,updateItem("/api/lists",n).done(function(t){alert("se ha guardado correctamente la información")})):postItem("/api/lists",n).done(function(t){alert("se ha guardado correctamente la información")})}},t.UpdateSongsStatistics=function(){confirm("esta seguro de actualizar la lista?")&&(For(_.chain(t.files()).map(function(t){return t.id()}).reduce(function(t,n){return t+","+n}).value().split(","),function(t){updateItem("/api/songs/"+t,{}).done(function(t){alert("se ha guardado correctamente la información"),console.log(t)})}),postItem("/api/lists/history",{}).done(function(){console.log("update")}))},t.goToPresentation=function(){window.location.href="/presentation"},t.goToPresentationChords=function(){window.location.href="/presentationChords"},t.goToSongs=function(){window.location.href="/songs"},t.init=function(){t.initMultiselect(),t.files([]),t.selectedFiles($("#required").data("kendoMultiSelect")),get("/api/lists/current").done(function(n){if(n.length){t.currentList(n[0]);var e=_.map(t.currentList().Songs,function(t){return t.id});t.tonos=_.map(t.currentList().Songs,function(t){return t.tono});try{t.selectedFiles().value(e)}catch(t){}setTimeout(function(){t.buscar()},2e3)}})},t.initMultiselect=function(){$("#required").kendoMultiSelect({dataSource:{transport:{read:{dataType:"json",url:"/api/songs"}}},itemTemplate:'<span class="k-state-default">#:data.Name#</span><span class="k-state-default"><p>#: data.Type #</p></span>',dataTextField:"Name",dataValueField:"_id",change:t.buscar,tagMode:"single",height:250,maxSelectedItems:8})},t.init(),t}Array.prototype.move=function(t,n){for(;t<0;)t+=this.length;for(;n<0;)return;if(n>=this.length)for(var e=n-this.length;1+e--;)this.push(void 0);return this.splice(n,0,this.splice(t,1)[0]),this},Song.prototype.Up=function(){this.tono(this.tono()+1)},Song.prototype.Down=function(){this.tono(this.tono()-1)},$(function(){try{$(document).tooltip({items:".custom-tooltip",content:function(){return $(this).find(".custom-tooltip-message").html()}})}catch(t){console.log(t)}ko.applyBindings(new VM)});