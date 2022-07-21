const button = $("#confirm");
button.on("click", function () {
    const content = $("#content").val();
    const time = $("#time").val();
    console.log(content, time);
    setTimeout(function () {
        chrome.notifications.create("", {
            type: "basic",
            title: "到时间啦!",
            message: content,
            iconUrl: "./assets/icon.png",
        });
    }, Number(time) * 1000);
});
