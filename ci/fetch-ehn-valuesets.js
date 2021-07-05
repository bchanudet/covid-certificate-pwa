const getGithubCode = require('get-github-code');

const url = 'https://github.com/ehn-dcc-development/ehn-dcc-valuesets';

getGithubCode.download(url, {output: './src/app/references'})
    .then(() => {
        console.log('success');
    })
    .catch(console.error);
