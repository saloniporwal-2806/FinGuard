/**
 * Sample transaction history used to establish a user's normal financial behavior baseline.
 * Baseline profile:
 * - Typical amount: ₹100 - ₹2,000
 * - Usual transaction hours: 10:00 - 21:00 (10 AM - 9 PM)
 * - Known trusted recipients: Mom, Grocery Store, Electric Utility, Office Cafeteria, Landlord, Rahul (Friend), Amazon India
 */
export const INITIAL_TRANSACTIONS = [
  {
    id: "tx_01",
    amount: 500,
    recipient: "Mom",
    time: "18:30",
    date: "2026-03-10",
    category: "Transfer",
    knownRecipient: true,
    location: "Home City",
    description: "Monthly grocery contribution",
  },
  {
    id: "tx_02",
    amount: 1200,
    recipient: "Grocery Store",
    time: "13:20",
    date: "2026-03-11",
    category: "Shopping",
    knownRecipient: true,
    location: "Home City",
    description: "Weekly supermarket run",
  },
  {
    id: "tx_03",
    amount: 1800,
    recipient: "Rahul (Friend)",
    time: "20:15",
    date: "2026-03-12",
    category: "Transfer",
    knownRecipient: true,
    location: "Home City",
    description: "Dinner bill split",
  },
  {
    id: "tx_04",
    amount: 350,
    recipient: "Office Cafeteria",
    time: "14:10",
    date: "2026-03-13",
    category: "Food",
    knownRecipient: true,
    location: "Office",
    description: "Lunch & coffee",
  },
  {
    id: "tx_05",
    amount: 1450,
    recipient: "Amazon India",
    time: "16:45",
    date: "2026-03-14",
    category: "Shopping",
    knownRecipient: true,
    location: "Online",
    description: "Study books",
  },
  {
    id: "tx_06",
    amount: 850,
    recipient: "Electric Utility",
    time: "11:00",
    date: "2026-03-15",
    category: "Bills",
    knownRecipient: true,
    location: "Home City",
    description: "Power bill payment",
  },
  {
    id: "tx_07",
    amount: 250,
    recipient: "Metro Rail",
    time: "09:40",
    date: "2026-03-16",
    category: "Travel",
    knownRecipient: true,
    location: "Home City",
    description: "Smart card recharge",
  },
  {
    id: "tx_08",
    amount: 1950,
    recipient: "Pharmacy Care",
    time: "19:10",
    date: "2026-03-17",
    category: "Health",
    knownRecipient: true,
    location: "Home City",
    description: "Family wellness kit",
  },
];

export const KNOWN_RECIPIENTS = [
  "Mom",
  "Dad",
  "Grocery Store",
  "Rahul (Friend)",
  "Office Cafeteria",
  "Amazon India",
  "Electric Utility",
  "Landlord",
  "Metro Rail",
  "Pharmacy Care",
];

export const BEHAVIOUR_BASELINE = {
  minAmount: 50,
  typicalMaxAmount: 2000,
  extremeThreshold: 10000,
  nightStartHour: 23, // 11 PM
  nightEndHour: 6,    // 6 AM
  knownRecipients: KNOWN_RECIPIENTS,
};
