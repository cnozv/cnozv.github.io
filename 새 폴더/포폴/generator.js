// generator.js
// pages.json 파일을 바탕으로 pages/ 폴더 내에 개별 HTML 파일들을 생성

async function generatePages() {
  const response = await fetch('data/pages.json');
  const data = await response.json();
  const pages = data.pages;

  const templateRes = await fetch('template.html');
  const templateText = await templateRes.text();

  pages.forEach(page => {
    let pageHTML = templateText
      .replace(/{{title}}/g, page.title)
      .replace(/{{description}}/g, page.description)
      .replace(/{{content}}/g, page.content || '')
      .replace(/{{pdf}}/g, page.pdf
        ? `<div class=\"iframe-container\"><iframe src=\"${page.pdf}\"></iframe></div>`
        : '');

    const blob = new Blob([pageHTML], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${page.slug}.html`;
    a.click();
  });
}

// generatePages()는 editor.html의 버튼 등에서 호출하여 실행