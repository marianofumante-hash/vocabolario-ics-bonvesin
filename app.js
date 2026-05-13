const WIKTIONARY_API_ENDPOINTS = {
  it: "https://it.wiktionary.org/w/api.php",
  en: "https://en.wiktionary.org/w/api.php",
  fr: "https://fr.wiktionary.org/w/api.php",
  es: "https://es.wiktionary.org/w/api.php",
  de: "https://de.wiktionary.org/w/api.php"
};
const WIKTIONARY_PAGE_BASE_URLS = {
  it: "https://it.wiktionary.org/wiki/",
  en: "https://en.wiktionary.org/wiki/",
  fr: "https://fr.wiktionary.org/wiki/",
  es: "https://es.wiktionary.org/wiki/",
  de: "https://de.wiktionary.org/wiki/"
};
const DICTIONARY_CONFIGS = {
  it: {
    languageSectionTitles: ["italiano"],
    lexicalSectionTitles: [
      "sostantivo",
      "aggettivo",
      "verbo",
      "voce verbale",
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
    ],
    blockedHeadingPatterns: [
      "pronuncia",
      "sillabazione",
      "etimologia",
      "derivazione",
      "traduzione",
      "sinonimi",
      "contrari",
      "iperonimi",
      "iponimi",
      "termini correlati",
      "parole derivate",
      "varianti",
      "citazioni",
      "esempi",
      "declinazione",
      "coniugazione",
      "note / riferimenti",
      "note/riferimenti",
      "note",
      "riferimenti",
      "altri progetti",
      "proverbi e modi di dire",
      "anagrammi",
      "vedi anche"
    ]
  },
  en: {
    languageSectionTitles: ["english"],
    lexicalSectionTitles: [
      "noun",
      "proper noun",
      "verb",
      "adjective",
      "adverb",
      "pronoun",
      "article",
      "preposition",
      "conjunction",
      "interjection",
      "phrase",
      "proverb",
      "numeral",
      "abbreviation"
    ],
    blockedHeadingPatterns: [
      "alternative forms",
      "pronunciation",
      "etymology",
      "inflected form",
      "synonyms",
      "antonyms",
      "derived terms",
      "related terms",
      "coordinate terms",
      "hypernyms",
      "hyponyms",
      "quotations",
      "examples",
      "inflection",
      "conjugation",
      "anagrams",
      "references",
      "translations",
      "descendants",
      "further reading",
      "usage notes",
      "quotations",
      "see also"
    ]
  },
  fr: {
    languageSectionTitles: ["francais"],
    lexicalSectionTitles: [
      "nom commun",
      "nom propre",
      "verbe",
      "adjectif",
      "adverbe",
      "pronom",
      "article",
      "preposition",
      "conjonction",
      "interjection",
      "locution",
      "numeral"
    ],
    blockedHeadingPatterns: [
      "prononciation",
      "etymologie",
      "proverbes",
      "phrases toutes faites",
      "locutions",
      "synonymes",
      "antonymes",
      "hyperonymes",
      "hyponymes",
      "exemples",
      "citations",
      "traductions",
      "references",
      "anagrammes",
      "voir aussi",
      "variantes",
      "homophones",
      "derives",
      "forme de verbe",
      "forme flexionnelle",
      "formes flexionnelles",
      "vocabulaire apparente par le sens",
      "mots apparentés",
      "mots apparente",
      "conjugaison",
      "declinaison"
    ]
  },
  es: {
    languageSectionTitles: ["espanol"],
    lexicalSectionTitles: [
      "sustantivo",
      "sustantivo femenino",
      "sustantivo masculino",
      "verbo",
      "adjetivo",
      "adverbio",
      "pronombre",
      "articulo",
      "preposicion",
      "conjuncion",
      "interjeccion",
      "locucion"
    ],
    blockedHeadingPatterns: [
      "etimologia",
      "pronunciacion",
      "refranes",
      "locuciones",
      "sinonimos",
      "antonimos",
      "hiperonimos",
      "hiponimos",
      "ejemplos",
      "conjugacion",
      "declinacion",
      "forma flexiva",
      "formas flexivas",
      "forma verbal",
      "formas verbales",
      "traducciones",
      "referencias",
      "referencias y notas",
      "informacion adicional",
      "vease tambien",
      "anagramas"
    ]
  },
  de: {
    languageSectionTitles: ["deutsch"],
    lexicalSectionTitles: [
      "substantiv",
      "verb",
      "adjektiv",
      "adverb",
      "pronomen",
      "artikel",
      "praposition",
      "konjunktion",
      "interjektion",
      "redewendung",
      "abkurzung",
      "numerale"
    ],
    blockedHeadingPatterns: [
      "aussprache",
      "herkunft",
      "redewendungen",
      "sprichworter",
      "silbentrennung",
      "ubersetzungen",
      "beispiele",
      "synonyme",
      "gegenworter",
      "oberbegriffe",
      "unterbegriffe",
      "worttrennung",
      "beugung",
      "deklination",
      "deklinierte form",
      "grammatische merkmale",
      "dialektausdrucke",
      "konjugation",
      "anmerkungen",
      "referenzen",
      "sinnverwandte worter",
      "wortbildungen",
      "verkleinerungsformen"
    ]
  }
};
const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const DEFAULT_UI_LANGUAGE = "it";
const MAX_SEARCH_RESULTS = 5;
const UI_LANGUAGE_STORAGE_KEY = "vocabolario.uiLanguage.v1";
const DICTIONARY_LANGUAGE_STORAGE_KEY = "vocabolario.dictionaryLanguage.v1";
const READING_PREFERENCES_STORAGE_KEY = "vocabolario.readingPreferences.v1";

