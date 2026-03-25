import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);

  // Close dialog and check all buttons
  const result = await Runtime.evaluate({
    expression: `
      // Close any open dialogs
      const closeBtn = Array.from(document.querySelectorAll('button, div[role="button"]')).find(el => el.textContent.includes('close') || el.getAttribute('aria-label')?.includes('close'));
      if (closeBtn) { closeBtn.click(); }
      
      // List all buttons
      Array.from(document.querySelectorAll('button, div[role="button"], a[href]'))
        .map(el => ({ tag: el.tagName, text: el.textContent.trim().substring(0,50), href: el.href || '' }))
        .filter(el => el.text || el.href)
        .slice(0, 20);
    `
  });
  console.log('All elements:', JSON.stringify(result.result.value, null, 2));

  await new Promise(r => setTimeout(r, 1500));

  const bodyText = await Runtime.evaluate({
    expression: 'document.body ? document.body.innerText.substring(0, 2000) : ""'
  });
  console.log('Body:', bodyText.result.value);

  await client.close();
}

main().catch(e => console.error(e.message));
