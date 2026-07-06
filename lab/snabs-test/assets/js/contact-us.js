/* ── Contact form: show order number field when subject is "Sipariş Hakkında" ── */
(function () {
  var subject = document.getElementById("cu-subject");
  var orderField = document.getElementById("cuOrderField");
  if (!subject || !orderField) return;

  subject.addEventListener("change", function () {
    var show = subject.value === "Sipariş Hakkında" || subject.value === "İade & Değişim";
    orderField.style.display = show ? "flex" : "none";
  });
})();

/* ── Contact form: demo submit (Shopify handles real submission) ── */
(function () {
  var form = document.getElementById("cuContactForm");
  var success = document.getElementById("cuFormSuccess");
  if (!form || !success) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    success.style.display = "flex";
    form.reset();
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();
