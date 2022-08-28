chrome.runtime.onInstalled.addListener(async () => {
  console.log(
    "%cExtension installed!",
    "font-size:24px;color:white;background-color:blue;padding:4px;"
  );
  chrome.contextMenus.create({
    id: "saveText",
    title: "记录文本: %s",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "saveImg",
    title: "记录该图片",
    contexts: ["image"],
  });
  chrome.contextMenus.create({
    id: "saveLink",
    title: "记录该链接",
    contexts: ["link"],
  });
  chrome.contextMenus.create({
    id: "savePage",
    title: "记录该网页",
    contexts: ["page"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "saveText":
      console.log("记录文本", info.selectionText);
      break;
    case "saveImg":
      console.log("记录图片", info.srcUrl);
      break;
    case "saveLink":
      console.log("记录链接", info.linkUrl);
      break;
    case "savePage":
      console.log("记录页面", info.pageUrl);
      break;
  }
});

chrome.runtime.onMessage.addListener((data) => {
  console.log("onMessage", data);
  switch (data.type) {
    case "getTabs":
      chrome.tabs.query({ active: true }, (tabs) => {
        console.log(tabs);
      });
      break;
    default:
      break;
  }
});
