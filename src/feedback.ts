export class BBFeedback {
  public static load(config: any = {}): void {
    const iframeElement : HTMLIFrameElement = document.createElement('iframe');
    iframeElement.frameBorder = '0';
    iframeElement.width = '100px';
    iframeElement.height = '100px';
    iframeElement.setAttribute('src', 'https://blackbaud.com/');
    document.body.appendChild(iframeElement);
  }
}
