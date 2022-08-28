(function () {
  const loadModel = () => {
    const url = document.getElementsByTagName("meta")["model_url"].content;
    // eslint-disable-next-line no-undef
    loadlive2d("live2d-edge-ext", url);
  };

  loadModel();
})();
