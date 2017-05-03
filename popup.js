function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

}

function awesome() {
  // Do something awesome!
  //console.log('test');
  getCurrentTabUrl(function(url) {
  	//window.open("https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+encodeURIComponent(url));/*version slow avec click sur logo*/
  });
}

function totallyAwesome() {
  // do something TOTALLY awesome!
  //window.setTimeout(function() { alert('generating...'); }, 10);
  getCurrentTabUrl(function(url) { 
  	console.log(url);
  	var searchTerm = url;
  	var searchUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(searchTerm);

  	/*var le_qr_code = */
  	//document.getElementById("qrcode").innerHTML = "test" ;
  	document.getElementById("qrcode").innerHTML = "<img src='"+searchUrl+"' />" ;
  	//console.log(le_qr_code);

  	//xhr
	/*var x = new XMLHttpRequest();
	x.open('GET', searchUrl);
	x.responseType = 'text';
	console.log(x);
	x.onerror = function() {
		console.log('Network error.');console.log(x);
	};
	x.onreadystatechange = function () {
        if(x.readyState === XMLHttpRequest.DONE && x.status === 200) {
        	////console.log(x.response);
            //console.log(x.responseText);
            //var mon_image = "<img alt=\"Embedded Image\" src=\"data:image/png;base64,\""+x.responseText+" />";
            //console.log(mon_image);
        }
    };
	x.send(); 
	*/
  });
}

function awesomeTask() {
  awesome();
  totallyAwesome();
}

function clickHandler(e) {
  setTimeout(awesomeTask, 1000);
}

function main() {
  // Initialization work goes here.
  /*awesome();*//*Version fast - open un nouvel onglet avec le qrCode direct en gros*/
  totallyAwesome(); //copy le qr code en direct dand la popup lors du click sur l'extension
  document.getElementsByTagName('body')[0].style.backgroundColor=localStorage['couleur'];
}


// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();

});