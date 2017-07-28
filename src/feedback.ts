export class BBFeedback {
  public static load(config: any = {}): void {
    const padding: number = 15;

    const css = `
    .sky-feedback-placeholder {
      box-sizing: border-box;
      position: fixed;
      bottom: 0px;
      left: 0px;
      overflow: hidden;
      box-shadow: 0 4px 9px rgba(0, 0, 0, 0.35);
      border: 1px solid #e2e2e2;
      border-top: 1px solid #eee;
      transition: all 500ms;
      padding: ${padding}px;
      background-color: #fbfbfb;
      z-index: 99999;
      width: 280px;
      height: 1px;
      opacity: 0;
    }
    .sky-feedback-placeholder iframe {
      display: block;
    }
    `;

    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(css));
    document.head.appendChild(styleElement);

    // Create a div.
    const div = document.createElement('div');
    div.className = 'sky-feedback-placeholder';

    // Create the iframe.
    const iframeElement: HTMLIFrameElement = document.createElement('iframe');
    iframeElement.frameBorder = '0';
    iframeElement.width = '100%';
    iframeElement.height = '100%';
    iframeElement.scrolling = 'no';
    iframeElement.setAttribute('src', 'https://host.nxt.blackbaud.com/feedback/');

    div.appendChild(iframeElement);
    document.body.appendChild(div);

    const setDimensions = (elem: any, height: number) => {
      elem.style.height = `${height + padding * 2 + 2}px`;
      elem.style.opacity = 1;
      elem.style.left = `${padding}px`;
      elem.style.bottom = `${padding}px`;
      // elem.style.width = `${width + padding * 2 + 2}px`;
    };

    // Listen for messages from the iframe.
    window.addEventListener('message', (event) => {
      console.log('message event:', event);
      if (event.origin !== 'https://host.nxt.blackbaud.com') {
        return;
      }

      if (event.data.source === 'feedback') {

        if (event.data.feedbackHeight) {
          setDimensions(div, event.data.feedbackHeight);
        }

        if (event.data.actionType === 'close') {
          div.style.opacity = '0';
          div.style.height = `0px`;
        }

        console.log('Message received from iframe!', event.data);
        iframeElement.contentWindow.postMessage({
          response: {
            product: 'engineering-system-docs',
            url: location.href,
            user: {
              email: 'steve.brush@blackbaud.com',
              first_name: 'Steve',
              id: 'abc123',
              last_name: 'Brush'
            }
          },
          source: 'feedback-parent'
        }, '*');
      }
    }, false);
  }
}
