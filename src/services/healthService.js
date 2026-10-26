// Health Advisory & Wellness Service
// Front-End Engineering II (Lectures 67–72: REST APIs, Async State, Loading/Error/Retry)

const curatedHealthTips = [
  {
    id: "tip-1",
    category: "Preventive Care",
    title: "Hydration & Cognitive Function",
    summary: "Drinking 2.5 to 3 liters of water throughout the day reduces fatigue, prevents morning headaches, and helps stabilize blood pressure.",
    author: "LifeCare Preventive Medicine Dept",
    readTime: "2 min read",
    tag: "Wellness"
  },
  {
    id: "tip-2",
    category: "Heart Health",
    title: "The 30-Minute Daily Walk Rule",
    summary: "Just 30 minutes of moderate aerobic activity like brisk walking lowers resting heart rate, reduces LDL cholesterol, and bolsters vascular flexibility.",
    author: "Dr. Vikram Mehta (Cardiology)",
    readTime: "3 min read",
    tag: "Cardiology"
  },
  {
    id: "tip-3",
    category: "Immunity",
    title: "Seasonal Fever Management",
    summary: "When experiencing low-grade fever, prioritize hydration, rest, and electrolyte balance before taking heavy medications. Consult a physician if fever exceeds 101°F.",
    author: "Dr. Aarti Sharma (Internal Medicine)",
    readTime: "2 min read",
    tag: "General Health"
  },
  {
    id: "tip-4",
    category: "Skin Health",
    title: "Protecting Your Skin Barrier",
    summary: "Consistent application of SPF 30+ sunscreen and gentle non-soap cleansers guards against early photo-aging and seasonal dryness.",
    author: "Dr. Simran Kaur (Dermatology)",
    readTime: "2 min read",
    tag: "Dermatology"
  }
];

export async function fetchDailyHealthTips(shouldFail = false) {
  await new Promise((resolve) => setTimeout(resolve, 380));

  if (shouldFail) {
    throw new Error("Unable to fetch live health advisories from the network. Check your connection.");
  }

  return curatedHealthTips;
}
