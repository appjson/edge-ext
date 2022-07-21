chrome.runtime.onInstalled.addListener(async () => {
  console.log(
    "%cExtension installed!",
    "font-size:24px;color:white;background-color:blue;padding:4px;"
  );
  chrome.contextMenus.create({
    id: "save",
    title: "记录：%s",
    contexts: ["selection"],
  });
});
