const ghc = require('get-github-code');
const glob = require('glob');
const fs = require('fs/promises');

const outDir = './src/app/references';
const url = 'https://github.com/ehn-dcc-development/ehn-dcc-valuesets';

const template = `
/* THIS FILE IS AUTO-GENERATED
---------------------------------------------
 Run \`node ./ci/fetch-ehn-valuesets.js\` to
 regenerate up-to-date values from the official
 repository.
--------------------------------------------*/

export interface Record {
  id: string,
  %%MEMBERS%%
}

export const values: Record[] = %%RECORDS%%
`
let t = async function(){

  // cleanup
  tsToRemove = glob.sync(outDir + '/*.ts');
  tsToRemove.forEach(async element => {
    await fs.unlink(element);
  });

  // download data
  const tmpFolder = await fs.mkdtemp('./tmp/ci-');
  await ghc.download(url, {output: tmpFolder});
  console.log('success');

  // copy licence
  await fs.copyFile(tmpFolder + '/LICENSE', outDir + '/LICENCE')

  // treating files
  jsonFiles = glob.sync(tmpFolder + "/**/*.json");
  for(let i=0, l=jsonFiles.length; i<l; i+= 1){
    const file = jsonFiles[i];

    console.log('treating file', file);
    const data = await fs.readFile(file).then(j => JSON.parse(j));
    const values = data.valueSetValues;

    let content = template;
    let members = "";
    let records = [];
    for(let v in values){
      if(members === ''){
        for(let m in values[v]){
          members += '\r\n\t' + m + ': ' + (typeof values[v][m]) +','
        }
      }

      let record = {
        id: ''+v
      }
      for(var m in values[v]){
        record[m] = values[v][m];
      }

      records.push(record);
    }

    content = content.replace('%%MEMBERS%%', members);
    content = content.replace('%%RECORDS%%', JSON.stringify(records, null, 2));

    await fs.writeFile(file.replace(tmpFolder, outDir).replace('.json', '.ts'), content);

  }

};

t();
