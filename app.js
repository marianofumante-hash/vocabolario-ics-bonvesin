const API_ENDPOINT = "https://it.wiktionary.org/w/api.php";
const SOURCE_BASE_URL = "https://it.wiktionary.org/wiki/";
const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const DEFAULT_UI_LANGUAGE = "it";
const UI_LANGUAGE_STORAGE_KEY = "vocabolario.uiLanguage.v1";
const READING_PREFERENCES_STORAGE_KEY = "vocabolario.readingPreferences.v1";

const SEARCH_CACHE_KEY = "vocabolario.searchCache.v1";
const ENTRY_CACHE_KEY = "vocabolario.entryCache.v2";
const TRANSLATION_CACHE_KEY = "vocabolario.translationCache.v2";
const SEARCH_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const ENTRY_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const TRANSLATION_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 30;

const searchInput = document.querySelector("#search-input");
const clearButton = document.querySelector("#clear-button");
const languageSelect = document.querySelector("#language-select");
const entryLanguageSelect = document.querySelector("#entry-language-select");
const heroLanguageOptions = document.querySelector("#hero-language-options");
const entryLanguageOptions = document.querySelector("#entry-language-options");
const resultsContainer = document.querySelector("#results");
const searchSummary = document.querySelector("#search-summary");
const entryEmpty = document.querySelector("#entry-empty");
const entryCard = document.querySelector("#entry-card");

const uiEyebrow = document.querySelector("#ui-eyebrow");
const uiTitle = document.querySelector("#ui-title");
const uiHeroCopy = document.querySelector("#ui-hero-copy");
const uiLanguageLabel = document.querySelector("#ui-language-label");
const uiEntryLanguageLabel = document.querySelector("#ui-entry-language-label");
const uiSearchLabel = document.querySelector("#ui-search-label");
const uiReadingToolsTitle = document.querySelector("#ui-reading-tools-title");
const uiReadingToolsCopy = document.querySelector("#ui-reading-tools-copy");
const uiEmptyTitle = document.querySelector("#ui-empty-title");
const uiEmptyCopy = document.querySelector("#ui-empty-copy");
const uiEntryContentTitle = document.querySelector("#ui-entry-content-title");
const speechControls = document.querySelector(".speech-controls");
const speakStartButton = document.querySelector("#speak-start-button");
const speakStopButton = document.querySelector("#speak-stop-button");
const prefLargeTextButton = document.querySelector("#pref-large-text");
const prefLineSpacingButton = document.querySelector("#pref-line-spacing");
const prefStrongContrastButton = document.querySelector("#pref-strong-contrast");

const entryLemma = document.querySelector("#entry-lemma");
const entryPos = document.querySelector("#entry-pos");
const entryCacheStatus = document.querySelector("#entry-cache-status");
const entryPronunciation = document.querySelector("#entry-pronunciation");
const entryContent = document.querySelector("#entry-content");

const languageBadgeMap = {
  it: "IT",
  en: "EN",
  fr: "FR",
  es: "ES",
  de: "DE"
};
const allowedLanguageCodes = ["it", "en", "fr", "es", "de"];
const availableLanguages = Array.isArray(window.UI_LANGUAGES)
  ? window.UI_LANGUAGES.filter((language) => allowedLanguageCodes.includes(language.code))
  : [];
const defaultReadingPreferences = {
  largeText: false,
  spaciousLine: false,
  strongContrast: false
};
const readingPreferenceButtons = [
  {
    key: "largeText",
    className: "pref-large-text",
    button: prefLargeTextButton,
    labelKey: "readingLargeText"
  },
  {
    key: "spaciousLine",
    className: "pref-line-spacious",
    button: prefLineSpacingButton,
    labelKey: "readingLineSpacing"
  },
  {
    key: "strongContrast",
    className: "pref-contrast-strong",
    button: prefStrongContrastButton,
    labelKey: "readingStrongContrast"
  }
];

