// Canonical public profile — EDIT HERE.
// Privacy rule: no father's name, no date of birth, no marital status.

export const PROFILE = {
  name: "Eldar Həmidov",
  tagline: "Robotics • AI • Cybersecurity • Engineering",
  supporting:
    "Building intelligent systems, exploring engineering, and turning ideas into real-world prototypes.",
  location: "Sumgait, Azerbaijan",
  education: [
    {
      school: "Sumqayıt şəhər İstedad liseyi",
      schoolEn: "Sumgait City Istedad Lyceum",
      years: "2016–2023",
    },
    {
      school: "Sumqayıt şəhər T.İsmayılov adına 29 nömrəli tam orta ümumtəhsil məktəbi",
      schoolEn: "Secondary School No. 29 named after T. Ismayilov, Sumgait",
      years: "2023–present",
    },
  ],
  languages: [
    { name: "English", level: "B2" },
    { name: "Russian", level: "Intermediate / basic" },
    { name: "Turkish", level: "Good" },
  ],
  skillGroups: [
    { group: "Programming", items: ["Python", "C++"] },
    { group: "Mechanical CAD", items: ["Fusion 360", "SolidWorks", "FreeCAD"] },
    { group: "Robotics", items: ["Competition robotics", "Prototyping"] },
    { group: "AI", items: ["Applied study", "Olympiad preparation"] },
    { group: "Cybersecurity", items: ["Fundamentals", "Lab practice"] },
    { group: "Technical Computing", items: ["MS Windows", "MS Excel"] },
  ],
} as const;
