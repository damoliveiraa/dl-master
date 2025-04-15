let isTracking = false;
let dataLayerEntries = [];

// Atualiza o visual do badge REC/verde
function setExtensionStatus(isTracking) {
  if (isTracking) {
    chrome.action.setBadgeText({ text: 'REC' });
    chrome.action.setBadgeBackgroundColor({ color: '#e53935' });
  } else {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#43a047' });
  }
}

setExtensionStatus(isTracking);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "toggleTracking") {
    isTracking = !isTracking;
    setExtensionStatus(isTracking);
    if (!isTracking) {
      console.log("Rastreio parado.");
    } else {
      dataLayerEntries = [];
      console.log("Rastreio iniciado. Array de DataLayers limpo!");
    }
    sendResponse({ isTracking });
  } else if (request.type === "saveDataLayer") {
    if (isTracking) {
      dataLayerEntries.push(request.data);
      console.log("DataLayer salvo:", request.data);
      console.log("Total de eventos DataLayer armazenados:", dataLayerEntries.length);
    } else {
      console.log("DataLayer ignorado (rastreamento está parado):", request.data);
    }
    sendResponse({});
  } else if (request.type === "getDataLayerEntries") {
    sendResponse({ data: dataLayerEntries });
    return true;
  } else if (request.type === "getStatus") {
    sendResponse({
      isTracking,
      qtdEventos: dataLayerEntries.length
    });
    return true;
  }
  return true;
});