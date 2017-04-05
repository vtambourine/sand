import { constants } from 'os';
import url from 'url';
import path from 'path';
import querystring from 'querystring'
import http, { STATUS_CODES } from 'http';
import { RequestError } from './errors';

export default class Server {
  constructor (renderer) {
    this.renderer = renderer;
  }

  requestHandler (request, response) {
    // const parsedRequest = this.parseRequest(request);
    return this.run(request, response)
      .catch((error) => {
        response.statusCode = 500;

        const html = this.renderer.renderErrorToHTML(error);
        response.end(STATUS_CODES[500]);
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

  async run (request, response) {
    if (response.finished) return;

    let html;
    try {
      const parsedRequest = this.parseRequest(request);
      html = await this.renderer.renderToHTML(parsedRequest);
    } catch(error) {
      html = await this.renderer.renderErrorToHTML(error);
    }

    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Length', Buffer.byteLength(html));
    response.end(html);
  }

  parseRequest (request) {
    const requestUrl = url.parse(request.url);

    let { template, data } = querystring.parse(requestUrl.query);

    if (!template) {
      throw new RequestError('`template` parameter missing. Expected to be a string.');
    }

    if (!data) {
      throw new RequestError('`data` parameter missing. Expected to be a valid JSON.');
    }

    try {
      data = JSON.parse(data);
    } catch (error) {
      throw new RequestError('`data` expected to be a valid JSON.');
    }

    return {
      template,
      data,
      timestamp: Date.now()
    };
  }
}
