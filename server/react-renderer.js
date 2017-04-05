import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import BaseRenderer from './base-renderer';

function resolvePageFromFilename (filename) {
  return path.basename(filename, '.js').toLowerCase();
}

function ensureTemplate() {
  return true;
}

export default class ReactRenderer extends BaseRenderer {

  pages = new Map()

  constructor (directory) {
    super();

    this.directory = directory;
    this.loadPageComponents();
  }

  async renderToHTML (payload) {
    // const page = await this.resolvePageComponent(payload.template);

    await ensureTemplate(payload.template);

    const page = this.pages.get(payload.template);

    const doc = React.createElement(page, { context: payload.data });
    const html = ReactDOMServer.renderToStaticMarkup(doc);

    return '<!doctype html>' + html;
  }

  loadPageComponents () {
    const files = fs.readdirSync(this.directory);

    for (let file of files) {
      const page = resolvePageFromFilename(file);
      try {
        const component = require(path.join(this.directory, file)).default;
        this.pages.set(page, component);
      } catch (error) {
        console.log(error);
      }
    }
  }

}
