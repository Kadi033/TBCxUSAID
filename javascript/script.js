document.addEventListener("DOMContentLoaded", () => {
  const toggleMenu = document.querySelector(".toggle-menu");
  const menuDrawer = document.querySelector(".menu-drawer");
  const header = document.querySelector(".header-all-side");

  if (toggleMenu && menuDrawer && header) {
    toggleMenu.addEventListener("click", (event) => {
      event.preventDefault();
      toggleMenu.classList.toggle("active");
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
  }

  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  const dropDowns = document.querySelectorAll(".drop-down");

  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", () => {
      const svg = menu.querySelector(".mySvg");
      const targetId = menu.getAttribute("data-target");
      const targetDropdown = document.getElementById(targetId);

      if (targetDropdown) {
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
      }
    });
  });

  document.querySelectorAll(".dropdown-menu2").forEach((menu) => {
    menu.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetDropdown = document.getElementById(targetId);

      if (targetDropdown) {
        document.querySelectorAll(".drop-down2").forEach((dropdown) => {
          if (dropdown !== targetDropdown) {
            dropdown.style.display = "none";
          }
        });

        targetDropdown.style.display =
          targetDropdown.style.display === "block" ? "none" : "block";
      }
    });
  });

  // const prevButton = document.querySelector(".main-slider-prev");
  // const nextButton = document.querySelector(".main-slider-next");
  // const slider = document.querySelector(".second-container");

  // if (prevButton && nextButton && slider) {
  //   const containerWidth = slider.clientWidth;
  //   let scrollPosition = 0;

  //   const moveLeft = () => {
  //     scrollPosition -= containerWidth;
  //     if (scrollPosition < 0) scrollPosition = 0;
  //     slider.scrollTo({
  //       left: scrollPosition,
  //       behavior: "smooth",
  //     });
  //   };

  //   const moveRight = () => {
  //     scrollPosition += containerWidth;
  //     if (scrollPosition > slider.scrollWidth - containerWidth)
  //       scrollPosition = slider.scrollWidth - containerWidth;
  //     slider.scrollTo({
  //       left: scrollPosition,
  //       behavior: "smooth",
  //     });
  //   };

  //   prevButton.addEventListener("click", moveLeft);
  //   nextButton.addEventListener("click", moveRight);
  // }

  const menuItems = document.querySelectorAll(".products-menu");
  const dropdownLists = document.querySelectorAll(".header_dropdown-list");
  const headerDropPadding = document.querySelector(".header-drop-padding");

  function handleResize() {
    if (window.innerWidth < 991) {
      headerDropPadding.style.display = "none";
    } else {
      if (
        Array.from(dropdownLists).some((dropdown) =>
          dropdown.classList.contains("visible")
        )
      ) {
        headerDropPadding.style.display = "block";
      }
    }
  }

  function handleClickOutside(event) {
    if (
      !headerDropPadding.contains(event.target) &&
      !Array.from(menuItems).some((menuItem) => menuItem.contains(event.target))
    ) {
      headerDropPadding.style.display = "none";
      dropdownLists.forEach((dropdown) => {
        dropdown.classList.remove("visible");
      });

      document.querySelectorAll(".under-scale").forEach((el) => {
        el.classList.remove("active");
      });
    }
  }

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", function () {
      const sectionNumber = this.getAttribute("data-section");
      const targetDropdown = document.querySelector(
        `.header_dropdown-list:nth-of-type(${sectionNumber})`
      );

      const isDropdownVisible =
        targetDropdown && targetDropdown.classList.contains("visible");

      dropdownLists.forEach((dropdown) => {
        dropdown.classList.remove("visible");
      });

      if (!isDropdownVisible) {
        headerDropPadding.style.display = "block";
        headerDropPadding.classList.add("visible");
        if (targetDropdown) {
          targetDropdown.classList.add("visible");
        }
      } else {
        headerDropPadding.style.display = "none";
        headerDropPadding.classList.remove("visible");
      }
    });
  });

  dropdownLists.forEach((dropdown) => {
    dropdown.classList.remove("visible");
  });

  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleClickOutside);
  handleResize();

  const underScaleMenuItems = document.querySelectorAll(".products-menu");
  underScaleMenuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", function () {
      const underScale = this.nextElementSibling;
      const isActive = underScale.classList.contains("active");
      document.querySelectorAll(".under-scale").forEach((el) => {
        el.classList.remove("active");
      });

      if (!isActive) {
        underScale.classList.add("active");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const sliderInner = document.querySelector(".slider-inner");
  const progressBar = document.querySelector(".progress-bar");
  const slides = document.querySelectorAll(".slide-img");
  const totalSlides = slides.length;
  const slideWidth = slides[0].clientWidth; 
  const maxTranslateX = -820; 

  let currentIndex = 0;
  let isPressDown = false;
  let cursorXSpace;

  function moveToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1)); 
    const newLeft = -currentIndex * slideWidth;
    sliderInner.style.transition = "transform 0.5s ease";
    sliderInner.style.transform = `translateX(${Math.max(
      newLeft,
      maxTranslateX
    )}px)`; 
    const percentage = (currentIndex / (totalSlides - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  slider.addEventListener("mousedown", (e) => {
    isPressDown = true;
    cursorXSpace = e.clientX - sliderInner.getBoundingClientRect().left;
    slider.style.cursor = "grabbing"; 
  });

  window.addEventListener("mouseup", () => {
    isPressDown = false;
    slider.style.cursor = "grab"; 
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isPressDown) return;
    e.preventDefault();
    let newLeft =
      e.clientX - cursorXSpace - slider.getBoundingClientRect().left;

    const minLeft = slider.clientWidth - sliderInner.scrollWidth;
    newLeft = Math.max(newLeft, minLeft);
    newLeft = Math.min(newLeft, 0);

    sliderInner.style.transition = "none"; 
    sliderInner.style.transform = `translateX(${Math.max(
      newLeft,
      maxTranslateX
    )}px)`;

    const scrollWidth = sliderInner.scrollWidth;
    const percentage =
      (Math.abs(newLeft) / (scrollWidth - slider.clientWidth)) * 100;
    progressBar.style.width = `${percentage}%`;
  });

  const prevArrow = document.querySelector(".main-slider-prev");
  const nextArrow = document.querySelector(".main-slider-next");

  prevArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      moveToIndex(currentIndex - 1);
    }
  });

  nextArrow.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      moveToIndex(currentIndex + 1);
    }
  });
});
