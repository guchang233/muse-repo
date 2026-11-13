// The repository is the catalog database. No REST API, token, or dependencies.
import {execFileSync} from 'node:child_process';
import fs from 'node:fs/promises';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:32*1024*1024});
const commit=git('rev-parse','HEAD').trim();
const branch=process.env.GITHUB_REF_NAME||git('branch','--show-current').trim()||'main';
const records=git('ls-tree','-r','-l','-z','HEAD').split('\0').filter(Boolean);
const scores=[];
for(const row of records){
  const match=row.match(/^\d+ blob ([a-f0-9]{40})\s+(\d+)\t([\s\S]+)$/);
  if(!match)continue;
  const [,sha,size,path]=match,folder=path.split('/')[0].toLowerCase(),ext=path.split('.').pop().toLowerCase();
  if(!['mid','mscz','pdf'].includes(folder)||!path.includes('/')||(ext!==folder&&!(folder==='mid'&&ext==='midi')))continue;
  scores.push({path,name:path.split('/').pop().replace(/\.[^.]+$/,''),ext:folder,size:Number(size),sha});
}
scores.sort((a,b)=>a.path.localeCompare(b.path,'zh-CN'));
const catalog={version:1,repo:'guchang233/muse-repo',branch,commit,updatedAt:Date.now(),scores};
await fs.writeFile('catalog.json',JSON.stringify(catalog,null,2)+'\n');
console.log('Indexed '+scores.length+' scores at '+commit);

