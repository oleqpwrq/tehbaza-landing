"use client";

import React, { useState } from "react";
import type { FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

type Model = {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  load: string;
  height: string;
  speed: string;
};

const MODELS: Model[] = [
  {
    name: "Телескопический погрузчик 625H Comfort",
    imageSrc: "/images/models/tb-160.jpg",
    imageAlt: "Телескопический погрузчик 625H Comfort",
    load: "Номинальная грузоподъемность 2500 kg",
    height: "Максимальная высота подъема 5.85 m",
    speed: "Мощность двигателя (kW) 55.4 kW",
  },
  {
    name: "Телескопический погрузчик MT-X 735",
    imageSrc: "/images/models/tb-510.jpg",
    imageAlt: "Телескопический погрузчик MT-X 735",
    load: "Номинальная грузоподъемность 3500 kg",
    height: "Максимальная высота подъема 6.9 m",
    speed: "Мощность двигателя (kW) 70 kW",
  },
  {
    name: "Телескопический погрузчик MRT-X 2570",
    imageSrc: "/images/models/tb-530.jpg",
    imageAlt: "Телескопический погрузчик MRT-X 2570",
    load: "Номинальная грузоподъемность 7000 kg",
    height: "Максимальная высота подъема 24.8 m",
    speed: "Мощность двигателя (kW) 127 kW",
  },
  {
    name: "Телескопический погрузчик MRT-X 3570",
    imageSrc: "/images/models/tb-570.jpg",
    imageAlt: "Телескопический погрузчик MRT-X 3570",
    load: "Номинальная грузоподъемность 7000 kg",
    height: "Максимальная высота подъема 34.7 m",
    speed: "Мощность двигателя (kW) 155 kW",
  },
  {
    name: "Телескопический погрузчик MT-X 1440",
    imageSrc: "/images/models/tb-590.jpg",
    imageAlt: "Телескопический погрузчик MT-X 1440",
    load: "Номинальная грузоподъемность 4000 kg",
    height: "Максимальная высота подъема 13.53 m",
    speed: "Мощность двигателя (kW) 74.5 kW",
  },
  {
    name: "Телескопический погрузчик MT-X 1840A",
    imageSrc: "/images/models/tb-630.jpg",
    imageAlt: "Телескопический погрузчик MT-X 1840A",
    load: "Номинальная грузоподъемность 4000 kg",
    height: "Максимальная высота подъема 17.55 m",
    speed: "Мощность двигателя (kW) 74.5 kW",
  },
];

type TehbazaLandingProps = {
  logoSrc?: string;
  logoAlt?: string;
};

export default function TehbazaLanding({ logoSrc, logoAlt }: TehbazaLandingProps) {
  const [heroStatus, setHeroStatus] = useState<FormStatus>("idle");
  const [heroMessage, setHeroMessage] = useState<string | null>(null);

  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [contactMessage, setContactMessage] = useState<string | null>(null);

  async function submitForm(
    url: string,
    e: FormEvent<HTMLFormElement>,
    setStatus: (s: FormStatus) => void,
    setMessage: (m: string | null) => void
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};

    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      setStatus("loading");
      setMessage(null);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  }

  const handleHeroSubmit = (e: FormEvent<HTMLFormElement>) =>
    submitForm("/api/forms/hero", e, setHeroStatus, setHeroMessage);

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) =>
    submitForm("/api/forms/contact", e, setContactStatus, setContactMessage);

  return (
    <div className="min-h-screen bg-neutral-900 text-slate-50">
      {/* Шапка */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#4E9DD9]">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={logoAlt ?? "Логотип ТехБаза"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="font-bold text-slate-950">TB</span>
              )}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4E9DD9]">
                ТехБаза
              </div>
              <div className="text-xs text-slate-300">
                Официальный поставщик спецтехники
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs md:flex">
            <a href="#catalog" className="text-slate-300 hover:text-white">
              Каталог моделей
            </a>
            {/* Лизинг из меню убран */}
            <a href="#contacts" className="text-slate-300 hover:text-white">
              Контакты
            </a>
          </nav>

          <div className="flex items-center gap-4 text-right">
            <div className="hidden text-xs leading-tight sm:block">
              <div className="font-semibold text-slate-100">8 (800) 000-00-00</div>
              <div className="text-[11px] text-slate-400">Звонок по РФ бесплатный</div>
            </div>
            <button className="rounded-xl border border-[#4E9DD9]/70 bg-[#4E9DD9] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-[#4E9DD9]/40 transition hover:bg-[#66aee0]">
              Заказать звонок
            </button>
          </div>
        </div>
      </header>

      {/* Контент */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-28 md:pt-14">
        {/* Hero-блок */}
        <section
          id="hero"
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 px-4 py-8 md:px-8 md:py-10"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/tehbaza-hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-neutral-900/85" />

          <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Распродажа складских мини-погрузчиков
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                  Осталось мало единиц
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Телескопические погрузчики Manitou
                <span className="block text-[#4E9DD9]">от официального дилера ТехБаза с доставкой по России</span>
              </h1>

              <p className="max-w-xl text-sm text-slate-200 sm:text-base">
                Поставляем новые телескопические погрузчики под ключ: подбор по задаче, доставка на объект,
                организация лизинга и сервис по всей России. Гарантия от официального дилера.
              </p>

              <div className="grid gap-4 text-xs text-slate-100 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
                  <div className="text-2xl font-semibold text-[#4E9DD9]">30</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                    дней под заказ с завода
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
                  <div className="text-2xl font-semibold text-[#4E9DD9]">24/7</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                    техническая поддержка
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
                  <div className="text-2xl font-semibold text-[#4E9DD9]">0%</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                    первоначальный взнос по лизингу*
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button className="inline-flex items-center justify-center rounded-2xl bg-[#4E9DD9] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-[#4E9DD9]/40 transition hover:bg-[#66aee0]">
                  Получить прайс-лист
                </button>
                <button className="inline-flex items-center justify-center rounded-2xl border border-slate-400 px-5 py-3 text-sm font-medium text-slate-50 hover:border-slate-200">
                  Скачать каталог PDF
                </button>
              </div>

              <div className="grid gap-4 text-xs text-slate-200 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-[6px] h-5 w-5 rounded-full border border-[#4E9DD9]/70 bg-[#4E9DD9]/20 text-[12px] leading-5 text-center">
                    ✓
                  </span>
                  <p>
                    Подбор модели под вашу задачу: коммунальные работы, стройка, склад, снегоуборка.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-[6px] h-5 w-5 rounded-full border border-[#4E9DD9]/70 bg-[#4E9DD9]/20 text-[12px] leading-5 text-center">
                    ✓
                  </span>
                  <p>Поставки напрямую от завода, без переплат посредникам.</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-300">
                *Количество техники по спеццене ограничено. Уточняйте наличие у менеджера.
              </p>
            </div>

            {/* Правая колонка - форма */}
            <div className="rounded-3xl border border-[#4E9DD9]/40 bg-neutral-950/80 p-5 shadow-2xl shadow-[#4E9DD9]/25 sm:p-6">
              <h2 className="text-base font-semibold text-slate-50 sm:text-lg">
                Получить предложение на весь модельный ряд
              </h2>
              <p className="mt-1 text-xs text-slate-200">
                Отправим актуальный прайс-лист на вашу почту или в WhatsApp в течение рабочего дня.
              </p>
              <form className="mt-5 space-y-4" onSubmit={handleHeroSubmit}>
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-200">Как к вам обращаться</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Иван"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                    required
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-200">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                    required
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-200">Email или WhatsApp</label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="example@tehbaza.ru"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-200">Интересующая техника</label>
                  <select
                    name="equipmentType"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 focus:border-[#4E9DD9] focus:ring-1"
                  >
                    <option>Мини-погрузчик</option>
                    <option>Фронтальный погрузчик</option>
                    <option>Экскаватор-погрузчик</option>
                    <option>Другое (укажу в комментарии)</option>
                  </select>
                </div>
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-200">Комментарий</label>
                  <textarea
                    rows={3}
                    name="comment"
                    placeholder="Например: требуется техника для работы в стеснённых городских условиях..."
                    className="w-full resize-none rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={heroStatus === "loading"}
                  className={`flex w-full items-center justify-center rounded-2xl bg-[#4E9DD9] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-[#4E9DD9]/40 transition hover:bg-[#66aee0] ${
                    heroStatus === "loading" ? "cursor-wait opacity-70" : ""
                  }`}
                >
                  {heroStatus === "loading" ? "Отправляем..." : "Получить прайс"}
                </button>
                <p className="text-[10px] leading-snug text-slate-300">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и политикой
                  конфиденциальности.
                </p>
                {heroStatus === "success" && heroMessage && (
                  <p className="text-[11px] text-emerald-400">{heroMessage}</p>
                )}
                {heroStatus === "error" && heroMessage && (
                  <p className="text-[11px] text-red-400">{heroMessage}</p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Каталог моделей */}
        <section id="catalog" className="mt-16 md:mt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Каталог телескопических погрузчиков Manitou
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Базовые модели в наличии на складе и под заказ. Поможем подобрать технику под вашу
                задачу и рассчитать стоимость владения.
              </p>
            </div>
            <button className="rounded-2xl border border-slate-500 px-4 py-2 text-xs font-medium text-slate-100 hover:border-slate-300">
              Показать всё оборудование
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((model) => (
              <article
                key={model.name}
                className="group flex flex-col rounded-2xl border border-white/10 bg-neutral-950/80 p-4 transition hover:border-[#4E9DD9]/70 hover:bg-neutral-900"
              >
                <div className="mb-3 h-36 overflow-hidden rounded-xl bg-neutral-900">
                  <img
                    src={model.imageSrc}
                    alt={model.imageAlt ?? model.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-slate-50">{model.name}</h3>
                <ul className="mt-2 space-y-1 text-xs text-slate-300">
                  <li>{model.load}</li>
                  <li>{model.height}</li>
                  <li>{model.speed}</li>
                </ul>
                <div className="mt-4 flex flex-col gap-2 text-xs sm:flex-row">
                  <button className="flex-1 rounded-xl bg-[#4E9DD9] px-3 py-2 font-semibold uppercase tracking-wide text-slate-950 shadow-md shadow-[#4E9DD9]/40 transition hover:bg-[#66aee0]">
                    Запросить стоимость
                  </button>
                  <button className="flex-1 rounded-xl border border-slate-500 px-3 py-2 font-medium text-slate-100 hover:border-slate-300">
                    Подробнее о модели
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Преимущества */}
        <section className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 px-4 py-8 md:mt-20 md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/tehbaza-why-us.jpg')" }}
          />
          <div className="absolute inset-0 bg-neutral-900/85" />

          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Почему компании выбирают ТехБаза
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#4E9DD9]">
                  Опыт
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Более 10 лет работаем с коммунальными, строительными и промышленными
                  предприятиями по всей России.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#4E9DD9]">
                  Сервис
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Собственная сервисная служба, выездные бригады и склад оригинальных запчастей.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#4E9DD9]">
                  Финансирование
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Помогаем оформить лизинг в крупных федеральных и региональных компаниях-партнёрах.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section id="contacts" className="mt-16 md:mt-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Остались вопросы по технике?
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Оставьте заявку, и профильный специалист ТехБаза свяжется с вами, чтобы уточнить
                задачи и подготовить коммерческое предложение.
              </p>
              <form className="mt-5 space-y-4" onSubmit={handleContactSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1 text-xs">
                    <label className="block text-slate-200">Контактное лицо</label>
                    <input
                      type="text"
                      name="contactName"
                      className="w-full rounded-xl border border-slate-600 bg-neutral-950 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                      placeholder="ФИО"
                      required
                    />
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="block text-slate-200">Компания</label>
                    <input
                      type="text"
                      name="company"
                      className="w-full rounded-xl border border-slate-600 bg-neutral-950 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                      placeholder={'ООО "ТехСервис"'}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1 text-xs">
                    <label className="block text-slate-200">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full rounded-xl border border-slate-600 bg-neutral-950 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="block text-slate-200">Город</label>
                    <input
                      type="text"
                      name="city"
                      className="w-full rounded-xl border border-slate-600 bg-neutral-950 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                      placeholder="Например: Екатеринбург"
                    />
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <label className="block text-slate-200">Опишите задачу</label>
                  <textarea
                    rows={4}
                    name="task"
                    className="w-full resize-none rounded-xl border border-slate-600 bg-neutral-950 px-3 py-2 text-xs text-slate-50 outline-none ring-[#4E9DD9]/60 placeholder:text-slate-500 focus:border-[#4E9DD9] focus:ring-1"
                    placeholder="Где будет работать техника, сколько часов в смену, какие навесные орудия планируете использовать..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactStatus === "loading"}
                  className={`flex w-full items-center justify-center rounded-2xl bg-[#4E9DD9] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-[#4E9DD9]/40 transition hover:bg-[#66aee0] sm:w-max ${
                    contactStatus === "loading" ? "cursor-wait opacity-70" : ""
                  }`}
                >
                  {contactStatus === "loading" ? "Отправляем..." : "Получить коммерческое предложение"}
                </button>
                {contactStatus === "success" && contactMessage && (
                  <p className="text-[11px] text-emerald-400">{contactMessage}</p>
                )}
                {contactStatus === "error" && contactMessage && (
                  <p className="text-[11px] text-red-400">{contactMessage}</p>
                )}
              </form>
            </div>

            <aside className="space-y-4 rounded-3xl border border-white/10 bg-neutral-950/80 p-5 text-sm text-slate-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Контакты
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div>Телефон: 8 (800) 000-00-00</div>
                  <div>Email: info@tehbaza.ru</div>
                  <div>WhatsApp / Telegram: по запросу</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Адрес офиса
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  РФ, г. Екатеринбург, ул. Примерная, д. 10, офис 5
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Поставки и сервис по всей территории России.
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  График работы
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Пн–Пт: 9:00–18:00 (Мск)
                  <br />
                  Сб–Вс: по предварительной записи
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Подвал */}
      <footer className="relative border-t border-white/10 text-[11px] text-slate-200">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/tehbaza-footer.jpg')" }}
        />
        <div className="absolute inset-0 bg-neutral-950/90" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row">
          <div>© {new Date().getFullYear()} ТехБаза. Все права защищены.</div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="text-slate-300 hover:text-slate-50">
              Политика конфиденциальности
            </button>
            <button className="text-slate-300 hover:text-slate-50">
              Согласие на обработку данных
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
