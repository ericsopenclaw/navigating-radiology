import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, DOM } = client;
  await Promise.all([Page.enable(), DOM.enable()]);
  
  const { frameTree } = await Page.getFrameTree();
  console.log('Main frame URL:', frameTree.frame.url);
  console.log('Frame ID:', frameTree.frame.id);
  
  // Get document
  const { root } = await DOM.getDocument();
  console.log('DOM ready');
  
  await client.close();
  console.log('Connected OK!');
}

main().catch(e => { console.error(e.message); process.exit(1); });
