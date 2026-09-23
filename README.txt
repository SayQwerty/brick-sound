Brick Sound — статический сайт по ТЗ v1.0
==========================================

Что внутри
- Главная-лендинг со всеми блоками ТЗ
- Посадочные: zapis-vokala, podcast, pesnya-pod-klyuch, arenda
- privacy, 404, robots, sitemap
- Фото с Авито объявления «Маяк» (реальные)

Перед продом откройте js/config.js и пропишите:
- wa / tg / vk / phone
- formEndpoint (Formspree или Telegram-бот)
- metrikaId
- юрлицо в privacy.html и подвале
- works — ссылки на примеры работ
- vkVideos — три ссылки на VK-видео

Запуск локально
  python3 -m http.server 8080
  открыть http://127.0.0.1:8080/

Примеры работ: js/config.js → works
VK-видео под ними: js/config.js → vkVideos
Формат: https://vk.com/video-OID_ID
На компьютере три в ряд, на телефоне слайдер по одному
