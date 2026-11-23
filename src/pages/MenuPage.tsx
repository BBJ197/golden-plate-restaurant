import { useState } from "react";
import { Link } from "react-router-dom";
import type { Menu, MenuItem } from "../api/menu";
import { useMenu } from "../api/useMenu";
import MenuIcon from "../components/MenuIcon";
import MobileTabBar from "../components/MobileTabBar";
import bottle from "../assets/images/bottle.png";
import glass from "../assets/images/glass.png";
import {
  emptyFilters,
  filterItems,
  hasActiveFilters,
  type MenuFilters,
} from "../lib/filterMenu";
import { formatEtb } from "../lib/format";
import { iconForCategory, iconForTag } from "../lib/iconNames";
import { pickOptional, pickText, type Lang } from "../lib/language";
import { photoUrl } from "../lib/photoUrl";
import { pickPhoto } from "../lib/photos";
import { useLanguage } from "../lib/useLanguage";

function Skeleton() {
  return (
    <div role="status" aria-label="Loading menu" className="menu-skeleton">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="menu-skeleton-card" aria-hidden="true" />
      ))}
    </div>
  );
}

function ItemCard({
  item,
  menu,
  lang,
}: {
  item: MenuItem;
  menu: Menu;
  lang: Lang;
}) {
  const description = pickOptional(
    item.descriptionEn,
    item.descriptionAm,
    lang,
  );
  const badges = menu.tags.filter((tag) => item.tagIds.includes(tag.id));
  // The admin's uploaded photo when there is one, else the bundled test photo.
  const photo =
    photoUrl(item.imagePath) ??
    pickPhoto(menu.categories.findIndex((c) => c.id === item.categoryId));
  const classes = [
    "menu-card",
    item.isAvailable ? "" : "is-unavailable",
    photo ? "" : "no-photo",
  ]
    .filter(Boolean)
    .join(" ");
  const price = <p className="menu-price">{formatEtb(item.priceEtb)}</p>;
  return (
    <li className={classes}>
      {photo && (
        <div className="menu-card-media">
          <img
            className="menu-card-photo"
            src={photo}
            alt=""
            width="400"
            height="250"
            loading="lazy"
            decoding="async"
          />
          {price}
        </div>
      )}
      <div className="menu-card-body">
        <h3>{pickText(item.nameEn, item.nameAm, lang)}</h3>
        {description && <p className="menu-card-desc">{description}</p>}
        {badges.length > 0 && (
          <ul className="menu-badges">
            {badges.map((tag) => {
              const icon = iconForTag(tag.slug);
              return (
                <li key={tag.id} className="menu-badge">
                  {icon && <MenuIcon name={icon} size={14} />}
                  {pickText(tag.nameEn, tag.nameAm, lang)}
                </li>
              );
            })}
          </ul>
        )}
        {!item.isAvailable && (
          <p className="menu-unavailable">
            {pickText("Unavailable", "አይገኝም", lang)}
          </p>
        )}
        {!photo && price}
      </div>
    </li>
  );
}

