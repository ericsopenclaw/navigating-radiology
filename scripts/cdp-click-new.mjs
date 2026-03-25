import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime, DOM } = client;
  await Promise.all([Page.enable(), DOM.enable(), Runtime.enable()]);
  
  // Check current frame URL
  const { frameTree } = await Page.getFrameTree();
  console.log('Current URL:', frameTree.frame.url);
  
  // Get the document
  const { root } = await DOM.getDocument();
  
  // Find elements that might be the New button
  const buttons = await DOM.querySelectorAll({ selector: 'button', root: root.nodeId });
  console.log('Button count:', buttons.nodeIds.length);
  
  // Check document.body text content
  const bodyResult = await Runtime.evaluate({
    expression: 'document.body ? document.body.innerText.substring(0, 1000) : "no body"'
  });
  console.log('Body text:', bodyResult.result.value);
  
  await client.close();
}

main().catch(e => console.error(e.message));
