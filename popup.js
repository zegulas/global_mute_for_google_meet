document.getElementById("toggle-mic").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggle-mic" });
});
