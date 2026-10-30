// Lesson content for Module 4, Lesson 2: Real or Fake? AI-Generated News & Misinformation
// All "AI-generated" examples are clearly-labelled constructed teaching simulations.

export interface HeadlineItem {
  id: string;
  text: string;
  emoji: string;
  topic: string;
}

// ── Stage 1: Headline Challenge ──────────────────────────────────────────────
export const challengeHeadlines: HeadlineItem[] = [
  {
    id: 'h1',
    text: 'Scientists Discover a New Animal Deep in the Ocean!',
    emoji: '🐠',
    topic: 'Animals & Nature',
  },
  {
    id: 'h2',
    text: 'Schools Will Now Close Every Friday Across the World!',
    emoji: '🏫',
    topic: 'Schools & Education',
  },
  {
    id: 'h3',
    text: 'Researchers Find That Plants Can Grow Faster When They Hear Music!',
    emoji: '🌿',
    topic: 'Science & Technology',
  },
];

// Tutor answer key — revealed only to the tutor
export const challengeAnswerKey = {
  notes:
    'None of these headlines are labelled true or false yet — the point is to show that an exciting headline is NOT proof. All three are plausible-sounding but Tiwa should want evidence before believing any.',
  say:
    'Headlines are designed to grab our attention. An exciting headline makes us curious — but it does not tell us whether the story is true.',
  ask: 'Which headline made you feel most surprised? Did that surprise make you believe it more, or want to check it?',
  lookFor: 'Tiwa recognises that a professional-looking headline is not the same as proof.',
  ifStruggles:
    'Ask Tiwa to imagine a headline that says "Dogs Can Fly!" — it sounds exciting, but does excitement make it true? What would you need before believing it?',
  followUp: 'Can you think of a real headline you saw recently? Did you believe it right away?',
};

// ── Stage 2: Classification activity ─────────────────────────────────────────
export interface ClassificationItem {
  id: string;
  text: string;
  source: string;
  correctType: 'verified' | 'misleading' | 'invented';
}

export const classificationItems: ClassificationItem[] = [
  {
    id: 'c1',
    text: 'NASA Successfully Lands the Perseverance Rover on Mars',
    source: 'Reported by NASA.gov, BBC, Reuters, and multiple space agencies.',
    correctType: 'verified',
  },
  {
    id: 'c2',
    text: 'A New Study Shows Eating Chocolate Every Day Makes You Live Forever',
    source: 'The headline sounds scientific, but no real study shows this. The claim exaggerates beyond any evidence.',
    correctType: 'misleading',
  },
  {
    id: 'c3',
    text: 'Scientists Confirm That Dinosaurs Are Still Alive on a Hidden Island',
    source: 'No verified evidence exists. The story was created to sound like news.',
    correctType: 'invented',
  },
];

// ── Stage 3: Headline Inspector ──────────────────────────────────────────────
export interface InspectorItem {
  id: string;
  index: number;
  headline: string;
  topic: string;
  emoji: string;
  warningSign: string;
  answerKey: {
    error: string;
    explanation: string;
  };
}

export const inspectorItems: InspectorItem[] = [
  {
    id: 'i1',
    index: 1,
    headline: 'SHOCKING: A Giant Octopus Was Spotted Walking Down Main Street Yesterday!',
    topic: 'Animals & Nature',
    emoji: '🐙',
    warningSign: 'Sensational, exaggerated language ("SHOCKING", "Giant"). No specific city named. No verifiable source.',
    answerKey: {
      error: 'Sensational language + missing specifics. The headline uses "SHOCKING" and "Giant" to grab attention but names no real city, date, or source.',
      explanation:
        'A real news report would name the city, date, and cite a source. The exaggerated words are a warning sign that we should investigate.',
    },
  },
  {
    id: 'i2',
    index: 2,
    headline: 'Breaking: All Phones Will Be Banned in Every Country Starting Tomorrow',
    topic: 'Technology',
    emoji: '📱',
    warningSign: 'Claim that sounds unbelievable and affects "every country." Impossible scale. No official announcement or source.',
    answerKey: {
      error: 'Unbelievable claim with no source. A worldwide ban starting tomorrow would require official government announcements.',
      explanation:
        'When a claim is this huge and this sudden, it needs strong evidence. No government source is cited — that is a major warning sign.',
    },
  },
  {
    id: 'i3',
    index: 3,
    headline: 'Scientists Prove That 97% of Children Prefer Broccoli to Chocolate',
    topic: 'Food & Health',
    emoji: '🥦',
    warningSign: 'Suspicious statistic. The number sounds precise but is surprising. No study name, researcher, or source given.',
    answerKey: {
      error: 'Misleading statistic with no source. "97%" sounds precise and scientific, but no study or researcher is named.',
      explanation:
        'Real studies name the researcher, the journal, and how many people were asked. A number alone is not evidence.',
    },
  },
  {
    id: 'i4',
    index: 4,
    headline: 'Researchers Say Music Helps Plants Grow — Published in the Journal of Plant Biology, 2024',
    topic: 'Science',
    emoji: '🎵',
    warningSign:
      'This one looks more reliable — it names a journal and year. But Tiwa should still CHECK. The journal and claim may be real or may be invented. (Teaching point: even well-sourced headlines need verification.)',
    answerKey: {
      error: 'Looks reliable but still needs checking. The journal name and year make it sound credible, but that does not guarantee it is real.',
      explanation:
        'A real journal name is a good sign, but we still verify. Some misleading headlines add fake sources to look convincing.',
    },
  },
];

