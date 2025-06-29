chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggle-mic") {
        let micButton = document.querySelector('[aria-label="Turn off microphone"]') ||
            document.querySelector('[aria-label="Turn on microphone"]');
        if (micButton) micButton.click();
    }
});