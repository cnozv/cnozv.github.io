
function getCategoryLabel(key) {
  return {
    game: "게임 개발 경험",
    activity: "대외활동",
    about: "ABOUT ME"
  }[key] || key;
}

function generateNavbarHTML(pages) {
  const grouped = { game: [], activity: [], about: [] };
  pages.forEach(p => {
    if (grouped[p.category]) {
      grouped[p.category].push(`<a href="/pages/${p.slug}.html">${p.title}</a>`);
    }
  });
  return `
<div class="navbar">
  <a href="/" class="home-button">박민지 포트폴리오</a>
  <div class="menu">
    ${Object.entries(grouped).map(([key, links]) => `
      <div class="dropdown">
        <a href="#">${getCategoryLabel(key)} ▼</a>
        <div class="dropdown-content">
          ${links.join('\n')}
        </div>
      </div>`).join('\n')}
  </div>
</div>`;
}

function generatePages() {
  fetch('data/pages.json')
    .then(res => res.json())
    .then(data => {
      return fetch('template.html')
        .then(res => res.text())
        .then(template => {
          const navbarHTML = generateNavbarHTML(data.pages);
          data.pages.forEach(page => {
            const filled = template
              .replace(/{{title}}/g, page.title)
              .replace(/{{description}}/g, page.description)
              .replace('{{content}}', page.content)
              .replace('{{pdf}}', page.pdf ? '<iframe src="' + page.pdf + '" width="100%" height="500px"></iframe>' : '')
              .replace('{{navbar}}', navbarHTML);
            const blob = new Blob([filled], { type: 'text/html' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `pages/${page.slug}.html`;
            a.click();
          });
        });
    });
}
