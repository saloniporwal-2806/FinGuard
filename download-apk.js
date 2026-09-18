import fs from 'fs';
import path from 'path';

const REPO = 'saloniporwal-2806/FinGuard';

async function checkAndDownload() {
  console.log('Checking GitHub Actions for APK build...');

  try {
    const runsRes = await fetch(`https://api.github.com/repos/${REPO}/actions/runs`);
    const runsData = await runsRes.json();

    if (!runsData.workflow_runs || runsData.workflow_runs.length === 0) {
      console.log('No runs found yet.');
      return false;
    }

    const latestRun = runsData.workflow_runs[0];
    console.log(`Workflow Run #${latestRun.run_number} (${latestRun.head_commit?.message?.substring(0, 40)}...)`);
    console.log(`Status: ${latestRun.status} | Conclusion: ${latestRun.conclusion}`);

    if (latestRun.status === 'completed' && latestRun.conclusion === 'success') {
      console.log('Build succeeded! Checking releases and artifacts...');

      // Check Releases
      const relRes = await fetch(`https://api.github.com/repos/${REPO}/releases`);
      const relData = await relRes.json();

      if (Array.isArray(relData) && relData.length > 0) {
        const release = relData[0];
        const apkAsset = release.assets?.find(a => a.name.endsWith('.apk'));
        if (apkAsset && apkAsset.browser_download_url) {
          console.log(`Found direct APK download URL: ${apkAsset.browser_download_url}`);
          const apkRes = await fetch(apkAsset.browser_download_url);
          const buffer = await apkRes.arrayBuffer();
          const targetPath = path.resolve('FinGuard-AI.apk');
          fs.writeFileSync(targetPath, Buffer.from(buffer));
          const stats = fs.statSync(targetPath);
          console.log(`SUCCESS! APK downloaded directly to: ${targetPath}`);
          console.log(`File size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
          return true;
        }
      }
    }

    return false;
  } catch (err) {
    console.error('Check error:', err.message);
    return false;
  }
}

async function loop() {
  for (let i = 0; i < 50; i++) {
    const done = await checkAndDownload();
    if (done) {
      process.exit(0);
    }
    console.log(`Waiting 12 seconds for cloud compile... (attempt ${i + 1}/50)`);
    await new Promise(r => setTimeout(r, 12000));
  }
}

loop();
