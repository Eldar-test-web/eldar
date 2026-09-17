import type { Lang } from "./i18n";

export interface Dict {
  nav: { home: string; about: string; projects: string; competitions: string; skills: string; media: string; contact: string; achievements: string; lab: string };
  brandSub: string;
  skip: string;
  menu: string;
  close: string;
  themeDark: string;
  themeLight: string;
  home: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    fields: string;
    lede: string;
    note: string;
    locationLabel: string;
    location: string;
    focusLabel: string;
    focus: string;
    educationLabel: string;
    education: string;
    statusLabel: string;
    status: string;
    viewProjects: string;
    viewAchievements: string;
    aboutEldar: string;
    selectedEyebrow: string;
    selectedTitle: string;
    selectedText: string;
    archiveEyebrow: string;
    principlesTitle: string;
    principles: { t: string; d: string }[];
    indexTitle: string;
    indexText: string;
    statsEyebrow: string;
    statsTitle: string;
    statsText: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredText: string;
    labEyebrow: string;
    labTitle: string;
    labText: string;
    labCta: string;
    contactEyebrow: string;
    contactTitle: string;
    contactText: string;
    contactCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lede: string;
    stages: { k: string; t: string; d: string }[];
    eduEyebrow: string;
    eduTitle: string;
    eduText: string;
    schools: { name: string; years: string; note: string }[];
    distinction: string;
    practiceTitle: string;
    practiceText: string;
    practiceItems: { t: string; d: string }[];
    volunteeringTitle: string;
    volunteeringText: string;
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    lede: string;
    countLabel: string;
    ruleLabel: string;
    overview: string;
    context: string;
    role: string;
    tech: string;
    result: string;
    docsPending: string;
    openCase: string;
    back: string;
    detailContext: string;
    externalLink: string;
    featuredLabel: string;
    archiveLabel: string;
  };
  competitionsPage: {
    eyebrow: string;
    title: string;
    lede: string;
    filters: { key: string; label: string }[];
    yearLabel: string;
    resultLabel: string;
    countSuffix: string;
    certificatesTitle: string;
    certificatesText: string;
    certificates: string[];
    methodTitle: string;
    methodText: string;
    yearAll: string;
    sortLabel: string;
    sortNewest: string;
    sortOldest: string;
    previewLabel: string;
    openPost: string;
    linkPending: string;
    certPending: string;
    hoverHint: string;
    tapHint: string;
    showCert: string;
    hideCert: string;
  };
  labPage: {
    eyebrow: string;
    title: string;
    lede: string;
    hint: string;
    resetView: string;
    fullscreen: string;
    wireframe: string;
    transparent: string;
    loading: string;
    specsTitle: string;
    back: string;
    openViewer: string;
    disclaimerLabel: string;
  };
  skillsPage: {
    eyebrow: string;
    title: string;
    lede: string;
    noLevels: string;
    groups: { t: string; d: string; items: { name: string; desc: string }[] }[];
    areasTitle: string;
    areas: { t: string; d: string; proof: string }[];
  };
  mediaPage: {
    eyebrow: string;
    title: string;
    lede: string;
    channels: { name: string; handle: string; desc: string; url: string; meta: string }[];
    noteTitle: string;
    noteText: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    lede: string;
    emailLabel: string;
    socialLabel: string;
    formTitle: string;
    formText: string;
    name: string;
    email: string;
    message: string;
    send: string;
    viaEmail: string;
    privacy: string;
    success: string;
    whatsappTitle: string;
    whatsappText: string;
    whatsappCta: string;
    projectsTitle: string;
    projectsText: string;
  };
  footer: {
    tagline: string;
    pages: string;
    presence: string;
    settings: string;
    rights: string;
    archiveNote: string;
  };
  common: {
    viewAll: string;
    documented: string;
    alphabetNote: string;
  };
}

