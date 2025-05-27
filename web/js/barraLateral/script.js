document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    const menuItems = document.querySelectorAll('.menu-item');
    const subMenuItems = document.querySelectorAll('.submenu-item');

    if (menu) {
        menu.addEventListener('click', () => {
            sidebar.classList.toggle('menu-toggle');
            menu.classList.toggle('menu-toggle');
            main.classList.toggle('menu-toggle');
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            if (!sidebar.classList.contains('menu-toggle')) {
                sidebar.classList.add('menu-toggle');
                menu.classList.add('menu-toggle');
                main.classList.add('menu-toggle');
                return;
            }

            document.querySelectorAll('.menu-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    let submenu = activeItem.nextElementSibling;
                    if (submenu && submenu.classList.contains('submenu')) {
                        submenu.style.maxHeight = '0px';
                        submenu.classList.remove('open');
                    }
                }
            });

            item.classList.toggle('active');
            let submenu = item.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.style.maxHeight = submenu.classList.contains('open') ? '0px' : (submenu.scrollHeight * 2) + 'px';
                submenu.classList.toggle('open');
            }

            menuItems.forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    subMenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            if (!sidebar.classList.contains('menu-toggle')) {
                sidebar.classList.add('menu-toggle');
                menu.classList.add('menu-toggle');
                main.classList.add('menu-toggle');
                return;
            }

            document.querySelectorAll('.submenu-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    let submenu = activeItem.nextElementSibling;
                    if (submenu && submenu.classList.contains('sub-submenu')) {
                        submenu.style.maxHeight = '0px';
                        submenu.classList.remove('open');
                    }
                }
            });

            item.classList.toggle('active');
            let submenu = item.nextElementSibling;
            if (submenu && submenu.classList.contains('sub-submenu')) {
                submenu.style.maxHeight = submenu.classList.contains('open') ? '0px' : (submenu.scrollHeight * 1) + 'px';
                submenu.classList.toggle('open');
            }
        });
    });
});

// Modo Escuro Persistente

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('darkMode');
    const body = document.body;
    const main = document.querySelector('main');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    function applyDarkMode() {
        if (localStorage.getItem('dark-mode') === 'enabled') {
            body.classList.add('dark-mode');
            if (main) main.classList.add('dark-mode');
            if (dropdownMenu) dropdownMenu.classList.add('dropdown-menu-dark');
            if (toggleSwitch) toggleSwitch.checked = true;
        } else {
            body.classList.remove('dark-mode');
            if (main) main.classList.remove('dark-mode');
            if (dropdownMenu) dropdownMenu.classList.remove('dropdown-menu-dark');
            if (toggleSwitch) toggleSwitch.checked = false;
        }
    }

    // Aplica o tema salvo no localStorage
    applyDarkMode();

    // Garante que o tema seja reaplicado ao voltar para a página
    window.addEventListener('pageshow', applyDarkMode);

    // Verifica se o botão de alternância existe antes de adicionar o evento
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', () => {
            body.classList.add('transition-mode');

            setTimeout(() => {
                if (toggleSwitch.checked) {
                    body.classList.add('dark-mode');
                    if (main) main.classList.add('dark-mode');
                    if (dropdownMenu) dropdownMenu.classList.add('dropdown-menu-dark');
                    localStorage.setItem('dark-mode', 'enabled');
                } else {
                    body.classList.remove('dark-mode');
                    if (main) main.classList.remove('dark-mode');
                    if (dropdownMenu) dropdownMenu.classList.remove('dropdown-menu-dark');
                    localStorage.setItem('dark-mode', 'disabled');
                }
            }, 150);
        });
    }
});