const args = [ 'start' ];
const opts = {stdio: 'inherit', cwd: 'front-end', shell: true};
require('child_process').spawn('npm', args, opts);
