// Curated seed data for The Great Indian Circus state explorer.
// Sources to integrate later: MyNeta, ADR, ECI, PRS India, CAG reports.

export interface Politician {
  name: string;
  role: string;
  party: string;
  assets: string;
  cases: number;
  attendance?: number;
  questions?: number;
  note?: string;
}

export interface StateData {
  code: string;
  name: string;
  capital: string;
  cm: string;
  population: string;
  pendingCases: number;
  scamValue: string; // human readable e.g. "₹4,500 Cr"
  dramaScore: number; // 0-100, satirical "Corruption Drama Score"
  topPoliticians: Politician[];
  notableScams: string[];
  status: 'detailed' | 'stub';
}

// Note: data is illustrative/placeholder, structured for easy replacement
// with real API/scraper output (MyNeta + ADR + ECI). Numbers should be
// treated as satirical until live data is wired in.
export const STATES: StateData[] = [
  {
    code: 'MH', name: 'Maharashtra', capital: 'Mumbai',
    cm: 'Devendra Fadnavis', population: '12.4 Cr',
    pendingCases: 187, scamValue: '₹1,24,500 Cr', dramaScore: 92,
    topPoliticians: [
      { name: 'Devendra Fadnavis', role: 'Chief Minister', party: 'BJP', assets: '₹13.4 Cr', cases: 4, attendance: 78 },
      { name: 'Ajit Pawar', role: 'Dy CM', party: 'NCP', assets: '₹42.7 Cr', cases: 5, attendance: 71 },
      { name: 'Eknath Shinde', role: 'Dy CM', party: 'SHS', assets: '₹7.8 Cr', cases: 3, attendance: 69 },
    ],
    notableScams: ['Adarsh Housing', 'Irrigation scam', 'PMC Bank'],
    status: 'detailed',
  },
  {
    code: 'UP', name: 'Uttar Pradesh', capital: 'Lucknow',
    cm: 'Yogi Adityanath', population: '23.5 Cr',
    pendingCases: 312, scamValue: '₹78,200 Cr', dramaScore: 88,
    topPoliticians: [
      { name: 'Yogi Adityanath', role: 'Chief Minister', party: 'BJP', assets: '₹1.5 Cr', cases: 1, attendance: 82 },
      { name: 'Akhilesh Yadav', role: 'Opp. Leader', party: 'SP', assets: '₹37.3 Cr', cases: 2, attendance: 64 },
      { name: 'Mayawati', role: 'BSP Chief', party: 'BSP', assets: '₹111 Cr', cases: 1, attendance: 52 },
    ],
    notableScams: ['NRHM scam', 'Gomti Riverfront', 'Sugar mill sale'],
    status: 'detailed',
  },
  {
    code: 'KA', name: 'Karnataka', capital: 'Bengaluru',
    cm: 'Siddaramaiah', population: '6.8 Cr',
    pendingCases: 142, scamValue: '₹35,000 Cr', dramaScore: 81,
    topPoliticians: [
      { name: 'Siddaramaiah', role: 'Chief Minister', party: 'INC', assets: '₹23.5 Cr', cases: 13, attendance: 74 },
      { name: 'D.K. Shivakumar', role: 'Dy CM', party: 'INC', assets: '₹1,413 Cr', cases: 19, attendance: 68 },
      { name: 'Basavaraj Bommai', role: 'MP', party: 'BJP', assets: '₹7.8 Cr', cases: 0, attendance: 71 },
    ],
    notableScams: ['Bellary mining', 'MUDA case', 'Bitcoin scam'],
    status: 'detailed',
  },
  {
    code: 'TN', name: 'Tamil Nadu', capital: 'Chennai',
    cm: 'M.K. Stalin', population: '7.7 Cr',
    pendingCases: 98, scamValue: '₹22,400 Cr', dramaScore: 76,
    topPoliticians: [
      { name: 'M.K. Stalin', role: 'Chief Minister', party: 'DMK', assets: '₹38.6 Cr', cases: 3, attendance: 80 },
      { name: 'Udhayanidhi Stalin', role: 'Dy CM', party: 'DMK', assets: '₹83.4 Cr', cases: 1, attendance: 72 },
      { name: 'Edappadi K. Palaniswami', role: 'Opp. Leader', party: 'AIADMK', assets: '₹11.2 Cr', cases: 0, attendance: 67 },
    ],
    notableScams: ['2G spectrum (origin)', 'Sand mining', 'Granite scam'],
    status: 'detailed',
  },
  {
    code: 'WB', name: 'West Bengal', capital: 'Kolkata',
    cm: 'Mamata Banerjee', population: '10.2 Cr',
    pendingCases: 156, scamValue: '₹41,800 Cr', dramaScore: 84,
    topPoliticians: [
      { name: 'Mamata Banerjee', role: 'Chief Minister', party: 'TMC', assets: '₹0.16 Cr', cases: 2, attendance: 70 },
      { name: 'Abhishek Banerjee', role: 'MP', party: 'TMC', assets: '₹4.1 Cr', cases: 1, attendance: 58 },
      { name: 'Suvendu Adhikari', role: 'Opp. Leader', party: 'BJP', assets: '₹9.8 Cr', cases: 26, attendance: 65 },
    ],
    notableScams: ['Sarada chit fund', 'Narada sting', 'SSC recruitment'],
    status: 'detailed',
  },
  {
    code: 'BR', name: 'Bihar', capital: 'Patna',
    cm: 'Nitish Kumar', population: '12.7 Cr',
    pendingCases: 224, scamValue: '₹19,500 Cr', dramaScore: 86,
    topPoliticians: [
      { name: 'Nitish Kumar', role: 'Chief Minister', party: 'JDU', assets: '₹0.75 Cr', cases: 0, attendance: 61 },
      { name: 'Tejashwi Yadav', role: 'Opp. Leader', party: 'RJD', assets: '₹6.0 Cr', cases: 9, attendance: 54 },
      { name: 'Samrat Choudhary', role: 'Dy CM', party: 'BJP', assets: '₹5.8 Cr', cases: 4, attendance: 66 },
    ],
    notableScams: ['Fodder scam', 'Srijan scam', 'Muzaffarpur shelter'],
    status: 'detailed',
  },
  {
    code: 'GJ', name: 'Gujarat', capital: 'Gandhinagar',
    cm: 'Bhupendra Patel', population: '7.0 Cr',
    pendingCases: 89, scamValue: '₹29,600 Cr', dramaScore: 74,
    topPoliticians: [
      { name: 'Bhupendra Patel', role: 'Chief Minister', party: 'BJP', assets: '₹8.0 Cr', cases: 0, attendance: 79 },
      { name: 'Hardik Patel', role: 'MLA', party: 'BJP', assets: '₹3.0 Cr', cases: 17, attendance: 73 },
      { name: 'Isudan Gadhvi', role: 'AAP State Pres.', party: 'AAP', assets: '₹2.1 Cr', cases: 2, attendance: 60 },
    ],
    notableScams: ['Snoopgate', 'GSPC gas exploration', 'Adani port (allegations)'],
    status: 'detailed',
  },
  {
    code: 'RJ', name: 'Rajasthan', capital: 'Jaipur',
    cm: 'Bhajan Lal Sharma', population: '7.9 Cr',
    pendingCases: 118, scamValue: '₹14,200 Cr', dramaScore: 71,
    topPoliticians: [
      { name: 'Bhajan Lal Sharma', role: 'Chief Minister', party: 'BJP', assets: '₹1.5 Cr', cases: 0, attendance: 77 },
      { name: 'Ashok Gehlot', role: 'Opp. Leader', party: 'INC', assets: '₹6.6 Cr', cases: 0, attendance: 68 },
      { name: 'Sachin Pilot', role: 'INC', party: 'INC', assets: '₹14.4 Cr', cases: 1, attendance: 64 },
    ],
    notableScams: ['Bhanwari Devi', 'JJM tenders', 'REET paper leak'],
    status: 'detailed',
  },
  {
    code: 'DL', name: 'Delhi', capital: 'New Delhi',
    cm: 'Rekha Gupta', population: '2.0 Cr',
    pendingCases: 76, scamValue: '₹11,200 Cr', dramaScore: 79,
    topPoliticians: [
      { name: 'Rekha Gupta', role: 'Chief Minister', party: 'BJP', assets: '₹5.3 Cr', cases: 0, attendance: 75 },
      { name: 'Arvind Kejriwal', role: 'AAP Chief', party: 'AAP', assets: '₹3.4 Cr', cases: 4, attendance: 62 },
      { name: 'Manish Sisodia', role: 'AAP', party: 'AAP', assets: '₹1.0 Cr', cases: 2, attendance: 58 },
    ],
    notableScams: ['Excise policy', 'CWG 2010', 'Jal Board tenders'],
    status: 'detailed',
  },
  {
    code: 'KL', name: 'Kerala', capital: 'Thiruvananthapuram',
    cm: 'Pinarayi Vijayan', population: '3.5 Cr',
    pendingCases: 64, scamValue: '₹8,900 Cr', dramaScore: 67,
    topPoliticians: [
      { name: 'Pinarayi Vijayan', role: 'Chief Minister', party: 'CPI(M)', assets: '₹1.2 Cr', cases: 11, attendance: 71 },
      { name: 'V.D. Satheesan', role: 'Opp. Leader', party: 'INC', assets: '₹2.4 Cr', cases: 0, attendance: 73 },
      { name: 'Shashi Tharoor', role: 'MP', party: 'INC', assets: '₹54.3 Cr', cases: 1, attendance: 84 },
    ],
    notableScams: ['Gold smuggling', 'SNC-Lavalin', 'Solar scam'],
    status: 'detailed',
  },
  // Stub states/UTs — show "tent under construction"
  ...stubStates(),
];

