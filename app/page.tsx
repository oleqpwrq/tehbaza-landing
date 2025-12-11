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

type LandingProps = {
  logoSrc?: string; // png, svg, jpg — любая картинка
  logoAlt?: string;
};

export default function Landing({ logoSrc, logoAlt }: LandingProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string | null>(null);
  const [modalStatus, setModalStatus] = useState<FormStatus>("idle");
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const [heroStatus, setHeroStatus] = useState<FormStatus>("idle");
  const [heroMessage, setHeroMessage] = useState<string | null>(null);

  const accent = "#CC2229";

  // Если пропс не передан, используем дефолтный логотип
  const resolvedLogo = logoSrc ?? "/images/logo.png";

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

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  }

  const openModal = (source?: string) => {
    setModalSource(source ?? null);
    setModalStatus("idle");
    setModalMessage(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (modalStatus === "loading") return;
    setModalOpen(false);
  };

  const handleModalSubmit = (e: FormEvent<HTMLFormElement>) =>
    submitForm("/api/forms/contact", e, setModalStatus, setModalMessage);

  const handleHeroSubmit = (e: FormEvent<HTMLFormElement>) =>
    submitForm("/api/forms/contact", e, setHeroStatus, setHeroMessage);

  return (
    <div className="min-h-screen bg-neutral-900 text-slate-50">
      {/* Шапка без меню */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="relative mx-auto flex max-w-6xl items-center justify-end px-4 py-2">
          {/* Слева — телефон (на десктопе) */}
          <div className="absolute left-4 hidden text-xs leading-tight sm:block">
            <a
              href="tel:+78000000000"
              className="font-semibold text-slate-100 hover:text-slate-50"
            >
              8 (800) 000-00-00
            </a>
            <div className="text-[11px] text-slate-400">Звонок по РФ бесплатный</div>
          </div>

          {/* По центру — только логотип, по высоте почти как хедер */}
          <div className="pointer-events-none absolute inset-x-0 flex justify-center">
            <div className="pointer-events-auto flex h-30 sm:h-40 items-center justify-center">
              <img
                src={resolvedLogo}
                alt={logoAlt ?? "Логотип компании"}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Справа — кнопка звонка */}
          <button
            type="button"
            onClick={() => openModal("Заказать звонок")}
            className="rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-50 shadow-lg transition"
            style={{
              backgroundColor: accent,
              borderColor: accent,
              boxShadow: `0 10px 25px ${accent}55`,
            }}
          >
            Заказать звонок
          </button>
        </div>
      </header>

      {/* Контент */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-28 md:pt-14">
        {/* Hero-блок с фоном */}
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
                Распродажа складских телескопических погрузчиков
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                  Осталось мало единиц
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                Телескопические погрузчики Manitou
                <span className="block" style={{ color: accent }}>
                  от официального дилера с доставкой по России
                </span>
              </h1>

              <p className="max-w-xl text-sm text-slate-200 sm:text-base">
                Поставляем новые телескопические погрузчики под ключ: подбор по задаче, доставка
                на объект, организация лизинга и сервис по всей России. Гарантия от официального
                дилера.
              </p>

              <div className="grid gap-4 text-xs text-slate-100 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
                  <div className="text-2xl font-semibold" style={{ color: accent }}>
                    30
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                    дней под заказ с завода
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
                  <div className="text-2xl font-semibold" style={{ color: accent }}>
                    24/7
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                    техническая поддержка
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4">
                  <div className="text-2xl font-semibold" style={{ color: accent }}>
                    0%
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-300">
                    первоначальный взнос по лизингу*
                  </div>
                </div>
              </div>

              {/* Кнопка под текстом — открывает попап */}
              <button
                type="button"
                onClick={() => openModal("Получить прайс-лист")}
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-50 shadow-lg transition"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 10px 30px ${accent}66`,
                }}
              >
                Получить прайс-лист
              </button>

              <p className="text-[11px] text-slate-300">
                *Количество техники по спеццене ограничено. Уточняйте наличие у менеджера.
              </p>
            </div>

            {/* Правая колонка — форма на главной */}
            <div className="rounded-3xl border border-white/10 bg-neutral-950/80 p-5 text-xs text-slate-200 sm:p-6">
              <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                Получить предложение на весь модельный ряд
              </h2>
              <p className="mt-2 text-xs text-slate-300">
                Оставьте свои контакты, и мы отправим актуальный прайс-лист и коммерческое
                предложение в течение рабочего дня.
              </p>
              <form className="mt-4 space-y-3" onSubmit={handleHeroSubmit}>
                <input type="hidden" name="source" value="Форма на главном экране" />
                <div className="space-y-1">
                  <label className="block text-slate-200">Как к вам обращаться</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Иван"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-1"
                    style={{ outlineColor: accent }}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-200">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-1"
                    style={{ outlineColor: accent }}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-200">Email или WhatsApp</label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="example@company.ru"
                    className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-1"
                    style={{ outlineColor: accent }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={heroStatus === "loading"}
                  className="mt-2 flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-50 shadow-lg transition"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 10px 25px ${accent}66`,
                  }}
                >
                  {heroStatus === "loading" ? "Отправляем..." : "Отправить заявку"}
                </button>
                <p className="text-[10px] leading-snug text-slate-400">
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
            {/* Кнопку "Показать всё оборудование" убрали */}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((model) => (
              <article
                key={model.name}
                className="group flex flex-col rounded-2xl border border-white/10 bg-neutral-950/80 p-4 transition hover:bg-neutral-900"
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
                  <button
                    type="button"
                    onClick={() => openModal(`Запросить стоимость: ${model.name}`)}
                    className="flex-1 rounded-xl px-3 py-2 font-semibold uppercase tracking-wide text-slate-50 shadow-md transition"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 8px 20px ${accent}55`,
                    }}
                  >
                    Запросить стоимость
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal(`Подробнее о модели: ${model.name}`)}
                    className="flex-1 rounded-xl border px-3 py-2 font-medium text-slate-100 hover:border-slate-300"
                    style={{ borderColor: accent }}
                  >
                    Подробнее о модели
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Преимущества с фоном */}
        <section className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 px-4 py-8 md:mt-20 md:px-8 md:py-10">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/tehbaza-why-us.jpg')" }}
          />
          <div className="absolute inset-0 bg-neutral-900/85" />

          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Наши преимущества
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
                <div
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: accent }}
                >
                  Опыт
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Более 10 лет работаем с коммунальными, строительными и промышленными
                  предприятиями по всей России.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
                <div
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: accent }}
                >
                  Сервис
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Собственная сервисная служба, выездные бригады и склад оригинальных запчастей.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
                <div
                 	className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: accent }}
                >
                  Финансирование
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Помогаем оформить лизинг в крупных федеральных и региональных компаниях-партнёрах.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Блок контактов */}
        <section id="contacts" className="mt-16 md:mt-20">
          <div className="rounded-3xl border border-white/10 bg-neutral-950/80 p-5 text-sm text-slate-200 md:p-7">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Контакты
              </h2>
              {/* Кнопка рядом с контактами */}
              <button
                type="button"
                onClick={() => openModal("Получить коммерческое предложение")}
                className="rounded-2xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-50 shadow-lg transition"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 10px 25px ${accent}66`,
                }}
              >
                Получить коммерческое предложение
              </button>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Связаться с нами
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div>Телефон: 8 (800) 000-00-00</div>
                  <div>Email: info@company.ru</div>
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
            </div>
          </div>
        </section>
      </main>

      {/* Модальное окно единой формы обратной связи */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-5 text-sm text-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-50 sm:text-lg">
                  Оставьте контакты для связи
                </h2>
                {modalSource && (
                  <p className="mt-1 text-xs text-slate-400">Повод обращения: {modalSource}</p>
                )}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-xs text-slate-400 hover:text-slate-100"
              >
                ✕
              </button>
            </div>

            <form className="mt-4 space-y-3 text-xs" onSubmit={handleModalSubmit}>
              {modalSource && <input type="hidden" name="source" value={modalSource} />}
              <div className="space-y-1">
                <label className="block text-slate-200">Как к вам обращаться</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван"
                  className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-1"
                  style={{ outlineColor: accent }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-200">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-1"
                  style={{ outlineColor: accent }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-200">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@company.ru"
                  className="w-full rounded-xl border border-slate-600 bg-neutral-900 px-3 py-2 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-1"
                  style={{ outlineColor: accent }}
                />
              </div>
              <button
                type="submit"
                disabled={modalStatus === "loading"}
                className="mt-2 flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-50 shadow-lg transition"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 10px 25px ${accent}66`,
                }}
              >
                {modalStatus === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-[10px] leading-snug text-slate-400">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и политикой
                конфиденциальности.
              </p>
              {modalStatus === "success" && modalMessage && (
                <p className="text-[11px] text-emerald-400">{modalMessage}</p>
              )}
              {modalStatus === "error" && modalMessage && (
                <p className="text-[11px] text-red-400">{modalMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Подвал с фоном */}
      <footer className="relative border-t border-white/10 text-[11px] text-slate-200">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/tehbaza-footer.jpg')" }}
        />
        <div className="absolute inset-0 bg-neutral-950/90" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row">
          <div>© {new Date().getFullYear()} Ваша компания. Все права защищены.</div>
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