let currentLanguageCode = getInitialLanguageCode();
let readingPreferences = getInitialReadingPreferences();
let activeEntryTitle = null;
let searchDebounceId = null;
let latestSearchRequestId = 0;
let currentResults = [];
let currentEntryData = null;
let lastSummaryState = { key: "summaryIdle", params: {}, isError: false };
let lastCacheStatusState = { key: "", params: {} };
let translationRequestId = 0;
let currentUtterance = null;
let availableVoices = [];

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getInitialLanguageCode() {
  try {
    const stored = window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY);
    if (stored && availableLanguages.some((language) => language.code === stored)) {
      return stored;
    }
  } catch (error) {
    // Ignore storage read errors.
  }

  return DEFAULT_UI_LANGUAGE;
}

function getInitialReadingPreferences() {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(READING_PREFERENCES_STORAGE_KEY) || "{}"
    );

    return {
      ...defaultReadingPreferences,
      largeText: Boolean(stored.largeText),
      spaciousLine: Boolean(stored.spaciousLine),
      strongContrast: Boolean(stored.strongContrast)
    };
  } catch (error) {
    return { ...defaultReadingPreferences };
  }
}

function getLanguageConfig(code = currentLanguageCode) {
  return (
    availableLanguages.find((language) => language.code === code) ||
    availableLanguages.find((language) => language.code === DEFAULT_UI_LANGUAGE) ||
    { code: DEFAULT_UI_LANGUAGE, label: "Italiano", strings: {} }
  );
}

function t(key, params = {}) {
  const currentStrings = getLanguageConfig().strings || {};
  const fallbackStrings = getLanguageConfig(DEFAULT_UI_LANGUAGE).strings || {};
  let template = currentStrings[key] || fallbackStrings[key] || "";

  Object.entries(params).forEach(([paramKey, value]) => {
    template = template.replaceAll(`{${paramKey}}`, value);
  });

  return template;
}

function buildApiUrl(params) {
  const url = new URL(API_ENDPOINT);
  url.search = new URLSearchParams({
    origin: "*",
    format: "json",
    ...params
  }).toString();
  return url.toString();
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Richiesta non riuscita (${response.status})`);
  }

  return response.json();
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Richiesta non riuscita (${response.status})`);
  }

  return response.json();
}

function readCache(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
}

function writeCache(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore quota or storage errors.
  }
}

function getCachedValue(cacheKey, itemKey, ttlMs) {
  const cache = readCache(cacheKey);
  const item = cache[itemKey];

  if (!item || !item.savedAt) {
    return null;
  }

  if (Date.now() - item.savedAt > ttlMs) {
    delete cache[itemKey];
    writeCache(cacheKey, cache);
    return null;
  }

  return item;
}

function setCachedValue(cacheKey, itemKey, data) {
  const cache = readCache(cacheKey);
  cache[itemKey] = {
    savedAt: Date.now(),
    data
  };
  writeCache(cacheKey, cache);
}

function formatSavedAt(savedAt) {
  try {
    return new Intl.DateTimeFormat(currentLanguageCode === "it" ? "it-IT" : undefined, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(savedAt));
  } catch (error) {
    return "";
  }
}

function setSummaryByKey(key, params = {}, isError = false) {
  lastSummaryState = { key, params, isError };
  searchSummary.textContent = t(key, params);
  searchSummary.classList.toggle("is-error", isError);
}

function setEntryCacheStatusByKey(key, params = {}) {
  lastCacheStatusState = { key, params };
  entryCacheStatus.textContent = key ? t(key, params) : "";
}

function persistReadingPreferences() {
  try {
    window.localStorage.setItem(
      READING_PREFERENCES_STORAGE_KEY,
      JSON.stringify(readingPreferences)
    );
  } catch (error) {
    // Ignore storage write errors.
  }
}

function applyReadingPreferences() {
  readingPreferenceButtons.forEach(({ key, className, button, labelKey }) => {
    if (!button) {
      return;
    }

    const isActive = Boolean(readingPreferences[key]);
    document.body.classList.toggle(className, isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.textContent = t(labelKey);
  });
}

function toggleReadingPreference(key) {
  readingPreferences = {
    ...readingPreferences,
    [key]: !readingPreferences[key]
  };
  persistReadingPreferences();
  applyReadingPreferences();
}

function stopSpeech() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  currentUtterance = null;
}

