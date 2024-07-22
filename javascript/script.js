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

    if (menuDrawer.classList.contains("open")) {
      document.body.classList.add("no-scroll");
      menuDrawer.style.display = "flex";
      setTimeout(() => {
        menuDrawer.style.opacity = "1";
        menuDrawer.style.transform = "translateZ(0)";
      }, 0);
    } else {
      document.body.classList.remove("no-scroll");
      menuDrawer.style.opacity = "0";
      menuDrawer.style.transform = "translateZ(100%)";
      setTimeout(() => {
        menuDrawer.style.display = "none";
      }, 400);
    }
  });

  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", function () {
      const svg = this.querySelector(".mySvg");
      const targetId = this.getAttribute("data-target");
      const targetDropdown = document.getElementById(targetId);

      if (targetDropdown.classList.contains("show")) {
        targetDropdown.classList.remove("show");
        svg.classList.remove("rotate");
      } else {
        dropDowns.forEach((dropDown) => dropDown.classList.remove("show"));
        dropdownMenus.forEach((menu) =>
          menu.querySelector(".mySvg").classList.remove("rotate")
        );

        targetDropdown.classList.add("show");
        svg.classList.add("rotate");
      }
    });
  });
});

// Ensure the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.querySelector('.main-slider-prev');
  const nextButton = document.querySelector('.main-slider-next');
  const slider = document.querySelector('.second-container'); // Target the slider container
  const sliderWidth = slider.scrollWidth;
  const containerWidth = slider.clientWidth;
  let scrollPosition = 0;

  // Move the slider to the left
  function moveLeft() {
    scrollPosition -= containerWidth;
    if (scrollPosition < 0) {
      scrollPosition = 0;
    }
    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Move the slider to the right
  function moveRight() {
    scrollPosition += containerWidth;
    if (scrollPosition > (sliderWidth - containerWidth)) {
      scrollPosition = sliderWidth - containerWidth;
    }
    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  // Attach event listeners to the buttons
  prevButton.addEventListener('click', moveLeft);
  nextButton.addEventListener('click', moveRight);
});
