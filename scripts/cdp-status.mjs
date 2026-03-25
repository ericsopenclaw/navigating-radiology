import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);
  
  const { frameTree } = await Page.getFrameTree();
  console.log('URL:', frameTree.frame.url);
  console.log('Title:', frameTree.frame.title || '(no title)');
  
  // Try to evaluate something on the page
  try {
    const result = await Runtime.evaluate({ expression: 'document.title' });
    console.log('Document title:', result.result.value);
  } catch(e) {
    console.log('Runtime eval failed:', e.message);
  }
  
  await client.close();
}

main().catch(e => console.error(e.message));