function showEmptyState() {
  entryCard.classList.add("hidden");
  entryEmpty.classList.remove("hidden");
  stopSpeech();
}

function showEntryState() {
  entryEmpty.classList.add("hidden");
  entryCard.classList.remove("hidden");
}

function parserSafeText(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body.textContent.trim();
}

function applyHeroTitle(title) {
  const fixedPhrase = "ICS Bonvesin de la Riva";

  if (!uiTitle) {
    return;
  }

  if (title.includes(fixedPhrase)) {
    uiTitle.innerHTML = title.replace(
      fixedPhrase,
      `<span class="title-no-break">${fixedPhrase}</span>`
    );
    return;
  }

  uiTitle.textContent = title;
}

function updateSpeechControlsVisibility() {
  const isItalianUi = currentLanguageCode === DEFAULT_UI_LANGUAGE;

  speechControls.classList.toggle("hidden", !isItalianUi);
  speakStartButton.disabled = !isItalianUi;
  speakStopButton.disabled = !isItalianUi;

  if (!isItalianUi) {
    stopSpeech();
  }
}

function applyUiLanguage() {
  if (uiEyebrow) {
    uiEyebrow.textContent = t("eyebrow");
  }
  applyHeroTitle(t("title"));
  uiHeroCopy.textContent = t("heroCopy");
  uiLanguageLabel.textContent = t("heroLanguageLabel");
  uiEntryLanguageLabel.textContent = t("entryLanguageLabel");
  uiSearchLabel.textContent = t("searchLabel");
  uiReadingToolsTitle.textContent = t("readingToolsTitle");
  uiReadingToolsCopy.textContent = t("readingToolsCopy");
  searchInput.placeholder = t("searchPlaceholder");
  clearButton.textContent = t("clearButton");
  uiEmptyTitle.textContent = t("emptyTitle");
  uiEmptyCopy.textContent = t("emptyCopy");
  uiEntryContentTitle.textContent = t("entryContentTitle");
  speakStartButton.textContent = t("speakStart");
  speakStopButton.textContent = t("speakStop");
  document.documentElement.lang = currentLanguageCode;
  updateSpeechControlsVisibility();
  applyReadingPreferences();

  setSummaryByKey(lastSummaryState.key, lastSummaryState.params, lastSummaryState.isError);
  setEntryCacheStatusByKey(lastCacheStatusState.key, lastCacheStatusState.params);
  renderResults(currentResults);

  if (currentEntryData) {
    updateEntryTranslation();
  }
}

function focusSearchInput(selectText = true) {
  searchInput.focus();
  if (selectText) {
    searchInput.select();
  }
}

function resetSearchInterface({ keepFocus = false } = {}) {
  stopSpeech();
  searchInput.value = "";
  currentResults = [];
  currentEntryData = null;
  resultsContainer.innerHTML = "";
  activeEntryTitle = null;
  setSummaryByKey("summaryIdle");
  setEntryCacheStatusByKey("");
  showEmptyState();

  if (keepFocus) {
    focusSearchInput(false);
  }
}

