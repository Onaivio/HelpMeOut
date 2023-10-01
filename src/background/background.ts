// background.ts

// Listen for a click on the extension icon and send a message to the content script
chrome.action.onClicked.addListener((tab) => {
  // Define the details for executing the content script
  const scriptDetails = {
    file: 'contentScript', // Replace with your content script file
    allFrames: true, // Inject into all frames of the tab
  };

  // Execute the content script
  chrome.tabs.executeScript(tab.id, scriptDetails, () => {
    // Script has been executed
  });

  // Optionally, you can send a message to the content script
  chrome.tabs.sendMessage(tab.id, { action: "startRecording" });
});

// Background script logic can handle other extension-related functionality as needed