// ── Stage 4: STOP-CHECK-THINK worked example ─────────────────────────────────
export const workedExample = {
  claim: 'AI-Generated Headline: "The Great Wall of China Is the Only Human-Made Object Visible from Space."',
  stop: {
    explanation:
      'This is a well-known claim that sounds like a fact. It is surprising and has been repeated many times. But repeating something does not make it true. I should pause before believing it.',
  },
  check: {
    source: 'NASA and multiple space agencies; astronauts who have travelled to space.',
    whatItSays:
      'NASA has confirmed that the Great Wall is NOT easily visible from low Earth orbit with the naked eye. Many human-made objects (like city lights and roads) are visible, but the Wall is too narrow and follows the colour of the surrounding mountains.',
  },
  think: {
    reasoning:
      'The claim says it is the ONLY human-made object visible — but NASA says many objects are visible, and the Wall itself is hard to see. The evidence does not support the headline. The verdict is FALSE.',
  },
  verdict: 'FALSE',
  verdictNote: 'This is a constructed teaching example. The fact about the Great Wall is a well-documented NASA clarification.',
};

// ── Stage 5: Five-Error Investigation ────────────────────────────────────────
export interface ErrorExample {
  index: number;
  emoji: string;
  topic: string;
  headline: string;
  bodyText: string;
  errorType: string;
  answerKey: {
    error: string;
    explanation: string;
    correction: string;
    source: string;
  };
}

