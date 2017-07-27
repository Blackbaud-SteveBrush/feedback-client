export class BBFeedback {
  public static load(config: any = {}): void {

    // Create the iframe.
    const iframeElement: HTMLIFrameElement = document.createElement('iframe');
    iframeElement.frameBorder = '0';
    iframeElement.width = '200px';
    iframeElement.height = '100px';
    iframeElement.setAttribute('src', 'https://host.nxt.blackbaud.com/feedback/');
    document.body.appendChild(iframeElement);

    // Listen for messages from the iframe.
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://host.nxt.blackbaud.com') {
        return;
      }

      if (event.data.source === 'feedback') {
        console.log('Message received from iframe!', event.data.message);
        iframeElement.contentWindow.postMessage({
          message: 'Hello, iframe!',
          source: 'feedback-parent'
        }, '*');
      }
    }, false);
  }
}
