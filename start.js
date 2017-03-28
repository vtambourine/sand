import Start from 'start';
import reporter from 'start-pretty-reporter';
import babel from 'start-babel';
import files from 'start-files';
import watch from 'start-watch';

const start = Start(reporter());

export function build() {
    return start(
        files('build/')
        files('server/')
    )
}
