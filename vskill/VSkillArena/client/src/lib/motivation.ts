const spartan_greetings = [
  "Hail, Warrior of Knowledge! 🗡️",
  "Stand ready for today's conquest! 🛡️",
  "Victory awaits the prepared mind! ⚔️",
  "Your learning journey continues, brave one! 🏃‍♂️",
  "Today we learn, tomorrow we conquer! 🎯",
];

const motivation_quotes = [
  "The more you learn, the more you earn.",
  "Knowledge is the ultimate weapon.",
  "Your mind is your greatest asset.",
  "Every challenge is an opportunity to grow.",
  "Success is built one lesson at a time.",
];

export function getDailyGreeting() {
  const dayOfYear = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / (1000 * 60 * 60 * 24));
  return spartan_greetings[dayOfYear % spartan_greetings.length];
}

export function getDailyMotivation() {
  const dayOfYear = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / (1000 * 60 * 60 * 24));
  return motivation_quotes[dayOfYear % motivation_quotes.length];
}
