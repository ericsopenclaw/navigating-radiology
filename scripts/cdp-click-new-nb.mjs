import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);

  // Click "建立筆記本"
  const result = await Runtime.evaluate({
    expression: `
      const els = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const btn = els.find(el => el.textContent.includes('建立筆記本'));
      if (btn) { btn.click(); 'Clicked: ' + btn.textContent.trim(); }
      else { 'Not found. All: ' + els.map(e=>e.textContent.trim()).filter(Boolean).slice(0,10).join(' | '); }
    `
  });
  console.log('Result:', result.result.value);

  await new Promise(r => setTimeout(r, 2000));

  // Get current URL and body
  const { frameTree } = await Page.getFrameTree();
  console.log('URL after click:', frameTree.frame.url);

  const bodyText = await Runtime.evaluate({
    expression: 'document.body ? document.body.innerText.substring(0, 1500) : ""'
  });
  console.log('Page text:', bodyText.result.value);

  await client.close();
}

main().catch(e => console.error(e.message));