const SEARCH_CACHE_KEY = "vocabolario.searchCache.v6";
const ENTRY_CACHE_KEY = "vocabolario.entryCache.v22";
const TRANSLATION_CACHE_KEY = "vocabolario.translationCache.v22";
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
const entryTranslationSummary = document.querySelector("#entry-translation-summary");
const entryDefinitionSummary = document.querySelector("#entry-definition-summary");
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
let activeDictionaryCode = getInitialDictionaryCode();
let readingPreferences = getInitialReadingPreferences();
let activeEntryTitle = null;
let searchDebounceId = null;
let latestSearchRequestId = 0;
let currentResults = [];
let currentEntryData = null;
let lastSummaryState = { key: "summaryIdle", params: {}, isError: false };
let translationRequestId = 0;
let currentUtterance = null;
let availableVoices = [];

const SCHOOL_SAFE_RESULT_PATTERNS = [
  /\bandare a fare in culo\b/,
  /\bfare in culo\b/,
  /\bfancul\w*/,
  /\bvaffancul\w*/,
  /\bcazz\w*/,
  /\bsucchiacazz\w*/,
  /\bfott\w*/,
  /\bstronz\w*/,
  /\bputtan\w*/,
  /\btroi\w*/,
  /\bminchi\w*/,
  /\bcoglion\w*/,
  /\bincul\w*/,
  /\bfuck\w*/,
  /\bmotherfuck\w*/,
  /\bdick\w*/,
  /\bcunt\w*/,
  /\basshole\w*/,
  /\bblowjob\w*/,
  /\bporn\w*/,
  /\bbitch\w*/,
  /\bslut\w*/,
  /\bencul\w*/,
  /\bsalope?\w*/,
  /\bpute\b/,
  /\bputain\b/,
  /\bnique\w*/,
  /\bconnard\w*/,
  /\bbite\b/,
  /\bgilipoll\w*/,
  /\bcabron\w*/,
  /\bching\w*/,
  /\bjoder\w*/,
  /\bput[ao]s?\b/,
  /\bfick\w*/,
  /\bscheiss\w*/,
  /\bhurensohn\w*/,
  /\bfotze\w*/,
  /\barschloch\w*/,
  /\bschwanzlutsch\w*/
];

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeSpaces(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function cleanDefinitionText(value) {
  return normalizeSpaces(
    String(value || "")
      .replace(/^(\([^)]*\)\s*)+/g, "")
      .replace(/^((\[\d+\]|\d+)[\.\):]?\s*)+/g, "")
      .replace(/\s*;\s*/g, "; ")
  );
}

function isEditorialPlaceholderText(value) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return true;
  }

  const editorialPlaceholderPatterns = [
    "definizione mancante",
    "aggiungila tu",
    "missing definition",
    "add it yourself",
    "definition manquante",
    "ajoutez la",
    "definicion faltante",
    "definicion ausente",
    "agregala",
    "fehlende definition",
    "erganze sie"
  ];

  return editorialPlaceholderPatterns.some((pattern) => normalizedValue.includes(pattern));
}

function normalizeMetadataText(value) {
  return normalizeText(String(value || "").replace(/[·.,;:()[\]/\\\-]+/g, " "));
}

function matchesBlockedHeadingTitle(title, blockedHeadingPatterns = []) {
  const normalizedTitle = normalizeText(String(title || "").replace(/[:：]\s*$/, ""));
  return blockedHeadingPatterns.some(
    (pattern) => normalizedTitle === pattern || normalizedTitle.includes(pattern)
  );
}

function looksLikeInflectionLine(text, lemma = "") {
  const normalizedText = normalizeMetadataText(text);
  const normalizedLemma = normalizeMetadataText(lemma);

  if (!normalizedText) {
    return false;
  }

  const inflectionPatterns = [
    "third person singular",
    "simple present",
    "present participle",
    "simple past",
    "past participle",
    "plural",
    "participe",
    "participle",
    "preterito",
    "presente",
    "participio",
    "singular",
    "declension",
    "conjugation",
    "conjugaison",
    "conjugacion",
    "partizip",
    "prateritum",
    "worttrennung",
    "aussprache",
    "ipa",
    "horbeispiele",
    "reime",
    "herkunft"
  ];

  return (
    inflectionPatterns.some((pattern) => normalizedText.includes(pattern)) &&
    (!normalizedLemma || normalizedText.includes(normalizedLemma) || normalizedText.length <= 220)
  );
}

function isSchoolSafeTerm(value) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return true;
  }

  return !SCHOOL_SAFE_RESULT_PATTERNS.some((pattern) => pattern.test(normalizedValue));
}

function filterSchoolSafeResults(results) {
  return results.filter((entry) => isSchoolSafeTerm(entry?.title));
}

