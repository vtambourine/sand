import { constants } from 'os';
import path from 'path';
import http, { STATUS_CODES } from 'http';

export default class Server {
  constructor (renderer) {
    this.renderer = renderer;
  }

  requestHandler (request, response) {
    const parsedRequest = this.parseRequest(request);
    return this.run(request, response, parsedRequest)
      .catch((error) => {
        response.statusCode = 500;

        const html = this.renderer.renderErrorToHTML(error);
        // response.end(STATUS_CODES[500]);
        response.end(html);
      });
  }

  async start (port, hostname) {
    this.server = http.createServer(this.requestHandler.bind(this));
    await new Promise((resolve, reject) => {
      this.server.on('error', reject);
      this.server.on('listening', () => resolve());
      this.server.listen(port, hostname);
    });
  }

  async run (request, response, parsedRequest) {
    if (response.finished) return;

    var html;
    try {
      html = await this.renderer.renderToHTML(parsedRequest);
    } catch(error) {
      html = await this.renderer.renderErrorToHTML(error);
    }

    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Length', Buffer.byteLength(html));
    response.end(html);
  }

  async renderToHTML (request, response, payload) {
    try {
      // return await renderToHTML();
      return await this.renderer.renderToHTML();
    } catch (error) {
      return await this.renderErrorToHTML(error, request, response, payload);
    }
  }

  parseRequest (request) {
    return {
      template: 'index',
      data: {
        title: 'Sandbox Page',
        header: 'Humpty Dumpty',
        content: 'Pew-pew-pew',
        time: Date.now()
      }
    };
  }
}