export default function MenuPage() {
  const { data, isPending, isError, refetch, isFetching } = useMenu();
  const [filters, setFilters] = useState<MenuFilters>(emptyFilters);
  const { lang, setLang } = useLanguage();

  const visible = data ? filterItems(data, filters) : [];
  const active = hasActiveFilters(filters);
  const popular = active
    ? []
    : visible.filter((item) => item.isFeatured && item.isAvailable);

  const toggleTag = (slug: string) =>
    setFilters((f) => ({
      ...f,
      tagSlugs: f.tagSlugs.includes(slug)
        ? f.tagSlugs.filter((s) => s !== slug)
        : [...f.tagSlugs, slug],
    }));

  return (
    <main id="main" className="menu-page">
      <div className="menu-pans" aria-hidden="true">
        <div className="menu-wine-scene">
          <svg viewBox="0 0 1000 1280" focusable="false">
            <defs>
              <clipPath id="mw-bowl">
                <path d="M218 55C190 160 182 260 186 340C195 440 280 520 370 524C460 520 548 440 552 340C558 260 548 160 522 55Z" />
              </clipPath>
              <linearGradient id="mw-wine-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a41d2d" />
                <stop offset="0.35" stopColor="#6b0c1b" />
                <stop offset="1" stopColor="#2e0409" />
              </linearGradient>
            </defs>
            <g transform="translate(735 777) scale(0.42)">
              <g clipPath="url(#mw-bowl)">
                <g transform="translate(370 300)">
                  <g className="mw-slosh">
                    <g transform="translate(-370 -300)">
                      <path
                        className="mw-wave-b"
                        d="M-150 296q37.5 14 75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0V620H-150Z"
                        fill="#c22a3b"
                        fillOpacity="0.55"
                      />
                      <path
                        className="mw-wave-a"
                        d="M-150 290q37.5-18 75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0t75 0V620H-150Z"
                        fill="url(#mw-wine-grad)"
                        stroke="rgba(255,190,195,0.4)"
                        strokeWidth="1.5"
                      />
                    </g>
                  </g>
                </g>
                <g transform="translate(405 292)">
                  <ellipse
                    className="mw-ring mw-ring-1"
                    rx="40"
                    ry="9"
                    fill="none"
                    stroke="rgba(255,200,205,0.6)"
                    strokeWidth="2"
                  />
                  <ellipse
                    className="mw-ring mw-ring-2"
                    rx="40"
                    ry="9"
                    fill="none"
                    stroke="rgba(255,200,205,0.6)"
                    strokeWidth="2"
                  />
                  <ellipse
                    className="mw-ring mw-ring-3"
                    rx="40"
                    ry="9"
                    fill="none"
                    stroke="rgba(255,200,205,0.6)"
                    strokeWidth="2"
                  />
                  <ellipse
                    className="mw-foam"
                    rx="34"
                    ry="6"
                    fill="rgba(255,205,210,0.28)"
                  />
                </g>
              </g>
              <image href={glass} width="736" height="1104" />
            </g>
            <g transform="translate(883 633)">
              <g className="mw-stream">
                <path
                  className="mw-stream-body"
                  d="M0 0C14 22 22 120 22 266"
                  fill="none"
                  stroke="#8f1627"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  className="mw-stream-flow"
                  d="M0 0C14 22 22 120 22 266"
                  fill="none"
                  stroke="rgba(255,170,180,0.35)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
            </g>
            <g transform="translate(905 899)">
              <circle className="mw-drop mw-d1" r="2.6" fill="#b3202f" />
              <circle className="mw-drop mw-d2" r="2.6" fill="#b3202f" />
              <circle className="mw-drop mw-d3" r="2.6" fill="#b3202f" />
              <circle className="mw-drop mw-d4" r="2.6" fill="#b3202f" />
              <circle className="mw-drop mw-d5" r="2.6" fill="#b3202f" />
              <circle className="mw-drop mw-d6" r="2.6" fill="#b3202f" />
            </g>
            <g className="mw-bottle">
              <image
                href={bottle}
                x="-480"
                y="-514"
                width="960"
                height="1024"
              />
            </g>
          </svg>
        </div>
      </div>
      <section className="menu-banner" aria-labelledby="menu-title">
        <div className="menu-banner-bar">
          <Link to="/" className="menu-back">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {pickText("Back to home", "ወደ መነሻ ተመለስ", lang)}
          </Link>
          <div className="menu-lang" role="group" aria-label="Language">
            <button
              type="button"
              className="menu-chip"
              lang="en"
              aria-label="English"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className="menu-chip"
              lang="am"
              aria-label="Amharic"
              aria-pressed={lang === "am"}
              onClick={() => setLang("am")}
            >
              {"\u12A0\u121B"}
            </button>
          </div>
        </div>
        <div className="menu-banner-text">
          <p className="menu-eyebrow">
            {pickText(
              "Traditional taste • Freshly brewed",
              "ባህላዊ ጣዕም • ትኩስ ቡናቡና",
              lang,
            )}
          </p>
          <h1 id="menu-title">
            {pickText("Our Menu", "የእኛ የምግብ ዝርዝሮች", lang)}
          </h1>
          <p className="menu-banner-sub">
            {pickText(
              "Authentic Ethiopian flavors, crafted with love.",
              "እውነተኛ የኢትዮጵያ ጣዕም፣ በፍቅር የተዘጋጀ።",
              lang,
            )}
          </p>
        </div>
      </section>

      {isPending && <Skeleton />}

      {isError && (
        <div role="alert" className="menu-error">
          <p>
            {pickText(
              "We could not load the menu. Please check your connection and try again.",
              "ምናሌውን መጫን አልተቻለም። እባክዎ ግንኙነትዎን ይፈትሹ እና እንደገና ይሞክሩ።",
              lang,
            )}
          </p>
          <button
            type="button"
            className="menu-button"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            {pickText("Try again", "እንደገና ሞክር", lang)}
          </button>
        </div>
      )}

      {data && data.items.length === 0 && (
        <p>
          {pickText(
            "The menu is empty right now. Please check back soon.",
            "ምናሌው አሁን ባዶ ነው። እባክዎ በቅርቡ ይመለሱ።",
            lang,
          )}
        </p>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="menu-controls">
            <div className="menu-search-wrap">
              <span className="menu-search-icon">
                <MenuIcon name="search" size={20} />
              </span>
              <label htmlFor="menu-search" className="menu-search-label">
                {pickText("Search the menu", "ምናሌውን ፈልግ", lang)}
              </label>
              <input
                id="menu-search"
                type="search"
                className="menu-search"
                placeholder={pickText(
                  "Search by name, description or category",
                  "በስም፣ በመግለጫ ወይም በምድብ ፈልግ",
                  lang,
                )}
                value={filters.query}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, query: e.target.value }))
                }
              />
            </div>
            <details className="menu-filter-panel">
              <summary className="menu-filter-toggle">
                <MenuIcon name="grid" size={18} />
                {pickText("Filters", "ማጣሪያ", lang)}
                {filters.tagSlugs.length > 0 && (
                  <span className="menu-filter-count">
                    {filters.tagSlugs.length}
                  </span>
                )}
              </summary>
              <div
                className="menu-chip-row"
                role="group"
                aria-label="Dietary and temperature filters"
              >
                <button
                  type="button"
                  className="menu-chip"
                  aria-label={pickText("Any diet", "ሁሉም አይነት", lang)}
                  aria-pressed={filters.tagSlugs.length === 0}
                  onClick={() => setFilters((f) => ({ ...f, tagSlugs: [] }))}
                >
                  <MenuIcon name="grid" size={16} />
                  {pickText("Any diet", "ሁሉም አይነት", lang)}
                </button>
                {data.tags.map((tag) => {
                  const icon = iconForTag(tag.slug);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      className="menu-chip"
                      aria-pressed={filters.tagSlugs.includes(tag.slug)}
                      onClick={() => toggleTag(tag.slug)}
                    >
                      {icon && <MenuIcon name={icon} size={16} />}
                      {pickText(tag.nameEn, tag.nameAm, lang)}
                    </button>
                  );
                })}
              </div>
            </details>
          </div>

          <div className="menu-category-bar">
            <div className="menu-chip-row" role="group" aria-label="Categories">
              <button
                type="button"
                className="menu-chip"
                aria-pressed={filters.categoryId === null}
                onClick={() => setFilters((f) => ({ ...f, categoryId: null }))}
              >
                <MenuIcon name="grid" size={16} />
                {pickText("All", "ሁሉም", lang)}
              </button>
              {data.categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="menu-chip"
                  aria-pressed={filters.categoryId === category.id}
                  onClick={() =>
                    setFilters((f) => ({ ...f, categoryId: category.id }))
                  }
                >
                  <MenuIcon name={iconForCategory(category.nameEn)} size={16} />
                  {pickText(category.nameEn, category.nameAm, lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-summary">
            <p role="status">
              {lang === "am"
                ? `${visible.length} ንጥል`
                : `${visible.length} ${visible.length === 1 ? "item" : "items"}`}
            </p>
            {active && (
              <button
                type="button"
                className="menu-button"
                onClick={() => setFilters(emptyFilters)}
              >
                {pickText("Clear filters", "ማጣሪያ አጽዳ", lang)}
              </button>
            )}
          </div>

          {visible.length === 0 && (
            <p className="menu-empty">
              {pickText(
                "No items match. Try different words or clear the filters.",
                "ምንም አልተገኘም። ሌሎች ቃላትን ይሞክሩ ወይም ማጣሪያዎቹን ያጽዱ።",
                lang,
              )}
            </p>
          )}

          {popular.length > 0 && (
            <section aria-labelledby="popular-heading" className="menu-popular">
              <div className="menu-section-head">
                <MenuIcon name="star" size={28} />
                <div>
                  <h2 id="popular-heading">
                    {pickText("Popular", "ተወዳጅ", lang)}
                  </h2>
                  <p className="menu-section-sub">
                    {pickText(
                      "Our most loved items",
                      "በጣም የተወደዱ ምርጫዎቻችን",
                      lang,
                    )}
                  </p>
                </div>
              </div>
              <ul className="menu-list">
                {popular.map((item) => (
                  <ItemCard key={item.id} item={item} menu={data} lang={lang} />
                ))}
              </ul>
            </section>
          )}

          {data.categories.map((category) => {
            const items = visible.filter(
              (item) => item.categoryId === category.id,
            );
            if (items.length === 0) return null;
            return (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <div className="menu-section-head">
                  <MenuIcon name={iconForCategory(category.nameEn)} size={28} />
                  <h2 id={`cat-${category.id}`}>
                    {pickText(category.nameEn, category.nameAm, lang)}
                  </h2>
                </div>
                <ul className="menu-list">
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      menu={data}
                      lang={lang}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </>
      )}
      <MobileTabBar lang={lang} />
    </main>
  );
}