function initializeLanguageSelector() {
  languageSelect.innerHTML = "";
  entryLanguageSelect.innerHTML = "";

  availableLanguages.forEach((language) => {
    const option = document.createElement("option");
    option.value = language.code;
    option.textContent = language.label;
    languageSelect.appendChild(option);

    const mirroredOption = document.createElement("option");
    mirroredOption.value = language.code;
    mirroredOption.textContent = language.label;
    entryLanguageSelect.appendChild(mirroredOption);
  });

  languageSelect.value = currentLanguageCode;
  entryLanguageSelect.value = currentLanguageCode;

  function renderLanguageButtons(container, activeCode, onSelect) {
    if (!container) {
      return;
    }

    container.innerHTML = "";

    availableLanguages.forEach((language) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-option";
      button.dataset.code = language.code;
      button.setAttribute("aria-pressed", String(language.code === activeCode));

      if (language.code === activeCode) {
        button.classList.add("is-active");
      }

      const badge = document.createElement("span");
      badge.className = "language-option-badge";
      badge.textContent = languageBadgeMap[language.code] || language.code.toUpperCase();

      const text = document.createElement("span");
      text.className = "language-option-text";
      text.textContent = language.label;

      button.appendChild(badge);
      button.appendChild(text);
      button.addEventListener("click", () => onSelect(language.code));
      container.appendChild(button);
    });
  }

  function updateLanguage(nextLanguageCode) {
    currentLanguageCode = nextLanguageCode;
    languageSelect.value = nextLanguageCode;
    entryLanguageSelect.value = nextLanguageCode;
    renderLanguageButtons(heroLanguageOptions, nextLanguageCode, updateLanguage);
    renderLanguageButtons(entryLanguageOptions, nextLanguageCode, updateLanguage);
    try {
      window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, nextLanguageCode);
    } catch (error) {
      // Ignore storage write errors.
    }
    applyUiLanguage();
  }

  languageSelect.addEventListener("change", () => {
    updateLanguage(languageSelect.value);
  });

  entryLanguageSelect.addEventListener("change", () => {
    updateLanguage(entryLanguageSelect.value);
  });

  renderLanguageButtons(heroLanguageOptions, currentLanguageCode, updateLanguage);
  renderLanguageButtons(entryLanguageOptions, currentLanguageCode, updateLanguage);
}

