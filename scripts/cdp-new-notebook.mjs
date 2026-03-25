import CDP from 'chrome-remote-interface';

async function main() {
  const client = await CDP({ port: 9222 });
  const { Page, Runtime, DOM } = client;
  await Promise.all([Page.enable(), DOM.enable(), Runtime.enable()]);
  
  // Get the existing NotebookLM tab
  const targets = await client.targets();
  console.log('All tabs/pages:', targets.map(t => ({url: t.url(), type: t.type()})));
  
  // Try to click "New" button via JS
  const result = await Runtime.evaluate({
    expression: `
      // Find buttons with "新" or "New" text
      Array.from(document.querySelectorAll('button, div[role="button"]'))
        .find(el => el.textContent.includes('新建') || el.textContent.includes('新 notebook') || el.textContent.includes('New'))
    `
  });
  console.log('Found button:', result.result ? JSON.stringify(result.result) : 'none');
  
  await client.close();
}

main().catch(e => console.error(e.message));
