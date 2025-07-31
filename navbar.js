fetch('/navbar.html')
  .then(res => res.text())
  .then(html => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    document.body.insertBefore(temp, document.body.firstChild);
  });