export const errorExamples: ErrorExample[] = [
  {
    index: 1,
    emoji: '🐧',
    topic: 'Animals & Nature',
    headline: 'AI-Generated News: "Penguins Can Fly Long Distances, Scientists Confirm"',
    bodyText:
      'A new report claims that researchers have confirmed penguins can fly long distances across oceans. The article says penguins use their wings to soar above the water for hundreds of kilometres.',
    errorType: 'False factual claim',
    answerKey: {
      error: 'Penguins cannot fly. Their wings have evolved into flippers for swimming, not flying.',
      explanation:
        'Penguins are flightless birds. Their wings are adapted for swimming underwater, not for flying in the air. This is a basic, well-known fact that the AI got wrong.',
      correction:
        'Penguins are flightless birds. They "fly" underwater using their flippers, but they cannot fly in the air.',
      source: 'National Geographic, Britannica, and any zoology reference.',
    },
  },
  {
    index: 2,
    emoji: '🪐',
    topic: 'Space & Discoveries',
    headline: 'AI-Generated News: "Astronomers Discover a Tenth Planet in Our Solar System"',
    bodyText:
      'The article claims astronomers have discovered a brand-new tenth planet orbiting the Sun, larger than Jupiter, and it will be visible to the naked eye next month.',
    errorType: 'Invented discovery',
    answerKey: {
      error: 'No tenth planet has been discovered. The claim of a planet larger than Jupiter visible to the naked eye is invented.',
      explanation:
        'There is no confirmed tenth planet in our solar system. A planet larger than Jupiter that is suddenly visible to the naked eye would be major, verified news — but no space agency has reported this.',
      correction:
        'Our solar system has 8 planets. Pluto is a dwarf planet. No new large planet has been confirmed as of the lesson date.',
      source: 'NASA, the International Astronomical Union (IAU).',
    },
  },
  {
    index: 3,
    emoji: '🗽',
    topic: 'Geography',
    headline: 'AI-Generated News: "The Eiffel Tower Was Built in 1492 and Is Located in Rome, Italy"',
    bodyText:
      'The article describes the Eiffel Tower as a famous landmark built in 1492, located in Rome, Italy, and says it was constructed to celebrate the discovery of the New World.',
    errorType: 'Incorrect date and location',
    answerKey: {
      error: 'The Eiffel Tower was not built in 1492 and is not in Rome. It was built in 1889 for the Paris World\u2019s Fair and is in Paris, France.',
      explanation:
        'The date (1492) and the location (Rome, Italy) are both wrong. 1492 is when Columbus reached the Americas — nothing to do with the Eiffel Tower. The Tower is one of the most famous landmarks in Paris, France.',
      correction:
        'The Eiffel Tower was completed in 1889 for the 1889 Exposition Universelle (World\u2019s Fair) in Paris, France. It was designed by Gustave Eiffel.',
      source: 'Official Eiffel Tower website, Britannica, history references.',
    },
  },
  {
    index: 4,
    emoji: '🐘',
    topic: 'Animals & Nature',
    headline: 'AI-Generated News: "Study Finds That 99% of All Elephants Can Jump Over 2 Metres High"',
    bodyText:
      'The article reports a study claiming that 99% of elephants can jump over 2 metres high, making them the highest-jumping land animal relative to their size.',
    errorType: 'Misleading statistic / comparison',
    answerKey: {
      error: 'Elephants cannot jump at all. The statistic is completely invented.',
      explanation:
        'Elephants are one of the few mammals that cannot jump. Their leg structure and enormous weight make jumping impossible. A "99%" statistic is invented to sound scientific.',
      correction: 'Elephants cannot jump. They are one of the few mammals that cannot jump or gallop.',
      source: 'National Geographic, Smithsonian, zoology references.',
    },
  },
  {
    index: 5,
    emoji: '🌳',
    topic: 'Science & Environment',
    headline: 'AI-Generated News: "Trees Communicate, So We Should Cut Down All Forests to Stop Them"',
    bodyText:
      'A real study found that trees can send chemical signals to each other through their roots. The AI article uses this real fact but concludes that forests are dangerous and should be cut down to stop trees from "plotting against humans."',
    errorType: 'Headline misrepresents what the evidence says',
    answerKey: {
      error: 'The real fact (trees communicate through chemicals) is twisted into a false and silly conclusion (cut down forests to stop them plotting against humans).',
      explanation:
        'The evidence says trees exchange chemical signals — that is a real and fascinating scientific finding. But the conclusion that forests are "dangerous" or "plotting against humans" is completely made up. The headline misrepresents what the study actually says.',
      correction:
        'Trees do communicate through chemical signals and underground fungal networks. This is a sign of how interconnected forests are — not a reason to cut them down.',
      source: 'Research by Dr. Suzanne Simard (University of British Columbia); National Geographic, BBC Earth.',
    },
  },
];

// ── Stage 6: Three fact-check claims ─────────────────────────────────────────
export interface FactCheckClaim {
  index: number;
  emoji: string;
  topic: string;
  claim: string;
  context: string;
  answerKey: {
    correctVerdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
    stop: string;
    check: string;
    think: string;
    explanation: string;
    source: string;
  };
}

