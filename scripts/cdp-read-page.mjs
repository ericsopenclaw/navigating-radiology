import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);
  
  const { frameTree } = await Page.getFrameTree();
  console.log('Current URL:', frameTree.frame.url);
  
  // Get body text
  const result = await Runtime.evaluate({
    expression: 'document.body ? document.body.innerText.substring(0, 2000) : "no body"'
  });
  console.log('Body text:', result.result.value);
  
  await client.close();
}

main().catch(e => console.error(e.message));
