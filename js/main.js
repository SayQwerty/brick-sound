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

  const workUrls = C.works || {};
  document.querySelectorAll("[data-work]").forEach((card) => {
    const id = card.getAttribute("data-work");
    const url = workUrls[id];
    const link = card.querySelector(".work-link");
    if (!link || !url) return;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  });

  function vkNoAutoplay(src) {
    if (!src) return "";
    return src
      .replace(/([?&])autoplay=\d+/gi, "$1autoplay=0")
      .replace(/([?&])autoplay=0(&autoplay=0)+/gi, "$1autoplay=0")
      + ( /[?&]autoplay=/.test(src) ? "" : (src.indexOf("?") >= 0 ? "&" : "?") + "autoplay=0" );
  }

  function vkEmbedSrc(url) {
    if (!url) return "";
    var src = url;
    if (!/video_ext\.php/.test(url)) {
      const m = String(url).match(/video(-?\d+)_(\d+)/i);
      if (!m) return "";
      src = "https://vk.com/video_ext.php?oid=" + m[1] + "&id=" + m[2] + "&hd=2";
    }
    return vkNoAutoplay(src);
  }

  const vkList = Array.isArray(C.vkVideos) ? C.vkVideos : [];
  const vkSlides = document.querySelectorAll("[data-vk-slide]");
  vkSlides.forEach((slide, i) => {
    const item = vkList[i];
    if (!item) return;
    const src = vkEmbedSrc(item.embed || item.url);
    const frame = slide.querySelector("iframe");
    const cap = slide.querySelector(".vk-cap");
    if (frame && src) {
      frame.removeAttribute("allow");
      frame.setAttribute("allow", "encrypted-media; fullscreen; picture-in-picture");
      frame.src = src;
      if (item.title) frame.title = item.title;
    }
    if (cap && item.title) cap.textContent = item.title;
  });

  const track = document.querySelector("[data-vk-track]");
  const dots = document.querySelectorAll("[data-vk-dot]");
  const prev = document.querySelector("[data-vk-prev]");
  const next = document.querySelector("[data-vk-next]");
  function vkIndex() {
    if (!track || !vkSlides.length) return 0;
    const w = track.clientWidth || 1;
    return Math.max(0, Math.min(vkSlides.length - 1, Math.round(track.scrollLeft / w)));
  }
  function vkGo(i) {
    if (!track || !vkSlides[i]) return;
    track.scrollTo({ left: vkSlides[i].offsetLeft - track.offsetLeft, behavior: "smooth" });
  }
  function vkSync() {
    const i = vkIndex();
    dots.forEach((d, n) => d.classList.toggle("is-on", n === i));
  }
  if (track) {
    track.addEventListener("scroll", () => vkSync(), { passive: true });
    dots.forEach((d) => d.addEventListener("click", () => vkGo(+d.getAttribute("data-vk-dot"))));
    if (prev) prev.addEventListener("click", () => vkGo(Math.max(0, vkIndex() - 1)));
    if (next) next.addEventListener("click", () => vkGo(Math.min(vkSlides.length - 1, vkIndex() + 1)));
  }
})();
