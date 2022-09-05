(function () {
  function setupFlatPanel(catStyle) {
    // img element
    const canvas = document.createElement("img");
    canvas.id = "img-edge-ext";
    canvas.style.width = "150px";
    canvas.style.height = "150px";
    canvas.style.position = "fixed";
    canvas.style.right = 0;
    canvas.style.bottom = "50px";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 99999999;
    canvas.style.filter = "drop-shadow(0px 10px 10px #ccc)";
    canvas.src = chrome.runtime.getURL(`/assets/flatcat/${catStyle}.png`);
    document.body.appendChild(canvas);
    // react root element
    const divElem = document.createElement("div");
    divElem.id = "content-js-div-edge-ext";
    divElem.style.position = "absolute";
    divElem.style.right = "0";
    divElem.style.bottom = "0";
    divElem.style.pointerEvents = "none";
    divElem.style.zIndex = 99999999;
    document.body.appendChild(divElem);
    // react script and style sheet
    const reactScript = document.createElement("script");
    reactScript.setAttribute("type", "text/javascript");
    reactScript.src = chrome.runtime.getURL("/assets/react-edge-ext.js");
    const styleCss = document.createElement("link");
    styleCss.setAttribute("rel", "stylesheet");
    styleCss.setAttribute(
      "href",
      chrome.runtime.getURL("/assets/content-edge-ext.css")
    );
    document.head.appendChild(reactScript);
    document.head.appendChild(styleCss);
  }

  function setupCatPanel() {
    // canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "live2d-edge-ext";
    canvas.width = 300;
    canvas.height = 400;
    canvas.style.width = "150px";
    canvas.style.height = "200px";
    canvas.style.position = "fixed";
    canvas.style.right = 0;
    canvas.style.bottom = 0;
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 99999999;
    canvas.style.filter = "drop-shadow(0px 10px 10px #ccc)";
    document.body.appendChild(canvas);
    // react root element
    const divElem = document.createElement("div");
    divElem.id = "content-js-div-edge-ext";
    divElem.style.position = "absolute";
    divElem.style.right = "0";
    divElem.style.bottom = "0";
    divElem.style.pointerEvents = "none";
    divElem.style.zIndex = 99999999;
    document.body.appendChild(divElem);
    // react script and style sheet
    const reactScript = document.createElement("script");
    reactScript.setAttribute("type", "text/javascript");
    reactScript.src = chrome.runtime.getURL("/assets/react-edge-ext.js");
    const styleCss = document.createElement("link");
    styleCss.setAttribute("rel", "stylesheet");
    styleCss.setAttribute(
      "href",
      chrome.runtime.getURL("/assets/content-edge-ext.css")
    );
    document.head.appendChild(reactScript);
    document.head.appendChild(styleCss);
  }

  function setupModel(color) {
    // inject live2d model loader script
    let loadLive = document.createElement("script");
    loadLive.setAttribute("type", "text/javascript");
    loadLive.src = chrome.runtime.getURL("/assets/contentLoader-edge-ext.js");
    document.body.appendChild(loadLive);
    let meta = document.createElement("meta");
    meta.setAttribute(
      "content",
      chrome.runtime.getURL(`/assets/${color}/model.json`)
    );
    meta.setAttribute("name", "model_url");
    document.head.appendChild(meta);
  }

  function injectCustomJs(jsPath, callbackFn) {
    let temp = document.createElement("script");
    temp.setAttribute("type", "text/javascript");
    temp.src = chrome.runtime.getURL(jsPath);
    temp.onload = function () {
      this.parentNode.removeChild(this);
      if (callbackFn) callbackFn();
    };
    document.head.appendChild(temp);
  }

  chrome.storage.sync.get(["catShow", "catStyle"], (res) => {
    const catShow = res.catShow === undefined ? true : res.catShow;
    const catStyle = res.catStyle || "cat-1";
    if (catShow && catStyle !== "blackcat" && catStyle !== "whitecat") {
      setupFlatPanel(catStyle);
    } else if (catShow) {
      // inject live2d engine
      injectCustomJs("/assets/live2d-mini.js", function () {
        setupCatPanel();
        setupModel(catStyle);
      });
    } else {
      return;
    }
  });
})();
