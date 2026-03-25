import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);

  const { frameTree } = await Page.getFrameTree();
  console.log('URL:', frameTree.frame.url);

  const bodyText = await Runtime.evaluate({
    expression: 'document.body ? document.body.innerText.substring(0, 1500) : ""'
  });
  console.log('Page:', bodyText.result.value);

  await client.close();
}

main().catch(e => console.error(e.message));
