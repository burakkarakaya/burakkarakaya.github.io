/* ── Content page: mobile sidebar dropdown toggle ── */
(function () {
  var toggle = document.getElementById("cpSidebarToggle");
  var nav = document.getElementById("cpSidebarNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("is-open");
    nav.classList.toggle("is-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  nav.querySelectorAll(".cp-sidebar-link").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
