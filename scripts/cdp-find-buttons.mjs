import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime, DOM } = client;
  await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

  // Get frame ID
  const { frameTree } = await Page.getFrameTree();
  console.log('Frame URL:', frameTree.frame.url);

  // Simple button find
  const result = await Runtime.evaluate({
    expression: `
      document.querySelectorAll('button').length + ' buttons found';
      Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.textContent.trim().substring(0,30),
        aria: b.getAttribute('aria-label') || '',
        classes: b.className
      })).slice(0, 15);
    `
  });
  console.log('Buttons:', JSON.stringify(result.result, null, 2));

  await client.close();
}

main().catch(e => console.error(e.message));
