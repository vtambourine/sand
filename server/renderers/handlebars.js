import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import Renderer from '../renderer';

export default class HandlebarsRenderer extends Renderer {

  // static extension = 'hbs'

  async getTemplateFile(template) {
    // TODO: Raise exeption if file do not exists
    //
    console.log(HandlebarsRenderer.extension);
    return fs.readFileSync(
      path.join(this.directory, 'fixtures/handlebars', template + '.hbs'),
      'utf8'
    );
  }

  async renderToHTML(payload) {
    // TODO: Check if template passed
    const template = Handlebars.compile(await this.getTemplateFile(payload.template));
    const html = template(payload.data);
    return html;
  }

  renderErrorToHTML(error) {
    return `<pre>${error.stack}</pre>`;
  }

}
