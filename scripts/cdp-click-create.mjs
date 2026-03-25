import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);

  // Find all clickable elements
  const result = await Runtime.evaluate({
    expression: `
      Array.from(document.querySelectorAll('*'))
        .filter(el => el.children.length === 0 && el.textContent.trim())
        .map(el => ({ 
          tag: el.tagName, 
          text: el.textContent.trim().substring(0,50), 
          rect: el.getBoundingClientRect ? JSON.stringify(el.getBoundingClientRect()) : 'n/a',
          visible: el.offsetWidth > 0 && el.offsetHeight > 0
        }))
        .filter(el => el.visible && el.text.length > 2)
        .slice(0, 30);
    `
  });
  console.log('Elements:', JSON.stringify(result.result.value, null, 2));
  
  await client.close();
}

main().catch(e => console.error(e.message));
