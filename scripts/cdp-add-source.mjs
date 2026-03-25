import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);
  
  // Find and click "新增來源" button
  const result = await Runtime.evaluate({
    expression: `
      const buttons = Array.from(document.querySelectorAll('button, div[role="button"], span'));
      const btn = buttons.find(el => el.textContent.trim() === '新增來源');
      if (btn) {
        btn.click();
        'Clicked: ' + btn.textContent;
      } else {
        'Button not found. All buttons: ' + buttons.map(b => b.textContent.trim()).filter(Boolean).join(', ');
      }
    `
  });
  console.log('Result:', result.result.value);
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Check what happened
  const bodyText = await Runtime.evaluate({
    expression: 'document.body ? document.body.innerText.substring(0, 1000) : ""'
  });
  console.log('After click:', bodyText.result.value);
  
  await client.close();
}

main().catch(e => console.error(e.message));
