(function () {
  const C = window.BS || {};
  const MAIL = "n.sarukhanov@gmail.com";
  if (C.wa) C.wa = C.wa.replace("wa.me/+", "wa.me/");

  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = C.wa || el.href;
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-tg]").forEach((el) => {
    el.href = C.tg || el.href;
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-vk]").forEach((el) => {
    el.href = C.vk || el.href;
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-avito]").forEach((el) => {
    el.href = C.avito || el.href;
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-map]").forEach((el) => {
    el.href = C.map || el.href;
    el.target = "_blank";
    el.rel = "noopener";
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
      const btn = form.querySelector("[type=submit]");
      if (btn) btn.disabled = true;

      const data = Object.fromEntries(new FormData(form).entries());
      data.page = location.pathname;
      data.utm = utm || "";
      data.source = document.referrer || "direct";

      const text = encodeURIComponent(
        "Заявка Brick Sound\n" +
          "Имя: " + (data.name || "") + "\n" +
          "Контакт: " + (data.contact || "") + "\n" +
          "Услуга: " + (data.service || "") + "\n" +
          "Окно: " + (data.when || "") + "\n" +
          "Комментарий: " + (data.comment || "") + "\n" +
          "Страница: " + data.page
      );

      try {
        const res = await fetch("https://formsubmit.co/ajax/" + MAIL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: data.name,
            contact: data.contact,
            service: data.service,
            when: data.when || "",
            comment: data.comment || "",
            page: data.page,
            utm: data.utm,
            source: data.source,
            _subject: "Заявка Brick Sound",
            _template: "table",
            _captcha: "false"
          })
        });
        const json = await res.json().catch(function () { return {}; });
        if (!res.ok && json.success === false) throw new Error("mail");
      } catch (err) {
        if (btn) btn.disabled = false;
        alert("Не удалось отправить на почту. Напишите, пожалуйста, в WhatsApp.");
        return;
      }

      form.style.display = "none";
      const ok = document.querySelector(".form-ok");
      if (ok) ok.style.display = "block";
      const waBtn = ok && ok.querySelector("[data-wa-msg]");
      if (waBtn) {
        const base = (C.wa || "https://wa.me/79169738849").replace(/\?.*$/, "");
        waBtn.href = base + (base.indexOf("?") >= 0 ? "&" : "?") + "text=" + text;
        waBtn.target = "_blank";
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
      const msg = encodeURIComponent("Привет! Пришлите, пожалуйста, примеры работ.");
      if (C.wa) location.href = C.wa + (C.wa.indexOf("?") >= 0 ? "&" : "?") + "text=" + msg;
      else if (C.avito) window.open(C.avito, "_blank");
    });
  });
})();
