console.log("content.js ativo! (injeta hook-dl.js via src extern)");
const script = document.createElement('script');
script.src = chrome.runtime.getURL('hook-dl.js');
(document.documentElement || document.head).appendChild(script);
script.remove();

window.addEventListener("message", function(event) {
  if (event.source !== window) return;
  if (event.data && event.data.type === "__DL_EVENT__") {
    chrome.runtime.sendMessage({ type: "saveDataLayer", data: event.data.data });
  }
});