function cleanParsedHtml(rawHtml) {
  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(rawHtml, "text/html");
  const root =
    documentFragment.querySelector(".mw-parser-output") || documentFragment.body;
  const lexicalSectionTitles = [
    "sostantivo",
    "aggettivo",
    "verbo",
    "avverbio",
    "pronome",
    "articolo",
    "preposizione",
    "congiunzione",
    "interiezione",
    "locuzione",
    "espressione",
    "proverbio",
    "sigla",
    "acronimo",
    "prefisso",
    "suffisso",
    "simbolo",
    "lettera",
    "nome proprio",
    "participio",
    "numerale"
  ];

  const blockedTextPatterns = [
    "proverbi e modi di dire",
    "quando la fame entra dalla porta",
    "wikizionario",
    "wiktionary",
    "wiktionnaire",
    "wikcionario",
    "tullio de mauro",
    "il nuovo de mauro",
    "internazionale.it",
    "il sansoni",
    "www.corriere.it",
    "the free dictionary",
    "edizione online",
    "edizione on-line",
    "pronuncia",
    "afi:",
    "enrico olivetti",
    "aldo gabrielli",
    "aa.vv.",
    "francesco sabatini e vittorio coletti",
    "dizionario italiano olivetti",
    "grande grande libreria online",
    "dizionario dei sinonimi e dei contrari",
    "vocabolario treccani",
    "il sabatini coletti",
    "wikiquote contiene",
    "wikipedia contiene",
    "commons contiene",
    "wikibooks contiene",
    "wikinotizie contiene",
    "wikisource contiene",
    "altri progetti"
  ];

  root.querySelectorAll([
    "style",
    "script",
    "noscript",
    "img",
    "picture",
    "source",
    ".mw-editsection",
    ".thumb",
    ".reference",
    ".noprint",
    ".sister-wiki",
    ".interProject",
    ".ambox",
    ".metadata",
    "table"
  ].join(",")).forEach((node) => node.remove());

  root.querySelectorAll("h2, h3, h4").forEach((heading) => {
    const title = normalizeText(heading.textContent);
    if (
      title.includes("altri progetti") ||
      title.includes("latino") ||
      title.includes("spagnolo") ||
      title.includes("inglese") ||
      title.includes("francese") ||
      title.includes("tedesco") ||
      title.includes("polacco") ||
      title.includes("russo") ||
      title.includes("ucraino") ||
      title.includes("arabo") ||
      title.includes("cinese") ||
      title.includes("albanese") ||
      title.includes("pronuncia") ||
      title.includes("proverbi e modi di dire") ||
      title.includes("note / riferimenti") ||
      title.includes("note/riferimenti") ||
      title === "note" ||
      title === "riferimenti"
    ) {
      let currentNode = heading;
      while (currentNode) {
        const nextNode = currentNode.nextElementSibling;
        currentNode.remove();
        if (!nextNode || /^H[1-6]$/.test(nextNode.tagName)) {
          break;
        }
        currentNode = nextNode;
      }
    }
  });

  root.querySelectorAll("p, li, dd, div").forEach((node) => {
    const text = normalizeText(node.textContent);
    if (!text) {
      return;
    }

    if (blockedTextPatterns.some((pattern) => text.includes(pattern))) {
      node.remove();
    }
  });

  root.querySelectorAll("ul, ol, dl").forEach((list) => {
    const hasVisibleChildren = Array.from(list.children).some(
      (child) => normalizeText(child.textContent).length > 0
    );

    if (!hasVisibleChildren) {
      list.remove();
    }
  });

  root.querySelectorAll("a").forEach((link) => {
    const textNode = document.createTextNode(link.textContent);
    link.replaceWith(textNode);
  });

  const htmlBeforeLeadingTrim = root.innerHTML.trim();

  function trimLeadingNodesBeforeTarget(targetNode) {
    let currentTarget = targetNode;

    while (currentTarget?.parentElement && currentTarget.parentElement !== root) {
      const parent = currentTarget.parentElement;
      let sibling = parent.firstElementChild;

      while (sibling && sibling !== currentTarget) {
        const nextSibling = sibling.nextElementSibling;
        sibling.remove();
        sibling = nextSibling;
      }

      currentTarget = parent;
    }

    let rootChild = root.firstElementChild;
    while (rootChild && rootChild !== currentTarget) {
      const nextRootChild = rootChild.nextElementSibling;
      rootChild.remove();
      rootChild = nextRootChild;
    }
  }

  const firstLexicalHeading = Array.from(
    root.querySelectorAll("h2, h3, h4, h5")
  ).find((heading) => {
    const title = normalizeText(heading.textContent);
    return lexicalSectionTitles.some((sectionTitle) => title.includes(sectionTitle));
  });

  if (firstLexicalHeading) {
    trimLeadingNodesBeforeTarget(firstLexicalHeading);
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = root.innerHTML.trim();

  if (!normalizeText(wrapper.textContent)) {
    return htmlBeforeLeadingTrim || `<p class="loading-note">${t("entryEmpty")}</p>`;
  }

  return wrapper.innerHTML || `<p class="loading-note">${t("entryEmpty")}</p>`;
}

async function searchEntries(query) {
  const url = buildApiUrl({
    action: "opensearch",
    search: query,
    limit: "10",
    namespace: "0"
  });

  const data = await fetchJson(url);
  const titles = Array.isArray(data[1]) ? data[1] : [];
  const urls = Array.isArray(data[3]) ? data[3] : [];

  return titles.map((title, index) => ({
    title,
    url: urls[index] || `${SOURCE_BASE_URL}${encodeURIComponent(title)}`
  }));
}

async function translateText(text, sourceLanguageCode, targetLanguageCode) {
  const url = new URL(GOOGLE_TRANSLATE_ENDPOINT);
  url.search = new URLSearchParams({
    client: "gtx",
    sl: sourceLanguageCode,
    tl: targetLanguageCode,
    dt: "t",
    q: text
  }).toString();

  const data = await fetchJson(url.toString());

  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error("Traduzione non disponibile");
  }

  return data[0].map((part) => part[0] || "").join("").trim();
}

function renderEntry(entry) {
  entryPos.textContent = "";
  entryLemma.textContent = entry.title;
  entryPronunciation.textContent = "";
  entryContent.innerHTML = entry.renderedHtml || entry.html;
  enhanceEntryContentStructure();
}