export const factCheckClaims: FactCheckClaim[] = [
  {
    index: 1,
    emoji: '🌙',
    topic: 'Space & Science',
    claim: 'AI Claim: "The Moon is moving away from Earth by about 3.8 centimetres every year."',
    context:
      'This claim sounds precise and scientific. It gives an exact number. But is it true?',
    answerKey: {
      correctVerdict: 'TRUE',
      stop: 'This sounds surprising — the Moon is moving away from us? The exact number (3.8 cm) makes it sound researched. I should check before believing it.',
      check: 'NASA, the European Space Agency, and space-science references all confirm this. It is measured using laser reflectors left on the Moon by Apollo astronauts.',
      think: 'Multiple reliable space agencies agree. The method (laser ranging) is well-documented. The evidence supports the claim.',
      explanation:
        'The claim is TRUE. NASA confirms the Moon drifts away from Earth at about 3.8 cm per year, measured by bouncing lasers off reflectors left by the Apollo missions.',
      source: 'NASA (lunar laser ranging experiments), ESA, scientific journals on lunar recession.',
    },
  },
  {
    index: 2,
    emoji: '🐝',
    topic: 'Animals & Nature',
    claim: 'AI Claim: "Honey Never Spoils — Pots of Honey Found in Ancient Egyptian Tombs Are Still Edible After 3,000 Years."',
    context:
      'This is a famous claim about honey. It sounds amazing. Is it true, or is it too good to be true?',
    answerKey: {
      correctVerdict: 'MISLEADING',
      stop: 'This is a popular claim repeated a lot online. It sounds amazing. But "repeated a lot" is not proof. I should check the details carefully.',
      check: 'The real science: honey has very low water content and high acidity, which makes it last a very long time. But honey CAN spoil if water gets in or it is stored badly. The "3,000-year-old edible honey in tombs" story is often repeated but the specific archaeological details are not well-documented.',
      think: 'There is truth (honey lasts a very long time) but the claim overstates it. "Never spoils" is too absolute — honey can spoil under bad conditions. The ancient-tomb detail is not reliably sourced. The claim gives the wrong impression even though part of it is true.',
      explanation:
        'The claim is MISLEADING. It is true that honey lasts a very long time due to its chemistry, but "never spoils" is too absolute, and the specific story about 3,000-year-old tomb honey being "still edible" is not well-documented. The claim contains some truth but gives an exaggerated impression.',
      source: 'Smithsonian Magazine on honey chemistry; food-science references. The tomb story lacks strong archaeological sourcing.',
    },
  },
  {
    index: 3,
    emoji: '🧊',
    topic: 'Geography',
    claim: 'AI Claim: "Antarctica Is the Largest Desert in the World."',
    context:
      'Most people think deserts are hot and sandy. This claim says the coldest place is actually the largest desert. Is that possible?',
    answerKey: {
      correctVerdict: 'TRUE',
      stop: 'This sounds wrong at first — Antarctica is ice, not sand! But something sounding surprising does not mean it is false. I need to check the definition of "desert."',
      check: 'A desert is defined by low precipitation (rain and snow), not by temperature. NASA, National Geographic, and geography references confirm Antarctica receives very little precipitation and is classified as a polar desert.',
      think: 'When I check the real definition of "desert," the evidence supports the claim. Antarctica is technically the largest desert in the world because it is extremely dry. The surprise comes from thinking deserts must be hot.',
      explanation:
        'The claim is TRUE. A desert is defined by low precipitation, not by heat. Antarctica is a polar desert and is the largest desert on Earth — even larger than the Sahara.',
      source: 'NASA, National Geographic, Britannica — all classify Antarctica as the largest desert.',
    },
  },
];

// ── Stage 7: Recap assessment ────────────────────────────────────────────────
export const recapQuestions = {
  suspiciousHeadlineOptions: [
    { id: 'r1', text: 'Local Council Approves New Park After Community Vote (Source: City.gov)', correct: false },
    { id: 'r2', text: 'MIRACLE: Drinking One Glass of Seawater Cures Every Disease Known to Science!', correct: true },
    { id: 'r3', text: 'New Library Opens Downtown Next Month (Source: City.gov)', correct: false },
  ],
  verdictScenario:
    'A headline claims "Scientists Have Proved That Looking at the Moon Improves Your Eyesight." No study, researcher, or source is named. What is the best verdict?',
  verdictOptions: [
    { id: 'v1', text: 'TRUE', correct: false },
    { id: 'v2', text: 'FALSE', correct: false },
    { id: 'v3', text: 'UNVERIFIED', correct: true },
    { id: 'v4', text: 'MISLEADING', correct: false },
  ],
  verdictReasoning:
    'The best verdict is UNVERIFIED. No source is named, so we do not have enough reliable evidence to call it true or false. We need to CHECK first.',
};

// ── Tutor support per stage ──────────────────────────────────────────────────
export interface TutorSupport {
  say: string;
  ask: string;
  lookFor: string;
  ifStruggles: string;
  answerKey?: string;
  followUp?: string;
}

