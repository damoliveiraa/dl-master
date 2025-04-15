(function() {
    function hookDataLayer() {
      if (!window.dataLayer || window.dataLayer.isHijacked) return;
      window.dataLayer.isHijacked = true;
      const originalPush = window.dataLayer.push;
      window.dataLayer.push = function() {
        originalPush.apply(window.dataLayer, arguments);
        try {
          const arr = Array.from(arguments);
          const lastObj = arr[arr.length - 1];
          window.postMessage({ type: "__DL_EVENT__", data: lastObj }, "*");
        } catch (err) {}
      };
      // Envia eventos históricos também
      try {
        window.dataLayer.forEach(ev => {
          window.postMessage({ type: "__DL_EVENT__", data: ev }, "*");
        });
      } catch (err) {}
      console.log("DL interceptado e postMessage ativo (escopo real via src) [DL Master]");
    }
  
    let tries = 0, maxTries = 150; // 15s!
    const interval = setInterval(() => {
      hookDataLayer();
      tries++;
      if (tries >= maxTries) clearInterval(interval);
    }, 100);
  
    // Para SPA: também tenta em popstate
    window.addEventListener('popstate', () => setTimeout(hookDataLayer, 200));
  })();