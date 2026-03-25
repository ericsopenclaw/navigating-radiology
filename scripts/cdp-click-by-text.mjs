import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime } = client;
  await Promise.all([Page.enable(), Runtime.enable()]);

  // Try clicking by text content directly
  const result = await Runtime.evaluate({
    expression: `
      (function() {
        const all = document.querySelectorAll('*');
        for (let el of all) {
          if (el.childNodes.length === 0 && 
              el.textContent.trim() === '建立筆記本' && 
              el.offsetWidth > 0) {
            el.click();
            return 'Clicked: ' + el.tagName + ' - ' + el.textContent;
          }
        }
        return '建立筆記本 not found';
      })()
    `
  });
  console.log('Result:', result.result.value);

  await new Promise(r => setTimeout(r, 2000));

  const bodyText = await Runtime.evaluate({
    expression: 'window.location.href + " | " + document.body.innerText.substring(0, 500)'
  });
  console.log('After click:', bodyText.result.value);

  await client.close();
}

main().catch(e => console.error(e.message));