export const tutorSupport: Record<string, TutorSupport> = {
  stage1: {
    say: 'Headlines are designed to grab our attention. An exciting headline makes us curious — but it does not tell us whether the story is true. None of these three headlines are labelled true or false yet; the point is to show that an exciting headline is NOT proof.',
    ask: 'Which headline made you feel most surprised? Did that surprise make you believe it more, or want to check it?',
    lookFor: 'Tiwa recognises that a professional-looking headline is not the same as proof. He wants to know the source before believing.',
    ifStruggles: 'Ask Tiwa to imagine a headline that says "Dogs Can Fly!" — it sounds exciting, but does excitement make it true? What would you need before believing it?',
    followUp: 'Can you think of a real headline you saw recently? Did you believe it right away?',
  },
  stage2: {
    say: 'News is information about events shared with the public. Reliable news comes from sources that check their facts and name where their information comes from. Fake news is false or misleading information presented as if it were real news. AI can generate headlines that look professional but contain false claims.',
    ask: 'Why might someone share a headline without checking it first? What could happen if they do?',
    lookFor: 'Tiwa can explain that looking professional is not the same as being true, and that false information can spread quickly.',
    ifStruggles: 'Use the chocolate headline as a simple example: "Chocolate makes you live forever" — it sounds exciting but there is no evidence. That is misleading.',
    followUp: 'Can you think of a time you heard something that turned out not to be true?',
  },
  stage3: {
    say: 'Warning signs do not automatically prove a story is false. They tell us when to investigate. A sensational word or a missing source is a signal to STOP and CHECK.',
    ask: 'Which warning sign do you think is the most important? Why?',
    lookFor: 'Tiwa names at least 3 warning signs: sensational language, missing sources, unbelievable claims, wrong details, suspicious statistics.',
    ifStruggles: 'Compare two headlines: one with a source and one without. Ask which one is easier to verify.',
    followUp: 'Can you write your own suspicious headline using one of the warning signs?',
  },
  stage4: {
    say: 'STOP, CHECK, THINK is a simple routine. STOP means pause before believing or sharing. CHECK means look for a reliable source. THINK means decide if the evidence actually supports the claim.',
    ask: 'Why do we need all three steps? What happens if we skip CHECK?',
    lookFor: 'Tiwa can describe each step in order and explain what each one means in his own words.',
    ifStruggles: 'Act it out: give Tiwa a silly claim ("I can breathe underwater") and walk through STOP-CHECK-THINK together.',
    followUp: 'When could you use STOP-CHECK-THINK outside this lesson?',
  },
  stage5: {
    say: 'For each AI example, Tiwa needs to find the error, explain WHY it is wrong, and write what the correct information is. This is real detective work.',
    ask: 'What type of error is this — a false fact, an invented discovery, a wrong date or location, a misleading statistic, or a headline that twists the real evidence?',
    lookFor: 'Tiwa writes a clear explanation for each error, not just "it is fake." He identifies the specific thing that is wrong.',
    ifStruggles: 'Start with the Eiffel Tower example — the wrong date and city are easy to spot. Then move to harder ones.',
    answerKey:
      '1) Penguins cannot fly (false fact). 2) No tenth planet discovered (invented). 3) Eiffel Tower built 1889 in Paris, not 1492 in Rome (wrong date+location). 4) Elephants cannot jump (misleading statistic). 5) Trees communicate but the conclusion to cut forests is twisted (misrepresents evidence).',
    followUp: 'Can you think of another false "fact" an AI might generate that sounds convincing?',
  },
  stage6: {
    say: 'Tiwa should complete STOP, CHECK, and THINK for each claim, then write a verdict with a short explanation. Remind him of the verdict options: TRUE, FALSE, MISLEADING, UNVERIFIED.',
    ask: 'What verdict did you choose and what evidence supports it?',
    lookFor: 'Tiwa uses evidence, not just gut feeling. He can explain the difference between FALSE and UNVERIFIED.',
    ifStruggles: 'Use the honey claim as a practice — walk through whether "never spoils" is exactly true or an exaggeration.',
    answerKey:
      'Claim 1 (Moon moving 3.8 cm/yr) = TRUE (NASA). Claim 2 (Honey never spoils) = MISLEADING (lasts long but not "never," tomb story not well-sourced). Claim 3 (Antarctica is the largest desert) = TRUE (desert = low precipitation).',
    followUp: 'What would make the honey claim fully TRUE instead of MISLEADING?',
  },
  stage7: {
    say: 'This is a quick check. Make sure Tiwa can explain misinformation, name STOP-CHECK-THINK, and choose a verdict based on evidence.',
    ask: 'Why does checking information matter before sharing it?',
    lookFor: 'Tiwa completes the reflection sentence in his own words and can recall all three steps.',
    ifStruggles: 'Remind Tiwa of the three steps using the visual guide. Keep it positive.',
    followUp: 'What will you do next time you see a surprising headline online?',
  },
  takehome: {
    say: 'The take-home mission asks Tiwa to find ONE headline from a supervised, age-appropriate source and investigate it using STOP-CHECK-THINK. A parent or guardian can help find the source, but Tiwa writes his own reasoning.',
    ask: 'What headline are you going to investigate? Why did you choose it?',
    lookFor: 'Tiwa completes all six parts of the template and uses his own words for the explanation.',
    ifStruggles: 'Suggest checking a headline from a children\u2019s news site like Time for Kids or a school-approved source.',
    followUp: 'Share your verdict with your family. Do they agree?',
  },
};