function enhanceEntryContentStructure() {
  const blocks = Array.from(entryContent.children).filter(
    (node) => normalizeText(node.textContent).length > 0
  );

  blocks.forEach((node) => {
    node.classList.remove(
      "entry-section-heading",
      "entry-primary-block",
      "entry-content-list",
      "entry-primary-list",
      "entry-primary-leading-item"
    );
  });

  blocks.forEach((node) => {
    if (/^H[2-4]$/.test(node.tagName)) {
      node.classList.add("entry-section-heading");
    }

    if (node.tagName === "UL" || node.tagName === "OL") {
      node.classList.add("entry-content-list");
    }
  });

  const firstMeaningBlock = blocks.find((node) => {
    if (node.classList.contains("loading-note")) {
      return false;
    }

    return ["P", "UL", "OL", "DL"].includes(node.tagName);
  });

  if (!firstMeaningBlock) {
    return;
  }

  const primaryKicker = document.createElement("div");
  primaryKicker.className = "entry-primary-kicker";
  primaryKicker.textContent = t("primaryDefinitionLabel");
  firstMeaningBlock.before(primaryKicker);
  firstMeaningBlock.classList.add("entry-primary-block");

  if (firstMeaningBlock.tagName === "UL" || firstMeaningBlock.tagName === "OL") {
    firstMeaningBlock.classList.add("entry-primary-list");
    const firstVisibleItem = Array.from(firstMeaningBlock.children).find(
      (item) => normalizeText(item.textContent).length > 0
    );
    if (firstVisibleItem) {
      firstVisibleItem.classList.add("entry-primary-leading-item");
    }
  }
}

function getSpeechLanguageCode() {
  const speechLanguageMap = {
    it: "it-IT",
    sq: "sq-AL",
    ar: "ar-SA",
    zh: "zh-CN",
    ur: "ur-PK",
    en: "en-US",
    fr: "fr-FR",
    es: "es-ES",
    de: "de-DE",
    pl: "pl-PL",
    ru: "ru-RU",
    uk: "uk-UA"
  };

  return speechLanguageMap[currentLanguageCode] || "it-IT";
}

function refreshAvailableVoices() {
  if (!("speechSynthesis" in window)) {
    availableVoices = [];
    return;
  }

  availableVoices = window.speechSynthesis.getVoices();
}

function pickBestVoice() {
  const target = getSpeechLanguageCode().toLowerCase();

  return (
    availableVoices.find((voice) => voice.lang.toLowerCase() === target) ||
    availableVoices.find((voice) => voice.lang.toLowerCase().startsWith(target.split("-")[0])) ||
    availableVoices.find((voice) => voice.default) ||
    availableVoices[0] ||
    null
  );
}

function getSpeakableText() {
  if (!currentEntryData || !entryContent.textContent.trim()) {
    return "";
  }

  const parts = [
    entryLemma.textContent.trim(),
    entryPos.textContent.trim(),
    entryContent.textContent.trim()
  ].filter(Boolean);

  return parts.join(". ");
}

function startSpeech() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  if (currentLanguageCode !== DEFAULT_UI_LANGUAGE) {
    return;
  }

  const text = getSpeakableText();

  if (!text) {
    return;
  }

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getSpeechLanguageCode();
  utterance.rate = 0.82;
  utterance.pitch = 1;
  const bestVoice = pickBestVoice();
  if (bestVoice) {
    utterance.voice = bestVoice;
  }
  utterance.onend = () => {
    currentUtterance = null;
  };
  utterance.onerror = () => {
    currentUtterance = null;
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

async function fetchEntry(title) {
  const parseUrl = buildApiUrl({
    action: "parse",
    page: title,
    prop: "text|displaytitle"
  });
  const data = await fetchJson(parseUrl);
  const parsed = data?.parse;

  if (!parsed) {
    throw new Error("Voce non disponibile");
  }

  const cleanedHtml = cleanParsedHtml(parsed.text["*"]);

  return {
    title: parsed.displaytitle ? parserSafeText(parsed.displaytitle) : title,
    html: cleanedHtml,
    renderedHtml: cleanedHtml
  };
}

function getTranslationCacheId(title, languageCode, html) {
  return `${normalizeText(title)}::${languageCode}::${html.length}`;
}

async function translateHtmlContent(html, targetLanguageCode) {
  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = documentFragment.body.firstElementChild;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue.trim()) {
      textNodes.push(node);
    }
  }

  const uniqueTexts = [...new Set(textNodes.map((node) => node.nodeValue.trim()))];
  const translatedPairs = await Promise.all(
    uniqueTexts.map(async (originalText) => {
      try {
        const translatedText = await translateText(
          originalText,
          "it",
          targetLanguageCode
        );
        return [originalText, translatedText || originalText];
      } catch (error) {
        return [originalText, originalText];
      }
    })
  );
  const translations = new Map(translatedPairs);

  textNodes.forEach((node) => {
    const originalText = node.nodeValue.trim();
    const translatedText = translations.get(originalText);
    if (translatedText) {
      node.nodeValue = node.nodeValue.replace(originalText, translatedText);
    }
  });

  return root.innerHTML;
}

