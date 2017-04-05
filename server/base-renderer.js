export default class BaseRenderer {

  async renderToHTML (payload) {
    return `
<!doctype html>
<html>
<head>
  <title>Sandbox</title>
</head>
<body>
  <pre style="font-weight: bold;">template: ${payload.template}</pre>
  <pre>${JSON.stringify(payload.data, 0, 4)}</pre>
</body>
</html>
    `
  }

  async renderErrorToHTML (error) {
    return `
<!doctype html>
<html>
<head>
  <title>Sandbox ${error.name}</title>
</head>
<body>
  <h1>${error.name} [${error.code || 'no code'}]</h1>
  <h3>${error.message}</h3>
  <pre>${error.stack}</pre>
</body>
</html>
    `
  }

}
