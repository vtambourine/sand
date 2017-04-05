import path from 'path';
import Pug from 'pug';

export default class Renderer {

  constructor(dir = process.cwd()) {
    this.directory = path.resolve(dir);
  }

  static get name() {
    throw new Error('Renderer needs name!');
  };

  static get extension() {
    throw new Error('Renderer needs extension!');
  }

  async getTemplateFile(template) {
    // TODO: Raise exeption if file do not exists
    return path.join(this.directory, 'fixtures/pug', template + '.pug');
  }

  renderToHTML(payload) {
    // TODO: Check if template passed
    console.log(payload);
    const template = Pug.compileFile(this.getTemplateFile(payload.template));
    const html = template(payload.data);
    return html;
  }

  renderErrorToHTML(request, response) {
    return "<h1>Error</h1>";
  }

}