async function updateEntryTranslation() {
  if (!currentEntryData || activeEntryTitle !== currentEntryData.title) {
    return;
  }

  const localRequestId = ++translationRequestId;

  if (currentLanguageCode === DEFAULT_UI_LANGUAGE) {
    currentEntryData.renderedHtml = currentEntryData.html;
    renderEntry(currentEntryData);
    return;
  }

  const translationCacheId = getTranslationCacheId(
    currentEntryData.title,
    currentLanguageCode,
    currentEntryData.html
  );
  const cachedTranslation = getCachedValue(
    TRANSLATION_CACHE_KEY,
    translationCacheId,
    TRANSLATION_CACHE_TTL_MS
  );

  if (cachedTranslation) {
    currentEntryData.renderedHtml = cachedTranslation.data.translatedHtml;
    if (localRequestId === translationRequestId) {
      renderEntry(currentEntryData);
    }
    return;
  }

  entryContent.innerHTML = `<p class="loading-note">${t("translationLoading")}</p>`;

  try {
    const translatedHtml = await translateHtmlContent(
      currentEntryData.html,
      currentLanguageCode
    );

    if (localRequestId !== translationRequestId || activeEntryTitle !== currentEntryData.title) {
      return;
    }

    currentEntryData.renderedHtml = translatedHtml;
    setCachedValue(TRANSLATION_CACHE_KEY, translationCacheId, {
      translatedHtml
    });
    renderEntry(currentEntryData);
  } catch (error) {
    if (localRequestId !== translationRequestId || activeEntryTitle !== currentEntryData.title) {
      return;
    }

    currentEntryData.renderedHtml = currentEntryData.html;
    renderEntry(currentEntryData);
  }
}

async function loadEntry(title) {
  activeEntryTitle = title;
  showEntryState();

  const cachedEntry = getCachedValue(
    ENTRY_CACHE_KEY,
    normalizeText(title),
    ENTRY_CACHE_TTL_MS
  );

  if (cachedEntry) {
    currentEntryData = { ...cachedEntry.data };
    renderEntry(currentEntryData);
    setEntryCacheStatusByKey("cacheShowing", {
      time: formatSavedAt(cachedEntry.savedAt)
    });
    updateEntryTranslation();
  } else {
    currentEntryData = null;
    entryPos.textContent = "";
    entryLemma.textContent = title;
    entryPronunciation.textContent = "";
    entryContent.innerHTML = `<p class="loading-note">${t("entryLoading")}</p>`;
    setEntryCacheStatusByKey("cacheLoading");
  }

  renderResults(currentResults);

  try {
    const entry = await fetchEntry(title);

    if (activeEntryTitle !== title) {
      return;
    }

    currentEntryData = { ...entry };
    setCachedValue(ENTRY_CACHE_KEY, normalizeText(title), entry);
    setEntryCacheStatusByKey("cacheUpdated");
    await updateEntryTranslation();
  } catch (error) {
    if (activeEntryTitle !== title) {
      return;
    }

    if (!cachedEntry) {
      currentEntryData = null;
      entryContent.innerHTML = `<p class="loading-note">${t("entryUnavailable")}</p>`;
      setEntryCacheStatusByKey("cacheMissing");
    } else {
      setEntryCacheStatusByKey("cacheFallback", {
        time: formatSavedAt(cachedEntry.savedAt)
      });
    }
  }
}

