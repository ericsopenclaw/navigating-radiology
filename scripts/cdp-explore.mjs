import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, DOM, Runtime } = client;
  await Promise.all([Page.enable(), DOM.enable(), Runtime.enable()]);
  
  // Go to NotebookLM fresh
  await Page.navigate({ url: 'https://notebooklm.google.com/' });
  await Page.loadEventFired();
  await new Promise(r => setTimeout(r, 3000));
  
  // Get page content
  const { root } = await DOM.getDocument();
  const { content } = await DOM.getOuterHTML({ nodeId: root.nodeId });
  console.log('Page HTML length:', content.length);
  console.log('HTML preview:', content.substring(0, 2000));
  
  await client.close();
}

main().catch(e => { console.error(e.message); process.exit(1); });
