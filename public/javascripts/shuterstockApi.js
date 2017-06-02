var API_URL = 'https://api.shutterstock.com/v2';
function encodeAuthorization() {
    var clientId = "5eaddfe29f1ef521e938";
    var clientSecret = "528bf92f0bc901a006f0ec223ae31d008f225458";

    if (!clientId || !clientSecret) {
        throw "clientId missing";
    }
    return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
}
function search() {
    authorization = encodeAuthorization();
    if (!authorization) return;

   
   var mediaType="images";

    return $.ajax({
        url: API_URL + '/' + mediaType + '/search?query=paisajes&safe=false&image_type=photo&orientation=horizontal&page=1&per_page=9&view=minimal',
        headers: {
        Authorization: authorization
        }
    });
}


function getImage(id)
{
    return $.ajax({
        url: API_URL + '/' + "images?id="+id+"&view=minimal",
        headers: {
        Authorization: authorization
        }
    });
}
      