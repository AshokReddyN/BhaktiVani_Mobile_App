import { Stotra, Category, Language } from '../../../types/data';

export const LANGUAGES: Language[] = [
  { id: 'kannada', name: 'ಕನ್ನಡ' },
  { id: 'sanskrit', name: 'संस्कृतम्' },
  { id: 'telugu', name: 'తెలుగు' },
];

export const CATEGORIES: Category[] = [
  { id: 'stotras', name: 'Stotras' },
  { id: 'mantras', name: 'Mantras' },
  { id: 'ashtottaras', name: 'Ashtottaras' },
  { id: 'vratas', name: 'Vratas' },
];

export const ALL_STOTRAS: Stotra[] = [
  // Kannada
  {
    id: 'ganesha-pancharatnam-kannada',
    title: 'ಗಣೇಶ ಪಂಚರತ್ನಂ',
    languageId: 'kannada',
    categoryId: 'stotras',
    content: `ಮುದಾಕರಾತ್ತ ಮೋದಕಂ ಸದಾ ವಿಮುಕ್ತಿ ಸಾಧಕಂ
ಕಳಾಧರಾವತಂಸಕಂ ವಿಲಾಸಿಲೋಕ ರಕ್ಷಕಂ
ಅನಾಯಕೈಕ ನಾಯಕಂ ವಿನಾಶಿತೇಭ ದೈತ್ಯಕಂ
ನತಾಶುಭಾಶು ನಾಶಕಂ ನಮಾಮಿ ತಂ ವಿನಾಯಕಂ || 1 ||

... (remaining text) ...
`,
  },
  {
    id: 'shiva-ashtottara-shata-namavali-kannada',
    title: 'ಶಿವ ಅಷ್ಟೋತ್ತರ ಶತ ನಾಮಾವಳಿ',
    languageId: 'kannada',
    categoryId: 'ashtottaras',
    content: `ಓಂ ಶಿವಾಯ ನಮಃ |
ಓಂ ಮಹೇಶ್ವರಾಯ ನಮಃ |
ಓಂ ಶಂಭವೇ ನಮಃ |
... (remaining text) ...
`,
  },

  // Sanskrit
  {
    id: 'shiva-tandava-stotram-sanskrit',
    title: 'शिवताण्डवस्तोत्रम्',
    languageId: 'sanskrit',
    categoryId: 'stotras',
    content: `जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥ १॥

... (remaining text) ...
`,
  },
  {
    id: 'rama-raksha-stotram-sanskrit',
    title: 'श्रीरामरक्षास्तोत्रम्',
    languageId: 'sanskrit',
    categoryId: 'stotras',
    content: `अस्य श्रीरामरक्षास्तोत्रमन्त्रस्य ।
बुधकौशिक ऋषिः ।
श्रीसीतारामचन्द्रो देवता ।
... (remaining text) ...
`,
  },

  // Telugu
  {
    id: 'hanuman-chalisa-telugu',
    title: 'హనుమాన్ చాలీసా',
    languageId: 'telugu',
    categoryId: 'stotras',
    content: `శ్రీ గురు చరణ సరోజ రజ నిజ మన ముకుర సుధారి |
వరణౌ రఘువర విమల యశ జో దాయక ఫల చారి ||

... (remaining text) ...
`,
  },
  {
    id: 'lakshmi-ashtottara-shatanamavali-telugu',
    title: 'లక్ష్మీ అష్టోత్తర శతనామావళి',
    languageId: 'telugu',
    categoryId: 'ashtottaras',
    content: `ఓం ప్రకృత్యై నమః |
ఓం వికృత్యై నమః |
ఓం విద్యాయై నమః |
... (remaining text) ...
`,
  },
];
