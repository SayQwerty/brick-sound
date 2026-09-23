(function () {
  const C = window.BS || {};

  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = C.wa || el.href;
  });
  document.querySelectorAll("[data-tg]").forEach((el) => {
    el.href = C.tg || el.href;
  });
  document.querySelectorAll("[data-vk]").forEach((el) => {
    el.href = C.vk || el.href;
  });
  document.querySelectorAll("[data-avito]").forEach((el) => {
    el.href = C.avito || el.href;
  });
  document.querySelectorAll("[data-map]").forEach((el) => {
    el.href = C.map || el.href;
  });
  document.querySelectorAll("[data-tel]").forEach((el) => {
    if (C.phoneHref) el.href = C.phoneHref;
    else el.style.display = "none";
  });

  const iframe = document.querySelector("[data-map-widget]");
  if (iframe && C.mapWidget) iframe.src = C.mapWidget;

  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const cookie = document.querySelector(".cookie");
  if (cookie && !localStorage.getItem("bs-cookie")) {
    cookie.style.display = "block";
    cookie.querySelector("button")?.addEventListener("click", () => {
      localStorage.setItem("bs-cookie", "1");
      cookie.style.display = "none";
    });
  }

  const params = new URLSearchParams(location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .map((k) => (params.get(k) ? k + "=" + params.get(k) : ""))
    .filter(Boolean)
    .join("&");

  const form = document.querySelector("#lead-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.querySelector("[name=company]")?.value) return;
      if (!form.querySelector("[name=agree]")?.checked) {
        alert("Нужно согласие на обработку персональных данных");
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      data.page = location.pathname;
      data.utm = utm;
      data.source = document.referrer || "direct";

      const text = encodeURIComponent(
        "Заявка Brick Sound\n" +
          "Имя: " + (data.name || "") + "\n" +
          "Контакт: " + (data.contact || "") + "\n" +
          "Услуга: " + (data.service || "") + "\n" +
          "Окно: " + (data.when || "") + "\n" +
          "Комментарий: " + (data.comment || "") + "\n" +
          "Страница: " + data.page + "\n" +
          (utm ? "UTM: " + utm : "")
      );

      const payload = new URLSearchParams();
      payload.set("form-name", "lead");
      ["name", "contact", "service", "when", "comment", "page", "utm", "source"].forEach((k) => {
        payload.set(k, data[k] || "");
      });
      payload.set("agree", data.agree ? "yes" : "no");
      try {
        const dest = C.formEndpoint || "/";
        const isJson = /formspree|json/i.test(dest) && dest !== "/";
        await fetch(dest, {
          method: "POST",
          headers: isJson
            ? { "Content-Type": "application/json", Accept: "application/json" }
            : { "Content-Type": "application/x-www-form-urlencoded" },
          body: isJson ? JSON.stringify(data) : payload.toString()
        });
      } catch (err) {}

      form.style.display = "none";
      const ok = document.querySelector(".form-ok");
      if (ok) ok.style.display = "block";
      const waBtn = ok?.querySelector("[data-wa-msg]");
      if (waBtn) {
        const base = (C.wa || "https://wa.me/").replace(/\?.*$/, "");
        waBtn.href = base + (base.includes("?") ? "&" : "?") + "text=" + text;
      }
      if (window.ym && C.metrikaId) {
        window.ym(C.metrikaId, "reachGoal", "form_submit");
      }
    });
  }

  document.querySelectorAll("[data-goal]").forEach((el) => {
    el.addEventListener("click", () => {
      if (window.ym && C.metrikaId) window.ym(C.metrikaId, "reachGoal", el.dataset.goal);
    });
  });

  document.querySelectorAll(".work button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = C.wa || C.avito;
      const msg = encodeURIComponent("Привет! Пришлите, пожалуйста, примеры работ.");
      if (C.wa) location.href = C.wa + (C.wa.includes("?") ? "&" : "?") + "text=" + msg;
      else window.open(url, "_blank");
    });
  });
})();