function renderResults(results) {
  resultsContainer.innerHTML = "";

  if (!results.length) {
    return;
  }

  results.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result-card";

    if (entry.title === activeEntryTitle) {
      button.classList.add("is-active");
    }

    const normalizedQuery = normalizeText(searchInput.value);
    const helperText = normalizedQuery
      ? t("resultOnline", { query: searchInput.value.trim() })
      : t("resultGeneric");

    const title = document.createElement("strong");
    title.textContent = entry.title;

    const subtitle = document.createElement("span");
    subtitle.textContent = helperText;

    button.appendChild(title);
    button.appendChild(subtitle);
    button.addEventListener("click", () => loadEntry(entry.title));
    resultsContainer.appendChild(button);
  });
}

async function handleSearch(query) {
  let effectiveQuery = query.trim();

  if (!effectiveQuery) {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      currentResults = [];
      currentEntryData = null;
      resultsContainer.innerHTML = "";
      setSummaryByKey("summaryIdle");
      activeEntryTitle = null;
      showEmptyState();
      return;
    }
  }

  if (currentLanguageCode !== DEFAULT_UI_LANGUAGE) {
    try {
      effectiveQuery = await translateText(
        effectiveQuery,
        currentLanguageCode,
        "it"
      );
    } catch (error) {
      // Fall back to original query.
    }
  }

  const normalizedQuery = normalizeText(effectiveQuery);

  if (!normalizedQuery) {
    currentResults = [];
    currentEntryData = null;
    resultsContainer.innerHTML = "";
    setSummaryByKey("summaryIdle");
    activeEntryTitle = null;
    showEmptyState();
    return;
  }

  const requestId = ++latestSearchRequestId;
  const cachedSearch = getCachedValue(
    SEARCH_CACHE_KEY,
    normalizedQuery,
    SEARCH_CACHE_TTL_MS
  );

  if (cachedSearch) {
    currentResults = cachedSearch.data;
    renderResults(currentResults);
    setSummaryByKey("summarySearchCache", {
      time: formatSavedAt(cachedSearch.savedAt)
    });
  } else {
    setSummaryByKey("summarySearching");
  }

  try {
    const results = await searchEntries(effectiveQuery);

    if (requestId !== latestSearchRequestId) {
      return;
    }

    currentResults = results;
    setCachedValue(SEARCH_CACHE_KEY, normalizedQuery, results);

    if (!results.length) {
      setSummaryByKey("summaryNoResults");
      showEmptyState();
      renderResults([]);
      return;
    }

    setSummaryByKey(
      results.length === 1 ? "summarySingle" : "summaryMultiple",
      { count: String(results.length) }
    );
    renderResults(results);
  } catch (error) {
    if (!cachedSearch) {
      currentResults = [];
      renderResults([]);
      setSummaryByKey("summarySearchOffline", {}, true);
      showEmptyState();
      return;
    }

    currentResults = cachedSearch.data;
    renderResults(currentResults);
    setSummaryByKey(
      "summarySearchFallback",
      { time: formatSavedAt(cachedSearch.savedAt) },
      true
    );
  }
}

searchInput.addEventListener("input", () => {
  window.clearTimeout(searchDebounceId);
  searchDebounceId = window.setTimeout(() => {
    handleSearch(searchInput.value);
  }, 280);
});

clearButton.addEventListener("click", () => {
  resetSearchInterface({ keepFocus: true });
});

prefLargeTextButton.addEventListener("click", () => {
  toggleReadingPreference("largeText");
});

prefLineSpacingButton.addEventListener("click", () => {
  toggleReadingPreference("spaciousLine");
});

prefStrongContrastButton.addEventListener("click", () => {
  toggleReadingPreference("strongContrast");
});

speakStartButton.addEventListener("click", () => {
  startSpeech();
});

speakStopButton.addEventListener("click", () => {
  stopSpeech();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.activeElement === searchInput && searchInput.value) {
    event.preventDefault();
    resetSearchInterface({ keepFocus: true });
  }
});

initializeLanguageSelector();
applyUiLanguage();
refreshAvailableVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    refreshAvailableVoices();
  };
}
showEmptyState();
