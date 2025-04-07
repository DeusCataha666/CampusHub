const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarLinks = sidebar.querySelectorAll('a');
const closeSidebarButton = document.getElementById('close-sidebar');

function toggleSidebar() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

menuButton.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);
sidebarLinks.forEach(link => {
  link.addEventListener('click', toggleSidebar);
});

closeSidebarButton.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});


