// 네비게이션 메뉴 토글 함수
function toggleMenu(event) {
  event.stopPropagation();
  const menu = document.querySelector('.menu');
  menu.classList.toggle('show');
}

// 드롭다운 토글 함수
function toggleDropdown(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropdown = event.currentTarget.parentElement;
  dropdown.classList.toggle('open');
}

// 초기화 함수: 메뉴와 드롭다운 이벤트 설정
function initializeNavbar() {
  // 메뉴 버튼 클릭 이벤트 등록
  const menuButton = document.querySelector('.menu-button');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMenu);  // 메뉴 버튼 클릭 시 toggleMenu 호출
  }

  // 드롭다운 항목 클릭 이벤트 등록
  const dropdowns = document.querySelectorAll('.dropdown-toggle');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', toggleDropdown);  // 드롭다운 토글
  });
}

// DOMContentLoaded 이벤트가 발생하면 네비게이션 바 초기화
document.addEventListener('DOMContentLoaded', function() {
  // navbar.html을 fetch로 불러오기
  fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
      // navbar.html을 현재 페이지에 삽입
      const temp = document.createElement('div');
      temp.innerHTML = html;
      document.body.insertBefore(temp, document.body.firstChild);

      // 네비게이션 바 초기화
      initializeNavbar();  // 초기화 함수 호출
    })
    .catch(error => console.log('Error loading navbar:', error));
});
