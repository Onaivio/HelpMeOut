// contentScript.tsx

// Define the function to inject the recording dialog into the webpage
function injectRecordingDialog() {
    // Create a container element for the recording dialog
    const dialogContainer = document.createElement("div");
    dialogContainer.id = "recording-dialog-container";
    dialogContainer.style.position = "fixed";
    dialogContainer.style.top = "20px";
    dialogContainer.style.left = "20px";
    dialogContainer.style.zIndex = "9999";
  
    // Create an iframe to load your recording popup
    const iframe = document.createElement("iframe");
    iframe.src = chrome.runtime.getURL("popup.html");
    iframe.style.width = "400px";
    iframe.style.height = "300px";
    iframe.style.border = "none";
  
    // Append the iframe to the container
    dialogContainer.appendChild(iframe);
  
    // Append the container to the document
    document.body.appendChild(dialogContainer);
  }
  
  // Listen for a message from background.js to trigger injection
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startRecording") {
      injectRecordingDialog();
    }
  });
  
  // Content script logic can also handle other webpage-related functionality if needed
  // For example, you can listen to DOM events or manipulate the webpage's content
  