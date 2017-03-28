const notifier = require('node-notifier');

export async function bin(fly, opts) {
    await fly.source(opts.src || 'bin/*').babel().target('dist/bin', { mode: 0755 });
    notify('Compiled execultables');
}

export async function server(fly, opts) {
    await fly.source(opts.src || 'server/**/*.js').babel().target('dist/server');
}

export async function compile(fly) {
    await fly.parallel(['bin', 'server']);
}

export async function build(fly) {
    await fly.serial(['compile']);
}

export default async function (fly) {
    await fly.start('build');
    await fly.watch('server/**/*.js', 'server');
}

function notify(message) {
    return notifier.notify({
        title: 'Sand',
        message,
        icon: false
    });
}