function filterExactMatchResults(results, query) {
  const trimmedQuery = String(query || "").trim();
  const normalizedQuery = normalizeText(trimmedQuery);

  if (!normalizedQuery) {
    return results;
  }

  const exactCaseMatches = results.filter(
    (entry) => String(entry?.title || "").trim() === trimmedQuery
  );

  if (exactCaseMatches.length) {
    return [exactCaseMatches[0]];
  }

  const normalizedMatches = results.filter(
    (entry) => normalizeText(entry?.title) === normalizedQuery
  );

  if (normalizedMatches.length) {
    return [normalizedMatches[0]];
  }

  return [];
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

function getInitialDictionaryCode() {
  try {
    const stored = window.localStorage.getItem(DICTIONARY_LANGUAGE_STORAGE_KEY);
    if (stored && availableLanguages.some((language) => language.code === stored)) {
      return stored;
    }
  } catch (error) {
    // Ignore storage read errors.
  }

  return getInitialLanguageCode();
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

function getWiktionaryApiEndpoint(languageCode = DEFAULT_UI_LANGUAGE) {
  return WIKTIONARY_API_ENDPOINTS[languageCode] || WIKTIONARY_API_ENDPOINTS[DEFAULT_UI_LANGUAGE];
}

function getWiktionaryPageBaseUrl(languageCode = DEFAULT_UI_LANGUAGE) {
  return (
    WIKTIONARY_PAGE_BASE_URLS[languageCode] ||
    WIKTIONARY_PAGE_BASE_URLS[DEFAULT_UI_LANGUAGE]
  );
}

function getDictionaryConfig(languageCode = currentLanguageCode) {
  return DICTIONARY_CONFIGS[languageCode] || DICTIONARY_CONFIGS[DEFAULT_UI_LANGUAGE];
}

function buildApiUrl(languageCode, params) {
  const url = new URL(getWiktionaryApiEndpoint(languageCode));
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

function setSummaryByKey(key, params = {}, isError = false) {
  lastSummaryState = { key, params, isError };
  searchSummary.textContent = t(key, params);
  searchSummary.classList.toggle("is-error", isError);
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
  entryTranslationSummary.textContent = "";
  entryDefinitionSummary.textContent = "";
  setSummaryByKey("summaryIdle");
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

  languageSelect.value = activeDictionaryCode;
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

  function updateDictionaryLanguage(nextLanguageCode) {
    activeDictionaryCode = nextLanguageCode;
    currentLanguageCode = nextLanguageCode;
    languageSelect.value = nextLanguageCode;
    entryLanguageSelect.value = nextLanguageCode;
    renderLanguageButtons(heroLanguageOptions, activeDictionaryCode, updateDictionaryLanguage);
    renderLanguageButtons(entryLanguageOptions, currentLanguageCode, updateEntryLanguage);
    try {
      window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, nextLanguageCode);
      window.localStorage.setItem(DICTIONARY_LANGUAGE_STORAGE_KEY, nextLanguageCode);
    } catch (error) {
      // Ignore storage write errors.
    }
    applyUiLanguage();

    if (searchInput.value.trim()) {
      currentEntryData = null;
      activeEntryTitle = null;
      showEmptyState();
      handleSearch(searchInput.value);
    } else {
      resetSearchInterface();
    }
  }

  function updateEntryLanguage(nextLanguageCode) {
    currentLanguageCode = nextLanguageCode;
    languageSelect.value = activeDictionaryCode;
    entryLanguageSelect.value = nextLanguageCode;
    renderLanguageButtons(heroLanguageOptions, activeDictionaryCode, updateDictionaryLanguage);
    renderLanguageButtons(entryLanguageOptions, currentLanguageCode, updateEntryLanguage);
    try {
      window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, nextLanguageCode);
    } catch (error) {
      // Ignore storage write errors.
    }
    applyUiLanguage();

    if (currentEntryData) {
      updateEntryTranslation();
    }
  }

  languageSelect.addEventListener("change", () => {
    updateDictionaryLanguage(languageSelect.value);
  });

  entryLanguageSelect.addEventListener("change", () => {
    updateEntryLanguage(entryLanguageSelect.value);
  });

  renderLanguageButtons(heroLanguageOptions, activeDictionaryCode, updateDictionaryLanguage);
  renderLanguageButtons(entryLanguageOptions, currentLanguageCode, updateEntryLanguage);
}

function cleanParsedHtml(rawHtml, languageCode = currentLanguageCode) {
  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(rawHtml, "text/html");
  const root =
    documentFragment.querySelector(".mw-parser-output") || documentFragment.body;
  const dictionaryConfig = getDictionaryConfig(languageCode);
  const lexicalSectionTitles = dictionaryConfig.lexicalSectionTitles || [];
  const blockedHeadingPatterns = dictionaryConfig.blockedHeadingPatterns || [];
  const languageSectionTitles = dictionaryConfig.languageSectionTitles || [];

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
    "altri progetti",
    "definizione mancante",
    "aggiungila tu",
    "missing definition",
    "add it yourself",
    "definition manquante",
    "definicion faltante",
    "fehlende definition"
  ];

  root.querySelectorAll([
    "style",
    "script",
    "noscript",
    "img",
    "figure",
    "figcaption",
    "picture",
    "source",
    "audio",
    "video",
    ".mw-editsection",
    ".audiotable",
    ".disambig",
    ".disambig-see-also",
    ".interproject-box",
    ".thumb",
    ".reference",
    ".noprint",
    ".sister-wiki",
    ".interProject",
    ".ambox",
    ".metadata",
    "table"
  ].join(",")).forEach((node) => node.remove());

  function getNodeHeading(node) {
    if (!node) {
      return null;
    }

    if (/^H[1-6]$/.test(node.tagName)) {
      return node;
    }

    return node.querySelector("h1, h2, h3, h4, h5, h6");
  }

  function getHeadingLevel(node) {
    const heading = getNodeHeading(node);
    return Number.parseInt(heading?.tagName?.replace("H", "") || "0", 10);
  }

  function getHeadingTitle(node) {
    const heading = getNodeHeading(node);
    return normalizeText(heading?.textContent || "");
  }

  function isMorphologyOnlyHeading(title) {
    return [
      "forma flexiva",
      "formas flexivas",
      "forma verbal",
      "formas verbales",
      "forme de verbe",
      "forme flexionnelle",
      "formes flexionnelles",
      "inflected form",
      "declinierte form",
      "adjektivform",
      "adjective form",
      "forme adjective",
      "forma adjetiva"
    ].some((pattern) => title.includes(pattern));
  }

  function matchesLexicalHeading(title) {
    return lexicalSectionTitles.some((sectionTitle) => title.includes(sectionTitle));
  }

  function isolatePreferredLanguageSection(preferredLanguages = []) {
    if (!preferredLanguages.length) {
      return;
    }

    const rootChildren = Array.from(root.children);
    const preferredIndex = rootChildren.findIndex((node) => {
      const headingTitle = getHeadingTitle(node);
      return (
        getHeadingLevel(node) === 2 &&
        preferredLanguages.some(
          (preferredLanguage) =>
            headingTitle === preferredLanguage || headingTitle.includes(preferredLanguage)
        )
      );
    });

    if (preferredIndex === -1) {
      return;
    }

    const boundaryIndex = rootChildren.findIndex((node, index) => {
      return index > preferredIndex && getHeadingLevel(node) > 0 && getHeadingLevel(node) <= 2;
    });

    rootChildren.forEach((node, index) => {
      const isBeforePreferred = index < preferredIndex;
      const isAfterBoundary = boundaryIndex !== -1 && index >= boundaryIndex;

      if (isBeforePreferred || isAfterBoundary) {
        node.remove();
      }
    });
  }

  isolatePreferredLanguageSection(languageSectionTitles);

  function removeBlockedSections() {
    const rootChildren = Array.from(root.children);

    rootChildren.forEach((node, index) => {
      const title = getHeadingTitle(node);
      const headingLevel = getHeadingLevel(node);

      if (
        headingLevel === 0 ||
        !matchesBlockedHeadingTitle(title, blockedHeadingPatterns)
      ) {
        return;
      }

      let boundaryIndex = rootChildren.length;
      for (let currentIndex = index + 1; currentIndex < rootChildren.length; currentIndex += 1) {
        const nextHeadingLevel = getHeadingLevel(rootChildren[currentIndex]);
        if (nextHeadingLevel > 0 && nextHeadingLevel <= headingLevel) {
          boundaryIndex = currentIndex;
          break;
        }
      }

      const sectionNodes = rootChildren.slice(index, boundaryIndex);
      const lexicalDescendantIndex = sectionNodes.findIndex((sectionNode, sectionIndex) => {
        if (sectionIndex === 0) {
          return false;
        }

        const title = getHeadingTitle(sectionNode);
        const level = getHeadingLevel(sectionNode);

        return (
          level > headingLevel &&
          matchesLexicalHeading(title) &&
          !isMorphologyOnlyHeading(title)
        );
      });

      if (lexicalDescendantIndex !== -1) {
        sectionNodes.slice(0, lexicalDescendantIndex).forEach((sectionNode) => {
          if (
            getHeadingLevel(sectionNode) === 0 ||
            getHeadingLevel(sectionNode) === headingLevel
          ) {
            sectionNode.remove();
          }
        });
        return;
      }

      sectionNodes.forEach((sectionNode) => {
        sectionNode.remove();
      });
    });
  }

  function getLexicalHeadings() {
    return Array.from(root.querySelectorAll("h2, h3, h4, h5")).filter((heading) =>
      matchesLexicalHeading(normalizeText(heading.textContent))
    );
  }

  function trimToPreferredLexicalHeading() {
    const lexicalHeadings = getLexicalHeadings();

    const firstLexicalHeading =
      lexicalHeadings.find((heading) => {
        const title = normalizeText(heading.textContent);
        return !isMorphologyOnlyHeading(title);
      }) ||
      lexicalHeadings.find((heading) => {
        const title = normalizeText(heading.textContent);
        return lexicalSectionTitles.some(
          (sectionTitle) => title === sectionTitle || title.startsWith(`${sectionTitle} `)
        );
      }) ||
      lexicalHeadings.find((heading) => {
        const title = normalizeText(heading.textContent);
        return !matchesBlockedHeadingTitle(title, blockedHeadingPatterns);
      }) ||
      null;

    if (firstLexicalHeading) {
      trimLeadingNodesBeforeTarget(firstLexicalHeading);
    }
  }

  function removeBlockedSectionsAfterLexicalStart() {
    const rootChildren = Array.from(root.children);
    let lexicalStarted = false;

    rootChildren.forEach((node) => {
      const title = getHeadingTitle(node);

      if (matchesLexicalHeading(title) && !isMorphologyOnlyHeading(title)) {
        lexicalStarted = true;
        return;
      }
      if (!lexicalStarted) {
        return;
      }

      if (
        getHeadingLevel(node) > 0 &&
        matchesBlockedHeadingTitle(title, blockedHeadingPatterns)
      ) {
        const headingLevel = getHeadingLevel(node);
        let currentNode = node;

        while (currentNode) {
          const nextNode = currentNode.nextElementSibling;
          currentNode.remove();

          if (!nextNode) {
            break;
          }

          const nextHeadingLevel = getHeadingLevel(nextNode);
          if (nextHeadingLevel > 0 && nextHeadingLevel <= headingLevel) {
            break;
          }

          currentNode = nextNode;
        }
      }
    });
  }

  removeBlockedSections();

  root.querySelectorAll("p, li, dd, div").forEach((node) => {
    const text = normalizeText(node.textContent);
    if (!text) {
      return;
    }

    if (
      blockedTextPatterns.some((pattern) => text.includes(pattern)) ||
      isEditorialPlaceholderText(node.textContent)
    ) {
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

  trimToPreferredLexicalHeading();
  removeBlockedSectionsAfterLexicalStart();

  function collapseIntroBetweenHeadingAndMeaning() {
    const rootChildren = Array.from(root.children).filter(
      (node) => normalizeText(node.textContent).length > 0
    );

    if (rootChildren.length < 3) {
      return;
    }

    const firstStructuredMeaningIndex = rootChildren.findIndex((node, index) => {
      if (index === 0) {
        return false;
      }

      return ["UL", "OL", "DL"].includes(node.tagName);
    });

    if (firstStructuredMeaningIndex <= 1) {
      return;
    }

    rootChildren.slice(1, firstStructuredMeaningIndex).forEach((node) => {
      if (getHeadingLevel(node) > 0) {
        return;
      }

      if (node.tagName === "P" || node.tagName === "DIV") {
        node.remove();
      }
    });
  }

  collapseIntroBetweenHeadingAndMeaning();

  function extractCleanText(node, { stripNestedLists = false } = {}) {
    const clone = node.cloneNode(true);

    clone.querySelectorAll([
      "sup",
      ".reference",
      ".citation-whole",
      ".h-quotation",
      ".e-translation",
      ".cited-source",
      "blockquote",
      "q",
      "cite"
    ].join(",")).forEach((child) => child.remove());

    if (stripNestedLists) {
      clone.querySelectorAll("ul, ol, dl").forEach((child) => child.remove());
    }

    return normalizeSpaces(clone.textContent);
  }

  function buildCompactLexicalHtml() {
    const rootChildren = Array.from(root.children).filter(
      (node) => normalizeText(node.textContent).length > 0
    );
    const lexicalSections = [];

    rootChildren.forEach((node, index) => {
      const title = getHeadingTitle(node);
      if (!matchesLexicalHeading(title) || isMorphologyOnlyHeading(title)) {
        return;
      }
      if (matchesBlockedHeadingTitle(title, blockedHeadingPatterns)) {
        return;
      }

      const sectionNodes = [];
      for (let sectionIndex = index + 1; sectionIndex < rootChildren.length; sectionIndex += 1) {
        const candidate = rootChildren[sectionIndex];
        if (getHeadingLevel(candidate) > 0) {
          break;
        }
        sectionNodes.push(candidate);
      }

      lexicalSections.push({
        heading: normalizeSpaces(getNodeHeading(node)?.textContent || ""),
        nodes: sectionNodes
      });
    });

    const usefulSections = lexicalSections
      .map((section) => {
        const metadataLines = [];
        const definitions = [];

        section.nodes.forEach((node) => {
          if (definitions.length >= 2) {
            return;
          }

          if (node.tagName === "P") {
            const metadataText = extractCleanText(node, { stripNestedLists: true });
            const strippedMetadataLabel = metadataText.replace(/[:：]\s*$/, "");
            if (
              metadataText &&
              normalizeText(metadataText) !== normalizeText(entryLemma?.textContent || "") &&
              !looksLikeInflectionLine(metadataText, entryLemma?.textContent || "") &&
              !matchesBlockedHeadingTitle(strippedMetadataLabel, blockedHeadingPatterns) &&
              !/^[^.!?]{1,40}[:：]\s*$/.test(metadataText) &&
              metadataLines.length < 1 &&
              metadataText.length <= 220
            ) {
              metadataLines.push(metadataText);
            }
            return;
          }

          if (node.tagName === "DL") {
            const previousLabelNode = node.previousElementSibling;
            const previousLabelText = previousLabelNode
              ? extractCleanText(previousLabelNode, { stripNestedLists: true })
              : "";
            const previousLabelNormalized = normalizeText(previousLabelText.replace(/[:：]\s*$/, ""));

            if (matchesBlockedHeadingTitle(previousLabelNormalized, blockedHeadingPatterns)) {
              return;
            }

            const items = Array.from(node.children);

            if (items.every((child) => child.tagName === "DD")) {
              items.forEach((child) => {
                if (definitions.length >= 2) {
                  return;
                }

                const definitionText = cleanDefinitionText(
                  extractCleanText(child, { stripNestedLists: true })
                );

                if (
                  !definitionText ||
                  isEditorialPlaceholderText(definitionText) ||
                  looksLikeInflectionLine(definitionText, entryLemma?.textContent || "") ||
                  /^(ipa|horbeispiele|reime)[:：]/i.test(normalizeText(definitionText))
                ) {
                  return;
                }

                definitions.push(definitionText);
              });
              return;
            }

            for (let index = 0; index < items.length && definitions.length < 2; index += 1) {
              const child = items[index];

              if (child.tagName !== "DT") {
                continue;
              }

              let label = extractCleanText(child, { stripNestedLists: true }).replace(/^\d+\s*/, "");
              let body = "";
              let nextIndex = index + 1;

              while (nextIndex < items.length && items[nextIndex].tagName === "DD") {
                const candidate = extractCleanText(items[nextIndex], { stripNestedLists: true });
                if (candidate) {
                  body = body ? `${body} ${candidate}` : candidate;
                }
                nextIndex += 1;
              }

              index = nextIndex - 1;
              label = normalizeSpaces(label);
              body = normalizeSpaces(body);

              if (!body && !label) {
                continue;
              }

              if (isEditorialPlaceholderText(`${label} ${body}`)) {
                continue;
              }

              if (label && !body) {
                definitions.push(cleanDefinitionText(label));
                continue;
              }

              if (!label || /^\d+$/.test(label)) {
                definitions.push(cleanDefinitionText(body));
                continue;
              }

              definitions.push(cleanDefinitionText(`${label}: ${body}`));
            }

            return;
          }

          if (node.tagName === "OL" || node.tagName === "UL") {
            Array.from(node.children).forEach((item) => {
              if (definitions.length >= 2) {
                return;
              }

              const definitionText = cleanDefinitionText(
                extractCleanText(item, { stripNestedLists: true })
              );
              if (definitionText && !isEditorialPlaceholderText(definitionText)) {
                definitions.push(definitionText);
              }
            });
          }
        });

        return {
          heading: section.heading,
          metadataLines,
          definitions
        };
      })
      .filter((section) => section.definitions.length || section.metadataLines.length)
      .slice(0, 2);

    function isNounSectionHeading(heading) {
      const normalizedHeading = normalizeText(heading);
      return [
        "noun",
        "nom commun",
        "sostantivo",
        "sustantivo",
        "substantiv",
        "nome comune"
      ].some((pattern) => normalizedHeading.includes(pattern));
    }

    function isAdjectiveSectionHeading(heading) {
      const normalizedHeading = normalizeText(heading);
      return [
        "adjective",
        "adjectif",
        "aggettivo",
        "adjetivo",
        "adjektiv"
      ].some((pattern) => normalizedHeading.includes(pattern));
    }

    const filteredSections =
      usefulSections.length >= 2 &&
      (isNounSectionHeading(usefulSections[0].heading) ||
        isVerbSectionHeading(usefulSections[0].heading)) &&
      isAdjectiveSectionHeading(usefulSections[1].heading)
        ? usefulSections.slice(0, 1)
        : usefulSections;

    if (!filteredSections.length) {
      return null;
    }

    const compactWrapper = document.createElement("div");

    filteredSections.forEach((section) => {
      const compactHeading = document.createElement("h3");
      compactHeading.textContent = section.heading;
      compactWrapper.appendChild(compactHeading);

      section.metadataLines.forEach((line) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        compactWrapper.appendChild(paragraph);
      });

      if (section.definitions.length) {
        const list = document.createElement("ol");
        section.definitions.forEach((definition) => {
          const item = document.createElement("li");
          item.textContent = definition;
          list.appendChild(item);
        });
        compactWrapper.appendChild(list);
      }
    });

    return normalizeText(compactWrapper.textContent) ? compactWrapper.innerHTML : null;
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildCompactLexicalHtml() || root.innerHTML.trim();

  if (!normalizeText(wrapper.textContent)) {
    return htmlBeforeLeadingTrim || `<p class="loading-note">${t("entryEmpty")}</p>`;
  }

  return wrapper.innerHTML || `<p class="loading-note">${t("entryEmpty")}</p>`;
}

function getSearchCacheId(query, languageCode) {
  return `${languageCode}::${normalizeText(query)}`;
}

function hasPreferredLanguageSection(rawHtml, languageCode = DEFAULT_UI_LANGUAGE) {
  const dictionaryConfig = getDictionaryConfig(languageCode);
  const languageSectionTitles = dictionaryConfig.languageSectionTitles || [];

  if (!languageSectionTitles.length) {
    return true;
  }

  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(rawHtml, "text/html");
  const root =
    documentFragment.querySelector(".mw-parser-output") || documentFragment.body;

  return Array.from(root.querySelectorAll("h2")).some((heading) => {
    const headingTitle = normalizeText(heading.textContent);
    return languageSectionTitles.some(
      (languageTitle) =>
        headingTitle === languageTitle || headingTitle.includes(languageTitle)
    );
  });
}

function sanitizeSearchResults(results, query, languageCode = activeDictionaryCode) {
  const exactResults = filterExactMatchResults(
    filterSchoolSafeResults(Array.isArray(results) ? results : []),
    query
  );

  return exactResults.filter((entry) => {
    return !entry?.languageCode || entry.languageCode === languageCode;
  });
}

async function searchEntries(query, languageCode = DEFAULT_UI_LANGUAGE) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const url = buildApiUrl(languageCode, {
    action: "query",
    titles: query.trim(),
    redirects: "1"
  });

  const data = await fetchJson(url);
  const pages = Object.values(data?.query?.pages || {});
  const exactPage = pages.find((page) => {
    if (!page || page.missing !== undefined) {
      return false;
    }

    return normalizeText(page.title) === normalizedQuery;
  });

  if (!exactPage) {
    return [];
  }

  const parseUrl = buildApiUrl(languageCode, {
    action: "parse",
    page: exactPage.title,
    prop: "text|displaytitle"
  });
  const parseData = await fetchJson(parseUrl);
  const parsed = parseData?.parse;

  if (!parsed?.text?.["*"] || !hasPreferredLanguageSection(parsed.text["*"], languageCode)) {
    return [];
  }

  const sourceTitle = parsed.displaytitle
    ? parserSafeText(parsed.displaytitle)
    : exactPage.title;

  return [{
    title: sourceTitle,
    languageCode,
    lookupTitle: exactPage.title,
    url: `${getWiktionaryPageBaseUrl(languageCode)}${encodeURIComponent(exactPage.title)}`
  }].slice(0, MAX_SEARCH_RESULTS);
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

function renderEntryTranslationSummary(label, value) {
  entryTranslationSummary.replaceChildren();

  if (!value) {
    return;
  }

  const labelElement = document.createElement("span");
  labelElement.className = "entry-translation-label";
  labelElement.textContent = label;

  const valueElement = document.createElement("strong");
  valueElement.className = "entry-translation-value";
  valueElement.textContent = value;

  entryTranslationSummary.append(labelElement, valueElement);
}

function renderEntry(entry) {
  const posLabel = normalizeSpaces(entry?.posLabel || "");
  entryPos.textContent = posLabel.includes("·") ? "" : posLabel;
  const targetTranslation = normalizeSpaces(entry?.targetTranslation || "");
  const italianTranslation = normalizeSpaces(entry?.italianTranslation || "");
  const visibleTranslation = targetTranslation || italianTranslation;
  const translationLabel = targetTranslation
    ? t("entryLemmaTranslationLabel")
    : t("entryItalianTranslationLabel");
  renderEntryTranslationSummary(translationLabel, visibleTranslation);
  entryDefinitionSummary.textContent = cleanDefinitionText(entry?.firstDefinition || "");
  entryLemma.textContent = entry.title;
  entryPronunciation.textContent = "";
  entryContent.innerHTML = entry.html;
  enhanceEntryContentStructure();
}

function enhanceEntryContentStructure() {
  entryContent.querySelectorAll("li").forEach((item) => {
    const cleanedText = cleanDefinitionText(item.textContent);
    if (cleanedText && cleanedText !== item.textContent) {
      item.textContent = cleanedText;
    }
  });

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

  function isLowValueIntroBlock(node) {
    const normalizedNodeText = normalizeText(node.textContent);
    const normalizedLemma = normalizeText(entryLemma.textContent);

    if (node.classList.contains("loading-note")) {
      return true;
    }

    if (!normalizedNodeText) {
      return true;
    }

    if (node.tagName === "P" && node.querySelector(".headword-line")) {
      return true;
    }

    if (node.tagName === "P" && normalizedNodeText === normalizedLemma) {
      return true;
    }

    return false;
  }

  const structuredMeaningBlock = blocks.find((node) => {
    if (node.classList.contains("loading-note")) {
      return false;
    }

    if (isLowValueIntroBlock(node)) {
      return false;
    }

    return ["UL", "OL", "DL"].includes(node.tagName);
  });

  const paragraphMeaningBlock = blocks.find((node) => {
    if (isLowValueIntroBlock(node)) {
      return false;
    }

    return node.tagName === "P";
  });

  const firstMeaningBlock = structuredMeaningBlock || paragraphMeaningBlock;

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

function getEntryCacheId(title, languageCode) {
  return `${languageCode}::${normalizeText(title)}`;
}

async function fetchEntry(title, languageCode = currentLanguageCode) {
  const parseUrl = buildApiUrl(languageCode, {
    action: "parse",
    page: title,
    prop: "text|displaytitle"
  });
  const data = await fetchJson(parseUrl);
  const parsed = data?.parse;

  if (!parsed) {
    throw new Error("Voce non disponibile");
  }

  if (!hasPreferredLanguageSection(parsed.text["*"], languageCode)) {
    throw new Error("Voce non disponibile nella lingua selezionata");
  }

  const cleanedHtml = cleanParsedHtml(parsed.text["*"], languageCode);
  const entryMetadata = extractEntryMetadata(cleanedHtml);

  const sourceTitle = parsed.displaytitle ? parserSafeText(parsed.displaytitle) : title;

  return {
    title: sourceTitle,
    sourceTitle,
    sourceLanguageCode: languageCode,
    posLabel: entryMetadata.posLabel,
    firstDefinition: entryMetadata.firstDefinition,
    sections: entryMetadata.sections,
    html: cleanedHtml
  };
}

function getTextTranslationCacheId(text, sourceLanguageCode, targetLanguageCode, scope = "text") {
  return `text::${scope}::${sourceLanguageCode}::${targetLanguageCode}::${normalizeText(text)}`;
}

async function getTranslatedText(text, sourceLanguageCode, targetLanguageCode, scope = "text") {
  const cacheId = getTextTranslationCacheId(
    text,
    sourceLanguageCode,
    targetLanguageCode,
    scope
  );
  const cachedTranslation = getCachedValue(
    TRANSLATION_CACHE_KEY,
    cacheId,
    TRANSLATION_CACHE_TTL_MS
  );

  if (cachedTranslation?.data?.translatedText) {
    return cachedTranslation.data.translatedText;
  }

  const translatedText = await translateText(text, sourceLanguageCode, targetLanguageCode);

  if (translatedText) {
    setCachedValue(TRANSLATION_CACHE_KEY, cacheId, { translatedText });
  }

  return translatedText;
}

function extractEntryMetadata(html) {
  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = documentFragment.body.firstElementChild || documentFragment.body;
  const sectionHeadings = Array.from(root.querySelectorAll("h3, h4, h2"));
  const sections = sectionHeadings.map((heading) => {
    const headingText = normalizeSpaces(heading.textContent);
    let nextNode = heading.nextElementSibling;
    const definitions = [];

    while (nextNode && !/^H[2-6]$/.test(nextNode.tagName)) {
      if (nextNode.tagName === "OL" || nextNode.tagName === "UL") {
        Array.from(nextNode.children).forEach((item) => {
          const text = cleanDefinitionText(item.textContent);
          if (text && definitions.length < 2) {
            definitions.push(text);
          }
        });
      }
      nextNode = nextNode.nextElementSibling;
    }

    return {
      heading: headingText,
      definitions
    };
  }).filter((section) => section.heading);

  const posLabel = sections.map((section) => section.heading).slice(0, 2).join(" · ");
  const firstDefinition = sections.find((section) => section.definitions.length)?.definitions[0] || "";

  return {
    posLabel,
    firstDefinition,
    sections
  };
}

function cleanLemmaTranslation(originalWord, translatedText, { allowSameAsOriginal = false } = {}) {
  const normalizedOriginal = normalizeText(originalWord);
  const cleanedText = normalizeSpaces(
    String(translatedText || "")
      .replace(/\(([^)]*)\)/g, "")
      .replace(/^[\s:;,\-]+|[\s:;,\-]+$/g, "")
  );

  if (!cleanedText) {
    return "";
  }

  if (!allowSameAsOriginal && normalizeText(cleanedText) === normalizedOriginal) {
    return "";
  }

  return cleanedText;
}

function isVerbSectionHeading(heading) {
  const normalizedHeading = normalizeText(heading);
  return [
    "verb",
    "verbo",
    "voce verbale"
  ].some((pattern) => normalizedHeading.includes(pattern));
}

async function enrichEntryItalianTranslation(entry, activeTitle = activeEntryTitle) {
  if (!entry || entry.sourceLanguageCode === DEFAULT_UI_LANGUAGE) {
    return entry;
  }

  const italianTranslation = await getEntryLemmaTranslation(entry, DEFAULT_UI_LANGUAGE);

  if (activeEntryTitle !== activeTitle || currentEntryData?.title !== activeTitle) {
    return entry;
  }

  entry.italianTranslation = italianTranslation;
  return entry;
}

async function getEntryLemmaTranslation(entry, targetLanguageCode) {
  if (!entry || !targetLanguageCode) {
    return "";
  }

  const sourceLanguageCode =
    entry.sourceLanguageCode || activeDictionaryCode || DEFAULT_UI_LANGUAGE;

  if (sourceLanguageCode === targetLanguageCode) {
    return "";
  }

  const sections = Array.isArray(entry.sections) ? entry.sections.slice(0, 2) : [];
  const sourceText = entry.sourceTitle || entry.lookupTitle || entry.title;
  const translations = [];

  try {
    for (const section of sections.length ? sections : [{ heading: entry.posLabel || "" }]) {
      const heading = normalizeSpaces(section.heading || "");
      const prompt =
        sourceLanguageCode === "en" && isVerbSectionHeading(heading)
          ? `to ${sourceText}`
          : heading
            ? `${sourceText} (${heading})`
            : sourceText;
      const translatedText = await getTranslatedText(
        prompt,
        sourceLanguageCode,
        targetLanguageCode,
        "lemma-only"
      );
      const lemmaTranslation = cleanLemmaTranslation(sourceText, translatedText, {
        allowSameAsOriginal: true
      });

      if (lemmaTranslation) {
        translations.push(lemmaTranslation);
      }
    }

    if (!translations.length) {
      const translatedText = await getTranslatedText(
        sourceText,
        sourceLanguageCode,
        targetLanguageCode,
        "lemma-only-fallback"
      );
      const lemmaTranslation = cleanLemmaTranslation(sourceText, translatedText, {
        allowSameAsOriginal: true
      });

      if (lemmaTranslation) {
        translations.push(lemmaTranslation);
      }
    }

    return [...new Set(translations)].slice(0, 2).join("; ");
  } catch (error) {
    return "";
  }
}

async function updateEntryTranslation() {
  if (!currentEntryData || activeEntryTitle !== currentEntryData.title) {
    return;
  }

  const localRequestId = ++translationRequestId;
  const sourceLanguageCode =
    currentEntryData.sourceLanguageCode || activeDictionaryCode || DEFAULT_UI_LANGUAGE;

  if (currentLanguageCode === sourceLanguageCode) {
    currentEntryData.targetTranslation = "";
    renderEntry(currentEntryData);
    return;
  }

  currentEntryData.targetTranslation = "";
  renderEntry(currentEntryData);

  try {
    const targetTranslation = await getEntryLemmaTranslation(currentEntryData, currentLanguageCode);

    if (localRequestId !== translationRequestId || activeEntryTitle !== currentEntryData.title) {
      return;
    }

    currentEntryData.targetTranslation = targetTranslation;
    renderEntry(currentEntryData);
  } catch (error) {
    if (localRequestId !== translationRequestId || activeEntryTitle !== currentEntryData.title) {
      return;
    }

    currentEntryData.targetTranslation = "";
    renderEntry(currentEntryData);
  }
}

async function loadEntry(result) {
  const displayTitle =
    typeof result === "string" ? result : result?.title || "";
  const lookupTitle =
    typeof result === "string" ? result : result?.lookupTitle || result?.title || "";
  const sourceLanguageCode =
    typeof result === "string" ? activeDictionaryCode : result?.languageCode || activeDictionaryCode;

  if (!displayTitle || !lookupTitle) {
    return;
  }

  if (!isSchoolSafeTerm(displayTitle)) {
    currentResults = filterSchoolSafeResults(currentResults);
    renderResults(currentResults);
    currentEntryData = null;
    activeEntryTitle = null;
    setSummaryByKey("summaryQueryBlocked", {}, true);
    showEmptyState();
    return;
  }

  activeEntryTitle = displayTitle;
  showEntryState();

  const cachedEntry = getCachedValue(
    ENTRY_CACHE_KEY,
    getEntryCacheId(lookupTitle, sourceLanguageCode),
    ENTRY_CACHE_TTL_MS
  );

  if (cachedEntry) {
    currentEntryData = {
      ...cachedEntry.data,
      title: displayTitle,
      lookupTitle,
      sourceLanguageCode
    };
    renderEntry(currentEntryData);
    enrichEntryItalianTranslation(currentEntryData, displayTitle).then((entry) => {
      if (activeEntryTitle === displayTitle && currentEntryData === entry) {
        renderEntry(entry);
      }
    });
    updateEntryTranslation();
  } else {
    currentEntryData = null;
    entryPos.textContent = "";
    entryTranslationSummary.textContent = "";
    entryDefinitionSummary.textContent = "";
    entryLemma.textContent = displayTitle;
    entryPronunciation.textContent = "";
    entryContent.innerHTML = `<p class="loading-note">${t("entryLoading")}</p>`;
  }

  renderResults(currentResults);

  try {
    const entry = await fetchEntry(lookupTitle, sourceLanguageCode);

    if (activeEntryTitle !== displayTitle) {
      return;
    }

    currentEntryData = {
      ...entry,
      title: displayTitle,
      lookupTitle,
      sourceLanguageCode
    };
    await enrichEntryItalianTranslation(currentEntryData, displayTitle);
    setCachedValue(
      ENTRY_CACHE_KEY,
      getEntryCacheId(lookupTitle, sourceLanguageCode),
      currentEntryData
    );
    await updateEntryTranslation();
  } catch (error) {
    if (activeEntryTitle !== displayTitle) {
      return;
    }

    if (!cachedEntry) {
      currentEntryData = null;
      entryContent.innerHTML = `<p class="loading-note">${t("entryUnavailable")}</p>`;
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
    button.addEventListener("click", () => loadEntry(entry));
    resultsContainer.appendChild(button);
  });
}

async function handleSearch(query) {
  const effectiveQuery = query.trim();

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

  if (/\s/.test(effectiveQuery)) {
    currentResults = [];
    currentEntryData = null;
    resultsContainer.innerHTML = "";
    activeEntryTitle = null;
    setSummaryByKey("summarySingleWordOnly", {}, true);
    showEmptyState();
    return;
  }

  if (!isSchoolSafeTerm(effectiveQuery)) {
    currentResults = [];
    currentEntryData = null;
    resultsContainer.innerHTML = "";
    activeEntryTitle = null;
    setSummaryByKey("summaryQueryBlocked", {}, true);
    showEmptyState();
    return;
  }

  const requestId = ++latestSearchRequestId;
  const searchCacheId = getSearchCacheId(effectiveQuery, activeDictionaryCode);
  const cachedSearch = getCachedValue(
    SEARCH_CACHE_KEY,
    searchCacheId,
    SEARCH_CACHE_TTL_MS
  );
  const cachedResults = cachedSearch
    ? sanitizeSearchResults(cachedSearch.data, effectiveQuery, activeDictionaryCode)
    : [];

  if (cachedResults.length) {
    currentResults = cachedResults;
    renderResults(currentResults);
    setSummaryByKey(
      cachedResults.length === 1 ? "summarySingle" : "summaryMultiple",
      { count: String(cachedResults.length) }
    );
  } else {
    setSummaryByKey("summarySearching");
  }

  try {
    const results = sanitizeSearchResults(
      await searchEntries(effectiveQuery, activeDictionaryCode),
      effectiveQuery,
      activeDictionaryCode
    );

    if (requestId !== latestSearchRequestId) {
      return;
    }

    currentResults = results;
    setCachedValue(SEARCH_CACHE_KEY, searchCacheId, results);

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
    if (!cachedResults.length) {
      currentResults = [];
      renderResults([]);
      setSummaryByKey("summarySearchOffline", {}, true);
      showEmptyState();
      return;
    }

    currentResults = cachedResults;
    renderResults(currentResults);
    setSummaryByKey(
      cachedResults.length === 1 ? "summarySingle" : "summaryMultiple",
      { count: String(cachedResults.length) }
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
