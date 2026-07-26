# Свадебное приглашение — Талгат и Айжана

Одностраничный сайт-приглашение на свадьбу **11 сентября 2026**.

## Стек

- React 19 + TypeScript
- Vite 8
- Sass (SCSS)
- Шрифты: Monplesir, Montserrat, Great Vibes

## Секции

1. **Hero** — имена, дата, таймер до свадьбы, анимированный декор  
2. **Invitation** — текст приглашения, календарь с анимацией сердца  
3. **Schedule** — план мероприятия (таймлайн)  
4. **Venue** — адрес, карта Яндекса, кнопка маршрута  
5. **DressCode** — дресс-код  
6. **Rsvp** — анкета гостя (запись в Google Таблицы) + контакты организатора  

Почти во всех секциях — плавное появление при скролле.

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт откроется с `--host` (доступен с телефона в той же Wi‑Fi сети).

| Команда        | Описание              |
|----------------|------------------------|
| `npm run dev`  | Локальная разработка   |
| `npm run build`| Сборка в `dist/`       |
| `npm run preview` | Просмотр сборки     |
| `npm run lint` | Oxlint                 |

## Контент и данные

Основные данные свадьбы — в [`src/data/wedding.ts`](src/data/wedding.ts):

- имена
- дата для отображения и таймера
- время начала
- адрес и координаты площадки

## Анкета → Google Sheets

Ответы гостей пишутся в таблицу через Google Apps Script.

1. Настрой таблицу и скрипт по инструкции: [`docs/rsvp-google-sheets.md`](docs/rsvp-google-sheets.md)  
2. Код скрипта: [`scripts/google-sheets-rsvp.gs`](scripts/google-sheets-rsvp.gs)  
3. Локально создай `.env` в корне:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
```

4. Перезапусти `npm run dev` (Vite читает env только при старте).

Пример переменной: [`.env.example`](.env.example). Файл `.env` в git не коммитится.

### Колонки таблицы

| A | B | C |
|---|---|---|
| Дата и время | Имя и Фамилия | Присутствие |

## Деплой на Vercel

1. Импортируй репозиторий в [Vercel](https://vercel.com).  
2. Framework Preset: **Vite** (определится сам).  
3. **Settings → Environment Variables** добавь:

| Key | Value |
|-----|--------|
| `VITE_GOOGLE_SCRIPT_URL` | URL веб-приложения Apps Script |

Environments: Production (и при необходимости Preview).

4. Задеплой. После изменения env нужен **Redeploy** — переменные `VITE_*` подставляются на этапе сборки.

## Структура `src/`

```
src/
  components/     # Calendar, DecorBand
  data/           # wedding.ts
  hooks/          # useCountdown, useInView
  layouts/        # PageLayout
  sections/       # Hero, Invitation, Schedule, Venue, DressCode, Rsvp
  styles/         # reset, fonts, variables
  assets/         # декор, иконки тайминга
```

## Примечания

- Стили: `px` + media queries (`$bp-tablet: 768px`), без `clamp` / `rem`.  
- Цвет декора: `#072e00` с прозрачностью `0.22`.  
- Карта Яндекса — iframe-виджет; маршрут открывается во внешней вкладке.
