var img = document.querySelector("#imgElem");
var ip = document.querySelector("#ip");
var port = document.querySelector("#port");
var nowplayers = document.querySelector("#noplayers");
var nomplayers = document.querySelector("#nomplayers");
var online = document.querySelector("#online");
var version = document.querySelector("#version");
var favicon = document.querySelector("#favicon");
var title = document.querySelector("#title");


document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
}

async function startApp() {
    var target = prompt("Enter minecraft server you want to check:");
    while (target == "" || target == null) {
        target = prompt("This cannot be empty. Enter server you want to check:");
    }

    const isValidUrl = urlString=> {
        var urlPattern = new RegExp(
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
    }
    if (isValidUrl(target) == false) {
        startApp()
    }
    const api = "https://api.mcsrvstat.us/3/";
    var apiUrl = api + target;
    var response = await fetch(apiUrl);
    var data = await response.json();
    console.log(data)
    ip.innerHTML = data.ip;
    port.innerHTML = data.port;
    nowplayers.innerHTML = data.players.online;
    nomplayers.innerHTML =  data.players.max;
    if (data.online) {
        online.innerHTML = "Yes 🟢";
    } else {
        online.innerHTML = "No 🔴";
    }
    version.innerHTML = data.version;
    img.src = data.icon;
    changeFavicon(data.icon)
    document.title = `Now scoping: ${data.hostname}`;
    title.innerHTML = data.hostname;
}
