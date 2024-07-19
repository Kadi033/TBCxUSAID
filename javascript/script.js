document.addEventListener("DOMContentLoaded", function () {
    const toggleMenu = document.querySelector(".toggle-menu");
    const menuDrawer = document.querySelector(".menu-drawer");
    const header = document.querySelector(".header-all-side");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");
    const dropDowns = document.querySelectorAll(".drop-down");

    toggleMenu.addEventListener("click", function (event) {
        event.preventDefault();
        this.classList.toggle("active");
        menuDrawer.classList.toggle("open");
        header.classList.toggle("menu-open");

        //i make Toggle no-scroll class on the body
        document.body.classList.toggle("no-scroll");
    });

    dropdownMenus.forEach((menu) => {
        menu.addEventListener("click", function () {
            const svg = this.querySelector('.mySvg');
            const targetId = this.getAttribute('data-target');
            const targetDropdown = document.getElementById(targetId);

            //I make Toggle the visibility of the clicked dropdown
            if (targetDropdown.classList.contains('show')) {
                targetDropdown.classList.remove('show');
                svg.classList.remove('rotate');
            } else {
                //I Hide all other dropdowns and remove SVG rotations
                dropDowns.forEach(dropDown => dropDown.classList.remove('show'));
                dropdownMenus.forEach(menu => menu.querySelector('.mySvg').classList.remove('rotate'));

                //I Show the clicked dropdown and rotate its SVG
                targetDropdown.classList.add('show');
                svg.classList.add('rotate');
            }
        });
    });
});
