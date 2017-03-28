import { constants } from 'os';

console.log(constants);

export default class Server {
  constructor () {

  }

  async start (port, hostname) {
    this.http = http.createServer(this.getRequestHandler());
    await new Promise((resolve, reject) => {
      this.http.on('error', reject);
      this.http.on('listening', () => resolve());
      this.http.listen(port, hostname);
    });
  }
}