export const dict: Record<Lang, Dict> = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", competitions: "Achievements", skills: "Skills", media: "Media", contact: "Contact", achievements: "Achievements", lab: "3D Design Lab" },
    brandSub: "Robotics · AI · Engineering",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    themeDark: "Dark",
    themeLight: "Light",
    home: {
      eyebrow: "Personal archive — Sumgait, Azerbaijan",
      titleA: "Eldar Həmidov",
      titleB: "Robotics · AI · Engineering · Cybersecurity",
      fields: "Robotics — Artificial Intelligence — Programming — Cybersecurity",
      lede:
        "A young engineering enthusiast working across robotics, programming, artificial intelligence and cybersecurity. Competition experience from 2020 to 2026, documented without exaggeration.",
      note:
        "This site is a working archive: who I am, what I have competed in, what I can build with, and where the work can be found. If documentation is missing, it says so.",
      locationLabel: "Location",
      location: "Azerbaijan",
      focusLabel: "Focus",
      focus: "Robotics · AI · Engineering · Cybersecurity",
      educationLabel: "Education",
      education: "Secondary education, Sumgait — distinction certificate",
      statusLabel: "Open to",
      status: "Academic · competition · collaboration inquiries",
      viewProjects: "View Projects",
      viewAchievements: "View Achievements",
      aboutEldar: "About Eldar",
      selectedEyebrow: "01 — Selected record",
      selectedTitle: "A short, verifiable trail.",
      selectedText:
        "Four entries that summarise the direction. The full archive lives on the Competitions page — every result stated exactly as documented.",
      archiveEyebrow: "02 — Method",
      principlesTitle: "How the work is done.",
      principles: [
        { t: "Evidence first", d: "Results are listed as finalist, place, or honor roll — never upgraded. Participation is participation." },
        { t: "Small, testable steps", d: "Competition preparation, lab practice, and CAD work in short loops. One variable at a time." },
        { t: "Documented quietly", d: "Certificates, placements and code links are kept in one place. Missing material is marked as pending." },
      ],
      indexTitle: "Chapters of this archive.",
      indexText: "Each page answers one question. Start anywhere — the order below follows the story.",
      statsEyebrow: "01 — Record at a glance",
      statsTitle: "28 documented milestones, 2020–2026.",
      statsText: "Counted directly from the archive below — competitions, olympiads, certificates and project entries. Nothing rounded up.",
      featuredEyebrow: "02 — Selected projects",
      featuredTitle: "Three builds, three disciplines.",
      featuredText: "A sleep-analysis wearable, a water-rescue drone concept, and applied AI — each with its own case study and external link.",
      labEyebrow: "03 — 3D Design Lab",
      labTitle: "Rotate the work with your own hand.",
      labText: "A competition-inspired hull, a 1903 radial engine study, and the Aqua Fly airframe — interactive, studio-lit, touch-ready.",
      labCta: "Enter the lab",
      contactEyebrow: "04 — Contact",
      contactTitle: "Let's connect.",
      contactText: "Academic, competition and collaboration inquiries — WhatsApp or email, plainly stated.",
      contactCta: "Message on WhatsApp",
    },
    about: {
      eyebrow: "About — biography",
      title: "From first interest to current direction.",
      lede:
        "A factual biography in six stages — robotics competitions, programming, engineering tools, scientific contests, AI and cybersecurity — built only from documented material.",
      stages: [
        { k: "Early interest", t: "Taking things apart to see why they move.", d: "General technical curiosity developed through school years in Sumgait, leading toward structured robotics activity by 2020." },
        { k: "Robotics", t: "Competition robotics, 2020 onwards.", d: "RoboCross Online Challenge (World 2nd, 2020), WRO Robot Virtual Games finalist (2020), WRO Canada 2020-X 5th place, Egypt international olympiad with SUMracers (5th, 2021), WRO Azerbaijan finalist (2024), AIRO 2nd place (2026)." },
        { k: "Programming", t: "Scratch to Python and C++.", d: "National Selection Finalist at the V International Scratch Creative Programming Olympiad (2021); Bebras semifinal and Bebras USA Honor Roll (2024–2025). Current working languages: Python and C++." },
        { k: "Engineering", t: "Tools and making.", d: "Practice with Fusion 360, SolidWorks and FreeCAD for design and prototyping, alongside standard software fluency (MS Windows, MS Excel). SAF-2023 rescue-bag entry won the Innovative Exhibition category." },
        { k: "AI / Cybersecurity", t: "Narrow, applied study.", d: "International Schools AI Olympiad Honor Roll (2025) and National Junior Cybersecurity Olympiad 2nd place (2025). Lab-only practice; no live-system testing." },
        { k: "Current direction", t: "Secondary education with distinction, preparing forward.", d: "Focused on university preparation, engineering competitions, and documented project work shared via GitHub and build notes." },
      ],
      eduEyebrow: "Education",
      eduTitle: "Schooling, stated plainly.",
      eduText: "Only public, professional information is listed. No private personal data is published on this site.",
      schools: [
        { name: "Sumgait City Istedad Lyceum", years: "2016–2023", note: "General secondary education." },
        { name: "Secondary School No. 29 named after T. Ismayilov, Sumgait", years: "2023–present", note: "Complete secondary education, ongoing." },
      ],
      distinction: "Fərqlənmə attestatı — Certificate of Distinction",
      practiceTitle: "What the practice looks like.",
      practiceText: "Competition preparation and tool practice, not employment. No job titles, internships or publications are claimed.",
      practiceItems: [
        { t: "Robotics preparation", d: "Virtual and physical formats; team and individual entries." },
        { t: "Programming study", d: "Python and C++ through olympiads and small applied tasks." },
        { t: "CAD and prototyping", d: "Fusion 360, SolidWorks, FreeCAD for design exercises and competition builds." },
        { t: "Science contests", d: "Physics (Sabahın Alimləri XIV finalist), mathematics (Neo 3rd), innovation exhibitions." },
      ],
      volunteeringTitle: "Volunteering",
      volunteeringText:
        "Volunteering certificates are documented in the CV. Details are shared on request rather than published in full here.",
    },
    projectsPage: {
      eyebrow: "Projects — documented work",
      title: "What has been built and entered.",
      lede:
        "Competition-linked builds and sustained practice. Nothing is invented: where full specifications or photographs are unavailable, the entry says so.",
      countLabel: "Entries",
      ruleLabel: "Rule: no invented specs — gaps are labelled",
      overview: "Overview",
      context: "Context",
      role: "Role",
      tech: "Technologies",
      result: "Result",
      docsPending: "Project documentation will be added.",
      openCase: "Open case study",
      back: "Back to projects",
      detailContext: "Case study",
      externalLink: "Open external project",
      featuredLabel: "Featured builds",
      archiveLabel: "Competition-linked archive",
    },
    competitionsPage: {
      eyebrow: "Achievements — archive",
      title: "Every result, exactly as documented.",
      lede:
        "Chronological archive, 2020–2026. Finalist means finalist; winner means winner. Filter by field — the count updates instantly.",
      filters: [
        { key: "ALL", label: "All" },
        { key: "ROBOTICS", label: "Robotics" },
        { key: "AI", label: "AI" },
        { key: "CYBERSECURITY", label: "Cybersecurity" },
        { key: "PROGRAMMING", label: "Programming" },
        { key: "SCIENCE", label: "Science" },
        { key: "OTHER", label: "Other" },
      ],
      yearLabel: "Year",
      resultLabel: "Result",
      countSuffix: "entries",
      yearAll: "All years",
      sortLabel: "Sort",
      sortNewest: "Newest first",
      sortOldest: "Oldest first",
      previewLabel: "Certificate",
      openPost: "Open result post",
      linkPending: "Instagram link pending — paste the post URL in src/data/achievements.ts",
      certPending: "Certificate pending — add /public",
      hoverHint: "Hover a card to preview its certificate · Click to open the Instagram result post",
      tapHint: "Tap the certificate icon to preview · Tap the card to open the Instagram post",
      showCert: "Show certificate",
      hideCert: "Hide certificate",
      certificatesTitle: "Certificates on file.",
      certificatesText: "In addition to placements above, the following are documented by certificate:",
      certificates: [
        "Bebras 2024–2025 — semifinal",
        "Bebras Challenge USA 2024–2025 — Honor Roll",
        "Sabahın Alimləri XIV — participant / finalist certificate (Physics)",
        "Volunteering certificates (details on request)",
      ],
      methodTitle: "Reading this archive.",
      methodText:
        "Results are transcribed from the CV without added dates, ranks or descriptions. Items without a public year are marked with “—” rather than assigned one.",
    },
    labPage: {
      eyebrow: "3D Design Lab — engineering showroom",
      title: "Touch the engineering.",
      lede:
        "Three interactive studies built from real CAD geometry — Eldar's BOAT V4 hull assembly, a FreeCAD-reconstructed 1903 radial engine, and the Aqua Fly drone assembly. Drag to rotate, scroll to zoom.",
      hint: "Drag to rotate · Scroll to zoom · Right-drag to pan",
      resetView: "Reset view",
      fullscreen: "Full screen",
      wireframe: "Wireframe",
      transparent: "Transparent",
      loading: "LOADING MODEL...",
      specsTitle: "Technical notes",
      back: "Back to lab",
      openViewer: "Open viewer",
      disclaimerLabel: "Note",
    },
    skillsPage: {
      eyebrow: "Skills — engineering profile",
      title: "What the work is done with.",
      lede:
        "Categories, descriptions and real examples — no invented percentages, no level bars. A skill is listed only where competition or practice supports it.",
      noLevels: "No percentages are shown. Proficiency is demonstrated by entries in the archive, not by numbers.",
      groups: [
        {
          t: "Programming",
          d: "Working languages used in olympiads and applied tasks.",
          items: [
            { name: "Python", desc: "Olympiad preparation, Bebras-style problem solving, small applied scripts." },
            { name: "C++", desc: "Competition programming foundations and structured study." },
          ],
        },
        {
          t: "Engineering software",
          d: "Design and productivity tools used in practice and competition builds.",
          items: [
            { name: "Fusion 360", desc: "Parametric design exercises and prototype parts." },
            { name: "SolidWorks", desc: "Mechanical design practice and assembly thinking." },
            { name: "FreeCAD", desc: "Open-source CAD workflow for design fundamentals." },
            { name: "MS Excel", desc: "Tables, tracking and structured documentation." },
            { name: "MS Windows", desc: "Everyday engineering environment." },
          ],
        },
      ],
      areasTitle: "Practice areas.",
      areas: [
        { t: "Robotics", d: "Competition robotics across virtual and physical formats, team and individual.", proof: "RoboCross World 2nd · WRO finals · AIRO 2nd" },
        { t: "Artificial Intelligence", d: "Applied, narrow study through school-level olympiad preparation.", proof: "ISAO 2025 Honor Roll" },
        { t: "Programming", d: "From Scratch foundations to Python/C++ problem solving.", proof: "Scratch national finalist · Bebras honors" },
        { t: "Cybersecurity", d: "Fundamentals through structured study and controlled lab exercises only.", proof: "NJCO 2025 — 2nd place" },
      ],
    },
    mediaPage: {
      eyebrow: "Media — presence",
      title: "Where the work can be found.",
      lede: "Three documented channels. Descriptions state only what is confirmed — no follower counts, no invented series.",
      channels: [
        {
          name: "YouTube",
          handle: "EldarBuildLab",
          desc: "Engineering, projects and build-oriented video notes.",
          url: "https://www.youtube.com/@EldarBuildLab",
          meta: "youtube.com/@EldarBuildLab",
        },
        {
          name: "Instagram",
          handle: "@eldar_hamidov09",
          desc: "Personal and project updates.",
          url: "https://www.instagram.com/eldar_hamidov09/",
          meta: "instagram.com/eldar_hamidov09",
        },
        {
          name: "GitHub",
          handle: "Eldar-005 / eldar_hasc2025",
          desc: "Technical work and code, shared where appropriate.",
          url: "https://github.com/Eldar-005/eldar_hasc2025",
          meta: "github.com/Eldar-005/eldar_hasc2025",
        },
      ],
      noteTitle: "A note on content.",
      noteText: "Only confirmed links are listed. If a channel has no public entry for a topic, none is claimed.",
    },
    contactPage: {
      eyebrow: "Contact — professional inquiries",
      title: "For academic, engineering and collaboration inquiries.",
      lede: "Write plainly: who you are, what the opportunity is, and what you are asking for. Private phone numbers are not published.",
      emailLabel: "Email",
      socialLabel: "Elsewhere",
      formTitle: "Message form.",
      formText: "This form opens your email client with the message pre-addressed — nothing is stored on this site.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Prepare email",
      viaEmail: "Or write directly:",
      privacy: "No trackers. No mailing list. Your details stay in your outbox.",
      success: "Your email client should now open. If not, copy the address directly.",
      whatsappTitle: "WhatsApp",
      whatsappText: "Fastest for competition and collaboration questions. Plain hello + who you are is enough.",
      whatsappCta: "Message me on WhatsApp",
      projectsTitle: "Project sites",
      projectsText: "Two public builds with their own websites — open them alongside this portfolio.",
    },
    footer: {
      tagline: "Robotics · AI · Engineering · Cybersecurity",
      pages: "Chapters",
      presence: "Presence",
      settings: "Settings",
      rights: "Eldar Həmidov. Factual archive — no invented results.",
      archiveNote: "Photography and documents are added only when they show the real work.",
    },
    common: {
      viewAll: "View full archive",
      documented: "Documented",
      alphabetNote: "AZ / EN — the language switch preserves the current page.",
    },
  },
  az: {
    nav: { home: "Əsas", about: "Haqqında", projects: "Layihələr", competitions: "Nailiyyətlər", skills: "Bacarıqlar", media: "Media", contact: "Əlaqə", achievements: "Nailiyyətlər", lab: "3D Dizayn Laboratoriyası" },
    brandSub: "Robototexnika · AI · Mühəndislik",
    skip: "Məzmuna keç",
    menu: "Menyu",
    close: "Bağla",
    themeDark: "Qaranlıq",
    themeLight: "Açıq",
    home: {
      eyebrow: "Şəxsi arxiv — Sumqayıt, Azərbaycan",
      titleA: "Eldar Həmidov",
      titleB: "Robototexnika · AI · Mühəndislik · Kibertəhlükəsizlik",
      fields: "Robototexnika — Süni intellekt — Proqramlaşdırma — Kibertəhlükəsizlik",
      lede:
        "Robototexnika, proqramlaşdırma, süni intellekt və kibertəhlükəsizlik üzrə çalışan gənc mühəndislik həvəskarı. 2020–2026-cı illər üzrə sənədli müsabiqə təcrübəsi, şişirtməsiz.",
      note:
        "Bu sayt işlək arxivdir: kim olduğum, hansı müsabiqələrdə iştirak etdiyim, hansı alətlərlə işlədiyim və işlərin harada tapıldığı. Sənəd çatışmırsa, bu açıq qeyd olunur.",
      locationLabel: "Məkan",
      location: "Azərbaycan",
      focusLabel: "İstiqamət",
      focus: "Robototexnika · AI · Mühəndislik · Kibertəhlükəsizlik",
      educationLabel: "Təhsil",
      education: "Sumqayıt üzrə orta təhsil — fərqlənmə attestatı",
      statusLabel: "Açıqdır",
      status: "Akademik · müsabiqə · əməkdaşlıq müraciətləri",
      viewProjects: "Layihələrə bax",
      viewAchievements: "Nailiyyətlərə bax",
      aboutEldar: "Eldar haqqında",
      selectedEyebrow: "01 — Seçilmiş qeydlər",
      selectedTitle: "Qısa, yoxlanıla bilən yol.",
      selectedText:
        "İstiqaməti göstərən dörd qeyd. Tam arxiv Müsabiqələr səhifəsindədir — hər nəticə sənəddə olduğu kimi yazılır.",
      archiveEyebrow: "02 — Metod",
      principlesTitle: "İş necə görülür.",
      principles: [
        { t: "Əvvəlcə fakt", d: "Nəticələr finalçı, yer və ya şərəf siyahısı kimi yazılır — artırılmır. İştirak iştirakdır." },
        { t: "Kiçik, yoxlanıla bilən addımlar", d: "Müsabiqə hazırlığı, laboratoriya məşqi və CAD işi qısa dövrlərlə. Hər dəfə bir dəyişən." },
        { t: "Sakit sənədləşmə", d: "Sertifikatlar, yerlər və kod keçidləri bir yerdə saxlanılır. Çatışmayan material gözləyən kimi qeyd olunur." },
      ],
      indexTitle: "Bu arxivin fəsilləri.",
      indexText: "Hər səhifə bir suala cavab verir. İstənilən yerdən başlayın — ardıcıllıq hekayəni izləyir.",
      statsEyebrow: "01 — Qısa baxış",
      statsTitle: "28 sənədli mərhələ, 2020–2026.",
      statsText: "Birbaşa aşağıdakı arxivdən sayılır — müsabiqələr, olimpiadalar, sertifikatlar və layihə qeydləri. Heç nə şişirdilmir.",
      featuredEyebrow: "02 — Seçilmiş layihələr",
      featuredTitle: "Üç iş, üç istiqamət.",
      featuredText: "Yuxu analizli geyiləbilən qurğu, su-xilasetmə dron konsepti və tətbiqi AI — hər biri ayrıca keys və xarici keçidlə.",
      labEyebrow: "03 — 3D Dizayn Laboratoriyası",
      labTitle: "İşi öz əlinizlə döndərin.",
      labText: "Müsabiqədən ilhamlanan gövdə, 1903-cü il radial mühərrik tədqiqatı və Aqua Fly gövdəsi — interaktiv, studiya işıqlı.",
      labCta: "Laboratoriyaya daxil olun",
      contactEyebrow: "04 — Əlaqə",
      contactTitle: "Gəlin əlaqə saxlayaq.",
      contactText: "Akademik, müsabiqə və əməkdaşlıq müraciətləri — WhatsApp və ya e-poçt, sadə şəkildə.",
      contactCta: "WhatsApp-da yazın",
    },
    about: {
      eyebrow: "Haqqında — tərcümeyi-hal",
      title: "İlk maraqdan indiki istiqamətə.",
      lede:
        "Altı mərhələdən ibarət faktiki tərcümeyi-hal — robototexnika yarışları, proqramlaşdırma, mühəndis alətləri, elmi müsabiqələr, AI və kibertəhlükəsizlik — yalnız sənədli material əsasında.",
      stages: [
        { k: "Erkən maraq", t: "Niyə hərəkət etdiyini görmək üçün sökmək.", d: "Sumqayıtda məktəb illərində formalaşan ümumi texniki maraq, 2020-ci ilə doğru sistemli robototexnika fəaliyyətinə keçid." },
        { k: "Robototexnika", t: "Müsabiqə robototexnikası, 2020-dən.", d: "RoboCross Onlayn Çağırışı (Dünya 2-cisi, 2020), WRO Robot Virtual Oyunları finalçısı (2020), WRO Kanada 2020-X 5-ci yer, SUMracers ilə Misir beynəlxalq olimpiadası (5-ci, 2021), WRO Azərbaycan finalçısı (2024), AIRO 2-ci yer (2026)." },
        { k: "Proqramlaşdırma", t: "Scratch-dən Python və C++-a.", d: "V Beynəlxalq Scratch Yaradıcı Proqramlaşdırma Olimpiadasında Milli Seçim Finalçısı (2021); Bebras yarımfinal və Bebras ABŞ Şərəf siyahısı (2024–2025). Hazırkı iş dilləri: Python və C++." },
        { k: "Mühəndislik", t: "Alətlər və hazırlıq.", d: "Dizayn və prototipləmə üçün Fusion 360, SolidWorks və FreeCAD təcrübəsi, standart proqram bilikləri ilə (MS Windows, MS Excel). SAF-2023 xilasedici çanta işi İnnovativ Sərgi kateqoriyasında qalib olub." },
        { k: "AI / Kibertəhlükəsizlik", t: "Dar, tətbiqi tədris.", d: "Beynəlxalq Məktəblər AI Olimpiadası Şərəf siyahısı (2025) və Milli Yeniyetmə Kibertəhlükəsizlik Olimpiadası 2-ci yer (2025). Yalnız laboratoriya təcrübəsi; canlı sistem sınağı yoxdur." },
        { k: "İndiki istiqamət", t: "Fərqlənmə ilə orta təhsil, irəliyə hazırlıq.", d: "Diqqət universitet hazırlığı, mühəndislik müsabiqələri və GitHub və qeydlər vasitəsilə paylaşılan sənədli layihə işinə yönəlib." },
      ],
      eduEyebrow: "Təhsil",
      eduTitle: "Məktəb yolu, sadə şəkildə.",
      eduText: "Yalnız açıq, peşəkar məlumat göstərilir. Bu saytda şəxsi məlumat dərc olunmur.",
      schools: [
        { name: "Sumqayıt şəhər İstedad liseyi", years: "2016–2023", note: "Ümumi orta təhsil." },
        { name: "Sumqayıt şəhər T. İsmayılov adına 29 nömrəli tam orta ümumtəhsil məktəbi", years: "2023–hazırda", note: "Tam orta təhsil, davam edir." },
      ],
      distinction: "Fərqlənmə attestatı",
      practiceTitle: "Təcrübə necə görünür.",
      practiceText: "Müsabiqə hazırlığı və alət təcrübəsi — iş yeri deyil. Vəzifə, təcrübə proqramı və ya nəşr iddia olunmur.",
      practiceItems: [
        { t: "Robototexnika hazırlığı", d: "Virtual və fiziki formatlar; komanda və fərdi işlər." },
        { t: "Proqramlaşdırma tədrisi", d: "Olimpiadalar və kiçik tətbiqi tapşırıqlar vasitəsilə Python və C++." },
        { t: "CAD və prototipləmə", d: "Dizayn məşqləri və müsabiqə işləri üçün Fusion 360, SolidWorks, FreeCAD." },
        { t: "Elm müsabiqələri", d: "Fizika (Sabahın Alimləri XIV finalçısı), riyaziyyat (Neo 3-cü), innovasiya sərgiləri." },
      ],
      volunteeringTitle: "Könüllülük",
      volunteeringText: "Könüllülük sertifikatları CV-də sənədlidir. Təfərrüatlar burada tam dərc olunmur, sorğu ilə paylaşılır.",
    },
    projectsPage: {
      eyebrow: "Layihələr — sənədli iş",
      title: "Nə hazırlanıb və təqdim olunub.",
      lede: "Müsabiqə ilə bağlı işlər və davamlı təcrübə. Heç nə uydurulmur: tam spesifikasiya və ya foto yoxdursa, qeyddə açıq yazılır.",
      countLabel: "Qeyd",
      ruleLabel: "Qayda: uydurma spesifikasiya yoxdur — boşluqlar qeyd olunur",
      overview: "İcmal",
      context: "Kontekst",
      role: "Rol",
      tech: "Texnologiyalar",
      result: "Nəticə",
      docsPending: "Layihə sənədləri əlavə ediləcək.",
      openCase: "Keysə aç",
      back: "Layihələrə qayıt",
      detailContext: "Keys təhlili",
      externalLink: "Xarici layihəni aç",
      featuredLabel: "Seçilmiş işlər",
      archiveLabel: "Müsabiqə arxivi",
    },
    competitionsPage: {
      eyebrow: "Nailiyyətlər — arxiv",
      title: "Hər nəticə sənəddə olduğu kimi.",
      lede: "Xronoloji arxiv, 2020–2026. Finalçı finalçıdır; qalib qalibdir. Sahə üzrə süzün — say dərhal yenilənir.",
      filters: [
        { key: "ALL", label: "Hamısı" },
        { key: "ROBOTICS", label: "Robototexnika" },
        { key: "AI", label: "AI" },
        { key: "CYBERSECURITY", label: "Kibertəhlükəsizlik" },
        { key: "PROGRAMMING", label: "Proqramlaşdırma" },
        { key: "SCIENCE", label: "Elm" },
        { key: "OTHER", label: "Digər" },
      ],
      yearLabel: "İl",
      resultLabel: "Nəticə",
      countSuffix: "qeyd",
      yearAll: "Bütün illər",
      sortLabel: "Sırala",
      sortNewest: "Ən yenilər əvvəl",
      sortOldest: "Ən köhnələr əvvəl",
      previewLabel: "Sertifikat",
      openPost: "Nəticə postunu aç",
      linkPending: "Instagram keçidi gözləyir — post URL-ni src/data/achievements.ts-ə əlavə edin",
      certPending: "Sertifikat gözləyir — /public",
      hoverHint: "Sertifikata baxmaq üçün kartın üzərinə gəlin · Instagram postunu açmaq üçün klikləyin",
      tapHint: "Baxış üçün sertifikat işarəsinə toxunun · Post üçün karta toxunun",
      showCert: "Sertifikatı göstər",
      hideCert: "Sertifikatı gizlət",
      certificatesTitle: "Sənəddə olan sertifikatlar.",
      certificatesText: "Yuxarıdakı yerlərə əlavə olaraq, aşağıdakılar sertifikatla təsdiqlidir:",
      certificates: [
        "Bebras 2024–2025 — yarımfinal",
        "Bebras Çağırışı ABŞ 2024–2025 — Şərəf siyahısı",
        "Sabahın Alimləri XIV — iştirak / finalçı sertifikatı (Fizika)",
        "Könüllülük sertifikatları (təfərrüat sorğu ilə)",
      ],
      methodTitle: "Bu arxivi necə oxumalı.",
      methodText: "Nəticələr CV-dən əlavə tarix, yer və ya təsvir olmadan köçürülüb. Açıq ili olmayan qeydlər təyin edilmir, “—” ilə göstərilir.",
    },
    labPage: {
      eyebrow: "3D Dizayn Laboratoriyası — mühəndis vitrini",
      title: "Mühəndisliyə toxunun.",
      lede:
        "Üç interaktiv tədqiqat — müsabiqədən ilhamlanan gövdə, FreeCAD-də rekonstruksiya olunmuş 1903-cü il radial mühərriki və Aqua Fly konsepti. Döndərmək üçün sürükləyin, böyütmək üçün təkəri fırladın. Mühərrik real CAD həndəsəsidir; digər ikisi /public/models/ altına real skanlar əlavə olunana qədər prosedur konseptlərdir.",
      hint: "Döndərmək üçün sürükləyin · Böyütmək üçün təkər · Sağ düymə ilə sürüşdürün",
      resetView: "Görünüşü sıfırla",
      fullscreen: "Tam ekran",
      wireframe: "Karkas",
      transparent: "Şəffaf",
      loading: "MODEL YÜKLƏNİR...",
      specsTitle: "Texniki qeydlər",
      back: "Laboratoriyaya qayıt",
      openViewer: "Baxışa aç",
      disclaimerLabel: "Qeyd",
    },
    skillsPage: {
      eyebrow: "Bacarıqlar — mühəndis profili",
      title: "İş hansı vasitələrlə görülür.",
      lede: "Kateqoriyalar, təsvirlər və real nümunələr — uydurma faizlər və səviyyə xətləri yoxdur. Bacarıq yalnız müsabiqə və ya təcrübə ilə təsdiqlənirsə göstərilir.",
      noLevels: "Faiz göstərilmir. Səviyyə rəqəmlə deyil, arxivdəki qeydlərlə göstərilir.",
      groups: [
        {
          t: "Proqramlaşdırma",
          d: "Olimpiadalarda və tətbiqi işlərdə istifadə olunan iş dilləri.",
          items: [
            { name: "Python", desc: "Olimpiada hazırlığı, Bebras tipli məsələ həlli, kiçik tətbiqi skriptlər." },
            { name: "C++", desc: "Müsabiqə proqramlaşdırması əsasları və sistemli tədris." },
          ],
        },
        {
          t: "Mühəndis proqramları",
          d: "Təcrübə və müsabiqə işlərində istifadə olunan dizayn və məhsuldarlıq alətləri.",
          items: [
            { name: "Fusion 360", desc: "Parametrik dizayn məşqləri və prototip detalları." },
            { name: "SolidWorks", desc: "Mexaniki dizayn təcrübəsi və yığım düşüncəsi." },
            { name: "FreeCAD", desc: "Dizayn əsasları üçün açıq mənbəli CAD axını." },
            { name: "MS Excel", desc: "Cədvəllər, izləmə və struktur sənədləşmə." },
            { name: "MS Windows", desc: "Gündəlik mühəndislik mühiti." },
          ],
        },
      ],
      areasTitle: "Təcrübə sahələri.",
      areas: [
        { t: "Robototexnika", d: "Virtual və fiziki formatlarda, komanda və fərdi müsabiqə robototexnikası.", proof: "RoboCross Dünya 2-cisi · WRO finalları · AIRO 2-cisi" },
        { t: "Süni intellekt", d: "Məktəb səviyyəli olimpiada hazırlığı ilə dar, tətbiqi tədris.", proof: "ISAO 2025 Şərəf siyahısı" },
        { t: "Proqramlaşdırma", d: "Scratch əsaslarından Python/C++ məsələ həllinə.", proof: "Scratch milli finalçı · Bebras fəxri" },
        { t: "Kibertəhlükəsizlik", d: "Yalnız struktur tədris və nəzarətli laboratoriya məşqləri ilə əsaslar.", proof: "NJCO 2025 — 2-ci yer" },
      ],
    },
    mediaPage: {
      eyebrow: "Media — mövcudluq",
      title: "İşləri harada tapmaq olar.",
      lede: "Üç sənədli kanal. Təsvirlərdə yalnız təsdiqlənmiş məlumat yazılır — izləyici sayı və uydurma seriyalar yoxdur.",
      channels: [
        {
          name: "YouTube",
          handle: "EldarBuildLab",
          desc: "Mühəndislik, layihələr və qurğu yönümlü video qeydlər.",
          url: "https://www.youtube.com/@EldarBuildLab",
          meta: "youtube.com/@EldarBuildLab",
        },
        {
          name: "Instagram",
          handle: "@eldar_hamidov09",
          desc: "Şəxsi və layihə yenilikləri.",
          url: "https://www.instagram.com/eldar_hamidov09/",
          meta: "instagram.com/eldar_hamidov09",
        },
        {
          name: "GitHub",
          handle: "Eldar-005 / eldar_hasc2025",
          desc: "Texniki iş və kod, uyğun olduqda paylaşılır.",
          url: "https://github.com/Eldar-005/eldar_hasc2025",
          meta: "github.com/Eldar-005/eldar_hasc2025",
        },
      ],
      noteTitle: "Məzmun qeydi.",
      noteText: "Yalnız təsdiqlənmiş keçidlər göstərilir. Mövzu üzrə açıq qeyd yoxdursa, heç nə iddia olunmur.",
    },
    contactPage: {
      eyebrow: "Əlaqə — peşəkar müraciətlər",
      title: "Akademik, mühəndislik və əməkdaşlıq müraciətləri üçün.",
      lede: "Sadə yazın: kimsiniz, imkan nədir və nə xahiş olunur. Şəxsi telefon nömrələri dərc olunmur.",
      emailLabel: "E-poçt",
      socialLabel: "Digər kanallar",
      formTitle: "Mesaj forması.",
      formText: "Bu forma mesajı əvvəlcədən ünvanlanmış şəkildə e-poçt proqramınızda açır — bu saytda heç nə saxlanılmır.",
      name: "Ad",
      email: "E-poçt",
      message: "Mesaj",
      send: "E-poçtu hazırla",
      viaEmail: "Və ya birbaşa yazın:",
      privacy: "İzləyici yoxdur. Poçt siyahısı yoxdur. Məlumatlarınız göndərilənlər qutunuzda qalır.",
      success: "E-poçt proqramınız indi açılmalıdır. Açılmasa, ünvanı birbaşa kopyalayın.",
      whatsappTitle: "WhatsApp",
      whatsappText: "Müsabiqə və əməkdaşlıq sualları üçün ən sürətli yol. Sadə salam + kim olduğunuz kifayətdir.",
      whatsappCta: "WhatsApp-da yazın",
      projectsTitle: "Layihə saytları",
      projectsText: "Ayrı saytları olan iki açıq iş — bu portfel ilə yanaşı açın.",
    },
    footer: {
      tagline: "Robototexnika · AI · Mühəndislik · Kibertəhlükəsizlik",
      pages: "Fəsillər",
      presence: "Mövcudluq",
      settings: "Tənzimləmələr",
      rights: "Eldar Həmidov. Faktiki arxiv — uydurma nəticə yoxdur.",
      archiveNote: "Foto və sənədlər yalnız real işi göstərdikdə əlavə olunur.",
    },
    common: {
      viewAll: "Tam arxivə bax",
      documented: "Sənədli",
      alphabetNote: "AZ / EN — dil keçidi cari səhifəni saxlayır.",
    },
  },
};

export function getDict(lang: Lang): Dict {
  return dict[lang];
}
