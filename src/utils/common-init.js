import { onUnmounted } from "vue";

// ✅ 커스텀 셀렉트 초기화
export function initializeCustomSelect(target, type) {
  const selects = document.querySelectorAll(target);

  selects.forEach((selectArea) => {
    const select = selectArea.querySelector("select");
    const options = select.querySelectorAll("option");
    const dropdownTemplate = `
      <div class="dropdown" tabindex="0">
        <span class="current"></span>
        <i class="icon icon-select"></i>
        <div class="list">
          <div class="scrollbar">
            <div class="scroll-content">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    `;

    if (!selectArea.querySelector(".dropdown") || type === "reset") {
      if (type === "reset") selectArea.querySelector(".dropdown").remove();
      selectArea.insertAdjacentHTML("beforeend", dropdownTemplate);

      const dropdown = selectArea.querySelector(".dropdown");
      const current = dropdown.querySelector(".current");
      const dropdownList = dropdown.querySelector("ul");

      current.textContent = select.options[select.selectedIndex]?.label || "";

      options.forEach((option) => {
        const li = document.createElement("li");
        li.className = `option ${option.selected ? "selected" : ""} ${
          option.disabled ? "disabled" : ""
        } ${option.className ? option.className : ""}`;
        li.dataset.value = option.value;
        li.innerHTML = `<span>${option.innerHTML}</span>`;
        dropdownList.appendChild(li);
      });

      setupDropdownEvents(selectArea, dropdown, select);
    }
  });

  // Outside click으로 열려있는 드롭다운 닫기
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
        dropdown.classList.remove("open");
      });
    }
  });
}

// ✅ 드롭다운 이벤트 설정
function setupDropdownEvents(selectArea, dropdown, select) {
  const current = dropdown.querySelector(".current");
  const options = dropdown.querySelectorAll(".option");

  dropdown.addEventListener("click", () => {
    if (selectArea.classList.contains("disabled")) return;
    document
      .querySelectorAll(".dropdown.open")
      .forEach((d) => d !== dropdown && d.classList.remove("open"));
    dropdown.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (option.classList.contains("disabled")) return;
      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      current.textContent = option.textContent;

      select.value = option.dataset.value;
      select.dispatchEvent(new Event("change"));
    });
  });

  dropdown.addEventListener("keydown", (e) => {
    const focusedOption =
      dropdown.querySelector(".option:focus") ||
      dropdown.querySelector(".option.selected");
    if (e.key === "Enter" || e.key === " ") {
      dropdown.classList.contains("open")
        ? focusedOption?.click()
        : dropdown.click();
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      navigateOptions(focusedOption, "next");
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      navigateOptions(focusedOption, "prev");
      e.preventDefault();
    } else if (e.key === "Escape") {
      dropdown.classList.remove("open");
      e.preventDefault();
    }
  });
}

// ✅ 키보드 방향키 이동
function navigateOptions(option, direction) {
  const sibling =
    direction === "next"
      ? option?.nextElementSibling
      : option?.previousElementSibling;
  if (sibling && !sibling.classList.contains("disabled")) {
    option.classList.remove("selected");
    sibling.classList.add("selected");
    sibling.focus();
  }
}

// ✅ 아코디언 초기화
export function initializeAccordion() {
  const accordions = document.querySelectorAll(".list-accordion > ul > li");

  accordions.forEach((accordionLi) => {
    const accordionTi = accordionLi.querySelector(".accordion-ti");

    if (
      accordionTi &&
      !accordionTi.classList.contains("nonactive") &&
      !accordionTi.dataset.accordionInitialized // ✅ 중복 방지
    ) {
      accordionTi.dataset.accordionInitialized = "true"; // ✅ 마킹
      accordionTi.addEventListener("click", () => {
        accordionLi.classList.toggle("active");
        const content = accordionLi.querySelector(".accordion-cont");
        if (content) {
          content.style.maxHeight = accordionLi.classList.contains("active")
            ? `${content.scrollHeight}px`
            : "0";
        }
      });
    }
  });
}
// ✅ 반응형 대응
export function setupResizeEvents() {
  const handleResize = () => {
    const wrap = document.querySelector(".ui-footer .organizations-wrap");
    const dim = document.querySelector(".all-dim");

    if (window.innerWidth <= 768) {
      wrap?.classList.remove("open");
      dim?.classList.remove("active");
      document.documentElement.style.overflowY = "scroll";
    }
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
}