function stubStates(): StateData[] {
  const stubs = [
    ['AP', 'Andhra Pradesh', 'Amaravati'], ['AR', 'Arunachal Pradesh', 'Itanagar'],
    ['AS', 'Assam', 'Dispur'], ['CG', 'Chhattisgarh', 'Raipur'],
    ['GA', 'Goa', 'Panaji'], ['HR', 'Haryana', 'Chandigarh'],
    ['HP', 'Himachal Pradesh', 'Shimla'], ['JH', 'Jharkhand', 'Ranchi'],
    ['MP', 'Madhya Pradesh', 'Bhopal'], ['MN', 'Manipur', 'Imphal'],
    ['ML', 'Meghalaya', 'Shillong'], ['MZ', 'Mizoram', 'Aizawl'],
    ['NL', 'Nagaland', 'Kohima'], ['OD', 'Odisha', 'Bhubaneswar'],
    ['PB', 'Punjab', 'Chandigarh'], ['SK', 'Sikkim', 'Gangtok'],
    ['TG', 'Telangana', 'Hyderabad'], ['TR', 'Tripura', 'Agartala'],
    ['UK', 'Uttarakhand', 'Dehradun'],
    ['AN', 'A. & N. Islands', 'Port Blair'], ['CH', 'Chandigarh', 'Chandigarh'],
    ['DN', 'Dadra & N.H.', 'Daman'], ['JK', 'Jammu & Kashmir', 'Srinagar'],
    ['LA', 'Ladakh', 'Leh'], ['LD', 'Lakshadweep', 'Kavaratti'],
    ['PY', 'Puducherry', 'Puducherry'],
  ];
  return stubs.map(([code, name, capital]) => ({
    code, name, capital,
    cm: 'Tent under construction',
    population: '—',
    pendingCases: 0, scamValue: '—', dramaScore: 0,
    topPoliticians: [],
    notableScams: [],
    status: 'stub' as const,
  }));
}

export const STATE_BY_CODE = Object.fromEntries(STATES.map(s => [s.code, s]));
