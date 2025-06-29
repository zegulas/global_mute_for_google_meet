chrome.commands.onCommand.addListener(async (command) => {
    try {
        if (command === "toggle-mic") {
            await toggleMicrophone();
        } else if (command === "switch-to-meet") {
            await switchToMeetTab();
        } else if (command === "go-to-meet-home") {
            goToMeetHome();
        }
    } catch (error) {
        console.error("Error handling command:", error);
    }
});

async function toggleMicrophone() {
    try {
        let tabs = await chrome.tabs.query({ url: "https://meet.google.com/*" });
        if (!tabs || tabs.length === 0) {
            console.warn("No active Google Meet tab found.");
            return;
        }

        let tabId = tabs[0].id;
        if (!tabId) {
            console.error("Invalid tabId:", tabId);
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId },
            func: toggleMic
        });

    } catch (error) {
        console.error("Error toggling mic:", error);
    }
}

async function switchToMeetTab() {
    try {
        let tabs = await chrome.tabs.query({ url: "https://meet.google.com/*" });
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { active: true });
        } else {
            console.warn("No active Google Meet tab to switch to.");
        }
    } catch (error) {
        console.error("Error switching to Meet tab:", error);
    }
}

function goToMeetHome() {
    chrome.tabs.create({ url: "https://meet.google.com" }).catch((error) => {
        console.error("Error navigating to Meet home:", error);
    });
}

function toggleMic() {
    try {
        let micButton = document.querySelector('[aria-label="Turn off microphone"]') ||
            document.querySelector('[aria-label="Turn on microphone"]');
        if (micButton) {
            micButton.click();
        } else {
            console.warn("Microphone button not found.");
        }
    } catch (error) {
        console.error("Error executing script in Meet tab:", error);
    }
}