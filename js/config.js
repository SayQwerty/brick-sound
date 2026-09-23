window.BS = {
  brand: "Brick Sound",
  room: "Маяк",
  phoneDisplay: "+7 916 973-88-49",
  phoneHref: "tel:+79169738849",
  wa: "https://wa.me/79169738849",
  tg: "https://t.me/Say_Qwerty",
  vk: "https://vk.com/studiobrick",
  avito: "https://www.avito.ru/moskva/predlozheniya_uslug/studiya_zvukozapisi_mayak_na_tverskoy_7830313295",
  email: "n.sarukhanov@gmail.com",
  address: "Москва, Садовая-Триумфальная ул., 4-10",
  hours: "ежедневно 10:00–24:00",
  map: "https://yandex.ru/maps/?rtext=~55.7694,37.5958&rtt=auto",
  mapWidget: "https://yandex.ru/map-widget/v1/?ll=37.5958%2C55.7694&z=16&pt=37.5958,55.7694,pm2rdl&l=map",
  formEndpoint: "",
  metrikaId: "",

  /* Примеры работ на главной (#works).
     Сюда подставляйте актуальные ссылки (YouTube, VK Video, SoundCloud, Яндекс Музыка и т.п.).
     Ключ должен совпадать с data-work у карточки в index.html.
     Сейчас стоят заглушки example.com — клик по фото уже открывает url. */
  works: {
    aiver: "https://example.com/works/aiver",
    jenoth: "https://example.com/works/jenoth",
    ulybaysya: "https://example.com/works/ulybaysya",
    iris: "https://example.com/works/iris"
  },

  /* Три VK-видео под блоком «Примеры работ».
     Вставьте обычную ссылку вида https://vk.com/video-OID_ID
     или готовый embed https://vk.com/video_ext.php?oid=...&id=...
     main.js сам соберёт iframe. */
  vkVideos: [
    { title: "Аивер – Улыбайлся (акустика)", url: "https://vk.ru/studiobrick?z=clip-17542948_456239740%3Ftracker%3D%257B%2522primaryKey%2522%253A%2522clips_click_top_feed%2522%252C%2522steps%2522%253A%255B%2522modal_open_click%2522%252C%2522modal_init_start%2522%252C%2522modal_first_clip_ready%2522%252C%2522modal_feed_ready%2522%252C%2522modal_init_end%2522%255D%252C%2522mask%2522%253A1%257D" },
    { title: "KOTOVA – Lost & Found (Lianne La Havas cover)", url: "https://vk.ru/studiobrick?z=video-234146770_456239018%2Fff3042ac61c1d47be5" },
    { title: "Аивер – акустический лайв", url: "https://vk.ru/studiobrick?z=clip-17542948_456239727%3Ftracker%3D%257B%2522primaryKey%2522%253A%2522clips_click_top_feed%2522%252C%2522steps%2522%253A%255B%2522modal_open_click%2522%252C%2522modal_init_start%2522%252C%2522modal_first_clip_ready%2522%252C%2522modal_feed_ready%2522%252C%2522modal_init_end%2522%255D%252C%2522mask%2522%253A1%257D" }
  ]
};
