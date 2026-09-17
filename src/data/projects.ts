// Canonical projects — EDIT HERE.
// Featured: WakeWell, Aqua Fly, K.O.R.A, Future. Then competition-linked archive.
// Descriptions use only facts from the linked project sites / CV —
// capabilities are worded as concepts, never as independently verified claims.

export interface ProjectFull {
  slug: string;
  index: string;
  featured?: boolean;
  titleEn: string;
  titleAz: string;
  subtitleEn: string;
  subtitleAz: string;
  contextEn: string;
  contextAz: string;
  roleEn: string;
  roleAz: string;
  tech: string[];
  resultEn: string;
  resultAz: string;
  bodyEn: string;
  bodyAz: string;
  externalUrl?: string;
  externalLabel?: string;
  sections?: { hEn: string; hAz: string; pEn: string; pAz: string }[];
}

export const FEATURED_PROJECTS: ProjectFull[] = [
  {
    slug: "wakewell",
    index: "01",
    featured: true,
    titleEn: "WakeWell — sleep-analysis wearable",
    titleAz: "WakeWell — yuxu analizli geyiləbilən qurğu",
    subtitleEn: "DIY smart-watch-style sleep concept · Bio-Synch · 2026",
    subtitleAz: "DIY ağıllı-saat tipli yuxu konsepti · Bio-Synch · 2026",
    contextEn: "Student innovation project · team build",
    contextAz: "Tələbə innovasiya layihəsi · komanda işi",
    roleEn: "Co-author — embedded concept, hardware, build notes",
    roleAz: "Həmmüəllif — quraşdırılan konsept, aparat təminatı, qeydlər",
    tech: ["ESP32-C3 SuperMini", "PPG heart-rate", "MPU6050 / GY-521", "Accelerometer", "Gyroscope", "Buzzer wake"],
    resultEn: "Working concept presented on the public project site — wrist unit, sensing, analysis, gentle wake.",
    resultAz: "Açıq layihə saytında təqdim olunan işlək konsept — bilək qurğusu, hissiyyat, analiz, yumşaq oyanış.",
    bodyEn:
      "WakeWell asks “how did I sleep?” instead of “how long did I sleep?”. A wrist unit listens overnight — PPG pulse signal plus 6-axis motion — and the ESP32-C3 pipeline turns it into sleep-phase likelihoods (REM, light, deep) with HRV-related data, waking in the lightest window via buzzer.",
    bodyAz:
      "WakeWell “nə qədər yatdım?” əvəzinə “necə yatdım?” sualına cavab verir. Bilək qurğusu gecə boyu dinləyir — PPG nəbz siqnalı və 6 oxlu hərəkət — ESP32-C3 boru xətti onu yuxu fazası ehtimallarına (REM, yüngül, dərin) və HRV-yə bağlı dataya çevirir, buzzer ilə ən yüngül pəncərədə oyadır.",
    externalUrl: "https://wake-well.github.io/",
    externalLabel: "Open WakeWell project site",
    sections: [
      {
        hEn: "Problem",
        hAz: "Problem",
        pEn: "Alarm clocks cut through deep sleep. WakeWell explores waking from the lightest phase instead — based on overnight biometrics, not a fixed time alone.",
        pAz: "Zəngli saat dərin yuxunu kəsir. WakeWell yalnız sabit vaxta deyil, gecə biometrikasına əsaslanıb ən yüngül fazada oyanışı araşdırır.",
      },
      {
        hEn: "Concept",
        hAz: "Konsept",
        pEn: "Wear → sense → analyse → wake. The Bio-Synch idea treats sleep as harmony of stages, read from pulse rhythm and micro-movement.",
        pAz: "Tax → hiss et → analiz et → oyat. Bio-Synch ideyası yuxunu mərhələlərin harmoniyası kimi — nəbz ritmi və mikro-hərəkətdən oxuyur.",
      },
      {
        hEn: "Hardware",
        hAz: "Aparat təminatı",
        pEn: "PPG heart-rate sensing, MPU6050/GY-521 accelerometer + gyroscope, ESP32-C3 SuperMini as the hub, buzzer for gentle wake. Low power, small footprint for the wrist.",
        pAz: "PPG ürək ritmi sensoru, MPU6050/GY-521 akselerometr + giroskop, mərkəz kimi ESP32-C3 SuperMini, yumşaq oyanış üçün buzzer. Bilək üçün aşağı enerji, kiçik ölçü.",
      },
      {
        hEn: "Engineering logic",
        hAz: "Mühəndis məntiqi",
        pEn: "Still vs. active intervals separate falling-asleep and light-sleep moments; overnight pulse profile weights REM/deep likelihoods. Outcome is a probability split per stage plus wake-window estimates — a concept, documented on the project site.",
        pAz: "Sakit və aktiv intervallar yuxuya dalma və yüngül yuxu anlarını ayırır; gecə nəbz profili REM/dərin ehtimallarını çəkiləndirir. Nəticə mərhələ üzrə ehtimal payı və oyanış pəncərələridir — konsept, layihə saytında sənədlidir.",
      },
    ],
  },
  {
    slug: "aqua-fly",
    index: "02",
    featured: true,
    titleEn: "Aqua Fly — smart rescue drone",
    titleAz: "Aqua Fly — ağıllı xilasetmə dronu",
    subtitleEn: "Water-safety concept · hexagonal airframe · solar-assisted",
    subtitleAz: "Su təhlükəsizliyi konsepti · altıbucaqlı gövdə · günəş dəstəkli",
    contextEn: "Concept project · design + engineering development",
    contextAz: "Konsept layihə · dizayn + mühəndis inkişafı",
    roleEn: "Team member — concept, CAD, development",
    roleAz: "Komanda üzvü — konsept, CAD, inkişaf",
    tech: ["Hexagonal airframe", "CAD", "Flight dynamics", "Detection / tracking concept", "Solar-assisted"],
    resultEn: "Public concept site with mission, design, development and team sections — rapid surveillance and rescue-buoy response over water.",
    resultAz: "Missiya, dizayn, inkişaf və komanda bölmələri ilə açıq konsept saytı — su üzərində sürətli müşahidə və xilasetmə-üzgəc reaksiyası.",
    bodyEn:
      "Aqua Fly is a smart rescue-drone concept for water environments: solar-assisted, tracking people on the beach, signalling rescuers on drowning threat, flying to the scene and releasing a rescue buoy. Custom hexagonal airframe engineered for stability over water; CAD and simulation iterate flight dynamics and sensor behaviour.",
    bodyAz:
      "Aqua Fly su mühiti üçün ağıllı xilasetmə-dron konseptidir: günəş dəstəkli, çimərlikdə insanları izləyir, boğulma təhlükəsində xilas edənlərə siqnal verir, hadisə yerinə uçub xilasetmə üzgəci buraxır. Su üzərində sabitlik üçün xüsusi altıbucaqlı gövdə; CAD və simulyasiya uçuş dinamikasını təkmilləşdirir.",
    externalUrl: "https://aquafly-29.github.io/aqua-fly/",
    externalLabel: "Open Aqua Fly project site",
    sections: [
      {
        hEn: "Mission",
        hAz: "Missiya",
        pEn: "Drowning kills ~236,000 people yearly (project site figure). Aqua Fly answers with fast eyes over water: detect, signal, reach, drop buoyancy.",
        pAz: "Boğulma ildə ~236.000 can alır (layihə saytı rəqəmi). Aqua Fly su üzərində sürətli gözlə cavab verir: aşkar et, siqnal ver, çat, üzmə vasitəsi burax.",
      },
      {
        hEn: "Design",
        hAz: "Dizayn",
        pEn: "Custom hexagonal airframe for stability; lightweight yet durable for rapid deployment and precise manoeuvre during rescue ops — as shown on the project site.",
        pAz: "Sabitlik üçün xüsusi altıbucaqlı gövdə; xilasetmə əməliyyatlarında sürətli tətbiq və dəqiq manevr üçün yüngül, lakin davamlı — layihə saytında göstərildiyi kimi.",
      },
      {
        hEn: "Development",
        hAz: "İnkişaf",
        pEn: "Advanced CAD and simulation tools refine flight dynamics, sensor accuracy and autonomous rescue behaviour for beach environments.",
        pAz: "Qabaqcıl CAD və simulyasiya alətləri çimərlik mühiti üçün uçuş dinamikasını, sensor dəqiqliyini və avtonom xilasetmə davranışını təkmilləşdirir.",
      },
    ],
  },
  {
    slug: "kora",
    index: "03",
    featured: true,
    titleEn: "K.O.R.A — applied AI project",
    titleAz: "K.O.R.A — tətbiqi Sİ layihəsi",
    subtitleEn: "Personal assistant / software engineering · Python",
    subtitleAz: "Şəxsi köməkçi / proqram mühəndisliyi · Python",
    contextEn: "Independent software work · repository-linked",
    contextAz: "Müstəqil proqram işi · repozitoriya ilə bağlı",
    roleEn: "Author — design, code, iteration",
    roleAz: "Müəllif — dizayn, kod, təkmilləşmə",
    tech: ["Python", "Applied AI", "GitHub"],
    resultEn: "Public repository with code and notes — capabilities stated only as documented there.",
    resultAz: "Kod və qeydlərlə açıq repozitoriya — imkanlar yalnız orada sənədləşdirildiyi kimi göstərilir.",
    bodyEn:
      "K.O.R.A is Eldar's applied-AI / personal-assistant software project. The portfolio entry links the live repository rather than restating unverified capability claims — read the code and commit history as the source of truth.",
    bodyAz:
      "K.O.R.A Eldarın tətbiqi-Sİ / şəxsi köməkçi proqram layihəsidir. Portfel qeydi yoxlanılmamış imkan iddialarını təkrarlamaq əvəzinə canlı repozitoriyaya keçid verir — həqiqət mənbəyi kimi kodu və tarixçəni oxuyun.",
    externalUrl: "https://github.com/Eldar-005/eldar_hasc2025",
    externalLabel: "Open GitHub repository",
    sections: [
      {
        hEn: "Purpose",
        hAz: "Məqsəd",
        pEn: "A hands-on way to practise software engineering: assistant-style tasks, iteration, and readable code.",
        pAz: "Proqram mühəndisliyini məşq etmək üçün praktik yol: köməkçi tipli tapşırıqlar, iterasiya və oxunaqlı kod.",
      },
      {
        hEn: "Technology",
        hAz: "Texnologiya",
        pEn: "Python-centred, shared via GitHub. Exact modules and behaviour follow the repository.",
        pAz: "Python mərkəzli, GitHub-da paylaşılır. Dəqiq modullar və davranış repozitoriyaya uyğundur.",
      },
    ],
  },
  {
    slug: "future-lab",
    index: "04",
    featured: true,
    titleEn: "Future engineering builds",
    titleAz: "Gələcək mühəndis işləri",
    subtitleEn: "Open bench — documented as it happens",
    subtitleAz: "Açıq dəzgah — olduqca sənədləşir",
    contextEn: "Ongoing practice · CAD / embedded / AI",
    contextAz: "Davamlı təcrübə · CAD / quraşdırılan / Sİ",
    roleEn: "Author",
    roleAz: "Müəllif",
    tech: ["Fusion 360", "ESP32", "Python"],
    resultEn: "New builds appear here with photos, CAD and notes — only when real.",
    resultAz: "Yeni işlər burada foto, CAD və qeydlərlə görünür — yalnız real olduqda.",
    bodyEn: "A standing slot for the next prototype. Nothing is announced upfront; entries are added with evidence.",
    bodyAz: "Növbəti prototip üçün daimi yer. Heç nə əvvəlcədən elan olunmur; qeydlər sübutla əlavə olunur.",
  },
];
