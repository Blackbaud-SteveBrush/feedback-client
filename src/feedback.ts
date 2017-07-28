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
      console.log('message event:', event);
      if (event.origin !== 'https://host.nxt.blackbaud.com') {
        return;
      }

      if (event.data.source === 'feedback') {
        console.log('Message received from iframe!', event.data.message);
        iframeElement.contentWindow.postMessage({
          response: {
            url: location.href,
            product: 'engineering-system-docs',
            user: {
              id: 'abc123',
              first_name: 'Steve',
              last_name: 'Brush',
              email: 'steve.brush@blackbaud.com'
            }
          },
          source: 'feedback-parent'
        }, '*');
      }
    }, false);
  }
}
