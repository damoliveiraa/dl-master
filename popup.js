function flattenValue(val) {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') {
      return Object.entries(val)
        .map(([k, v]) => `${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`)
        .join('; ');
    }
    return val;
  }
  
  function convertToCSV_Sheets(objArray) {
    if (!Array.isArray(objArray) || objArray.length === 0) return "";
    const headers = Array.from(new Set(objArray.flatMap(obj => Object.keys(obj))));
    const csvRows = [headers.join(";")];
    for (const entry of objArray) {
      const row = headers.map(h => {
        let val = entry[h];
        val = flattenValue(val);
        val = (""+val).replace(/\r?\n|\r/g, " ").replace(/"/g,"'");
        return val;
      });
      csvRows.push(row.join(";"));
    }
    return csvRows.join("\r\n");
  }
  
  function convertToCSV_IA(objArray) {
    if (!Array.isArray(objArray) || objArray.length === 0) return "";
    const headers = Array.from(new Set(objArray.flatMap(obj => Object.keys(obj))));
    const csvRows = [headers.join(";")];
    for (const entry of objArray) {
      const row = headers.map(h => {
        let val = entry[h];
        if (typeof val === "object" && val !== null) {
          val = JSON.stringify(val).replace(/\r?\n|\r/g, " ");
        } else if (typeof val === "undefined" || val === null) {
          val = '';
        }
        val = (""+val).replace(/"/g,"'");
        return val;
      });
      csvRows.push(row.join(";"));
    }
    return csvRows.join("\r\n");
  }
  
  function convertToCSV_Raw(objArray) {
    if (!Array.isArray(objArray) || objArray.length === 0) return "";
    const csvRows = ['raw'];
    for (const entry of objArray) {
      const raw = JSON.stringify(entry).replace(/\r?\n|\r/g, " ");
      csvRows.push(`"${raw.replace(/"/g, '""')}"`);
    }
    return csvRows.join("\r\n");
  }
  
  function updateUi(isTracking) {
    const status = document.getElementById('status');
    const toggleBtn = document.getElementById('toggle');
    const downloadSheetsBtn = document.getElementById('download-sheets');
    const downloadIaBtn = document.getElementById('download-ia');
    const downloadRawBtn = document.getElementById('download-raw');
    status.innerText = isTracking ? "Rastreio: Ativo" : "Rastreio: Parado";
    toggleBtn.innerText = isTracking ? "Parar" : "Iniciar";
    downloadSheetsBtn.disabled = isTracking;
    downloadIaBtn.disabled = isTracking;
    downloadRawBtn.disabled = isTracking;
    toggleBtn.classList.toggle('ativo', isTracking);
    toggleBtn.classList.toggle('parado', !isTracking);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle');
    const downloadSheetsBtn = document.getElementById('download-sheets');
    const downloadIaBtn = document.getElementById('download-ia');
    const downloadRawBtn = document.getElementById('download-raw');
  
    chrome.runtime.sendMessage({ type: "getStatus" }, (response) => {
      const tracking = response && response.isTracking;
      updateUi(tracking);
    });
  
    toggleBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: "toggleTracking" }, (response) => {
        const tracking = response && response.isTracking;
        updateUi(tracking);
      });
    });
  
    downloadSheetsBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: "getDataLayerEntries" }, response => {
        const data = response ? response.data : [];
        const csv = convertToCSV_Sheets(data);
        if (!csv) {
          alert("Nenhum evento DataLayer coletado!");
          return;
        }
        const blob = new Blob([csv], {type: "text/csv"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datalayer_sheets.csv";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      });
    });
  
    downloadIaBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: "getDataLayerEntries" }, response => {
        const data = response ? response.data : [];
        const csv = convertToCSV_IA(data);
        if (!csv) {
          alert("Nenhum evento DataLayer coletado!");
          return;
        }
        const blob = new Blob([csv], {type: "text/csv"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datalayer_ia.csv";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      });
    });
  
    downloadRawBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: "getDataLayerEntries" }, response => {
        const data = response ? response.data : [];
        const csv = convertToCSV_Raw(data);
        if (!csv) {
          alert("Nenhum evento DataLayer coletado!");
          return;
        }
        const blob = new Blob([csv], {type: "text/csv"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datalayer_raw.csv";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      });
    });
  });