export const LITERACY_TOPICS = [
  {
    id: "scam-awareness",
    title: "Scam Awareness",
    icon: "ShieldAlert",
    tagline: "Spot social engineering & urgency tactics",
    badge: "High Impact",
    readTime: "3 min",
    explanation:
      "Scammers exploit emotional triggers like fear, greed, or panic. They fabricate artificial emergencies such as bank account freezes, lottery winnings, or fake job offers to make you act without thinking.",
    realLifeExample:
      "Arun received a call stating his electricity bill was overdue and power would be cut in 15 minutes unless he paid ₹1,200 via an unfamiliar payment link. In panic, he complied and lost ₹25,000 from his account.",
    dos: [
      "Always independently verify the sender's credentials via official websites or hotlines.",
      "Take a 5-minute pause whenever an urgent action or fee is demanded.",
      "Cross-check suspicious offers with trusted family members or advisors.",
      "Report fraud numbers immediately on official consumer or police portals (e.g. 1930 in India).",
    ],
    donts: [
      "Never click links sent via unsolicited SMS, Telegram, or WhatsApp.",
      "Don't transfer advance 'processing fees' or 'taxes' to claim any prize or lottery.",
      "Never trust caller IDs blindly; numbers can be spoofed using VoIP software.",
      "Never install remote access screen-sharing apps like AnyDesk or TeamViewer on stranger requests.",
    ],
    safetyTip:
      "Legitimate organizations, banks, and government agencies will never demand urgent payments under threat of instant disconnection.",
    quiz: [
      {
        question: "What is the most common emotional trigger exploited in social engineering scams?",
        options: [
          "Curiosity and extreme urgency/fear",
          "Boredom and relaxation",
          "Polite requests with 30-day deadlines",
          "Formal written postal letters",
        ],
        correctIndex: 0,
        explanation:
          "Scammers rely on urgency and fear ('act in 10 minutes!') so your rational critical thinking is bypassed.",
      },
      {
        question: "You receive a message saying you won ₹1,00,000 in a contest you never entered. You must:",
        options: [
          "Pay the ₹500 processing fee immediately",
          "Recognize it as an advance-fee scam and ignore/report it",
          "Send your bank account details and Aadhaar card",
          "Forward the message to 10 friends to claim bonus points",
        ],
        correctIndex: 1,
        explanation:
          "You cannot win contests you never entered. Demanding a fee to release prizes is a classic scam formula.",
      },
      {
        question: "A caller claiming to be your bank manager asks you to install AnyDesk to solve a KYC issue. You should:",
        options: [
          "Install it and give them the 9-digit access code",
          "Politely refuse, hang up, and visit your official bank branch",
          "Install it only if they know your date of birth",
          "Ask them to call back in 5 minutes after you install it",
        ],
        correctIndex: 1,
        explanation:
          "Screen-sharing apps give attackers full control over your smartphone screen, OTPs, and banking credentials.",
      },
      {
        question: "Which of the following is an official Indian cybercrime helpline number?",
        options: ["100", "1930", "1090", "1800"],
        correctIndex: 1,
        explanation:
          "1930 is the national cyber financial fraud reporting helpline in India (cybercrime.gov.in).",
      },
      {
        question: "If a caller threatens that your SIM card will be deactivated within 2 hours unless you recharge immediately:",
        options: [
          "Recharge through the link sent in their SMS",
          "Disconnect the call and verify through the official telecom app or store",
          "Provide your UPI PIN to authenticate your SIM",
          "Share the OTP received on your phone",
        ],
        correctIndex: 1,
        explanation:
          "Telecom operators provide formal notices with statutory grace periods, never sudden 2-hour phone threats.",
      },
    ],
  },
  {
    id: "upi-safety",
    title: "UPI Safety",
    icon: "Smartphone",
    tagline: "Master PIN rules & collect-request traps",
    badge: "Crucial",
    readTime: "3 min",
    explanation:
      "UPI (Unified Payments Interface) is built for instantaneous money movement. Crucially, entering your UPI PIN always deducts money from your account—you NEVER need to enter your PIN to receive money.",
    realLifeExample:
      "Pooja listed an old sofa on an online marketplace. A buyer claimed he wanted to buy it, sent a QR code/collect request, and told Pooja: 'Scan this and enter your UPI PIN to receive ₹4,000.' Pooja entered her PIN and lost ₹4,000.",
    dos: [
      "Remember the golden rule: Entering UPI PIN ALWAYS DEBITS money.",
      "Always check the beneficiary's registered name displayed on the UPI app before confirming payment.",
      "Set sensible daily transaction and per-transaction limits in your bank app.",
      "Decline unexpected 'Collect Request' notifications immediately.",
    ],
    donts: [
      "NEVER enter your UPI PIN to receive money or cashback.",
      "Never scan a QR code sent over WhatsApp to accept funds.",
      "Never share your UPI PIN, MPIN, or debit card PIN with anyone, including bank staff.",
      "Do not use common numbers (birth year, 1234, 0000) as your UPI PIN.",
    ],
    safetyTip:
      "Receiving money via UPI is 100% passive: funds deposit automatically into your bank account without any scan or PIN entry.",
    quiz: [
      {
        question: "When should you enter your UPI PIN?",
        options: [
          "Only when sending money or checking your bank balance",
          "Whenever a buyer wants to transfer money to you",
          "To claim a cashback reward coupon",
          "Whenever you receive an incoming phone call from customer care",
        ],
        correctIndex: 0,
        explanation:
          "Your UPI PIN is strictly an authorization secret used to debit funds from your account or query balance.",
      },
      {
        question: "A buyer on OLX sends you a QR code and says 'Scan to receive payment'. What happens if you scan and enter your PIN?",
        options: [
          "Money will be deposited into your wallet",
          "Money will be deducted from your bank account",
          "The QR code will simply verify your identity",
          "Your transaction limit will increase",
        ],
        correctIndex: 1,
        explanation:
          "Scanning a merchant/p2p QR code initiates an outgoing payment. Entering your PIN transfers your money to the buyer.",
      },
      {
        question: "What should you do if an unfamiliar entity sends a 'Collect Request' of ₹2,500 on your PhonePe/GPay app?",
        options: [
          "Approve it quickly so it doesn't expire",
          "Enter a wrong PIN to test it",
          "Decline and block the request immediately",
          "Forward the request to family",
        ],
        correctIndex: 2,
        explanation:
          "Unsolicited collect requests are phishing traps. Always decline and block the unknown VPA (Virtual Payment Address).",
      },
      {
        question: "Which of the following is SAFE to share with someone sending you money via UPI?",
        options: [
          "Your UPI PIN",
          "Your UPI ID (VPA) or registered phone number",
          "The OTP sent by your bank",
          "Your ATM card expiry date and CVV",
        ],
        correctIndex: 1,
        explanation:
          "Sharing your UPI ID (e.g. name@bank) or linked phone number is safe; it only allows others to send you funds.",
      },
      {
        question: "Can any bank official ask for your UPI PIN over phone or email for KYC verification?",
        options: [
          "Yes, if they verify your account number first",
          "Yes, during annual KYC renewal months",
          "No, bank officials will NEVER ask for your UPI PIN",
          "Only if they send an official SMS first",
        ],
        correctIndex: 2,
        explanation:
          "RBI guidelines strictly prohibit any bank employee or agent from asking for passwords, PINs, or OTPs.",
      },
    ],
  },
  {
    id: "link-safety",
    title: "Link Safety",
    icon: "Globe",
    tagline: "Decode deceptive URLs, subdomains & fake domains",
    badge: "Essential",
    readTime: "3 min",
    explanation:
      "Phishing links mimic trusted banks, government portals, or ecommerce brands. Scammers use typo-squatting (e.g. sbi-online-service.top instead of onlinesbi.sbi) and URL shorteners to conceal fraudulent destinations.",
    realLifeExample:
      "Rohan clicked an SMS link reading 'bit.ly/sbi-kyc-now' because the text claimed his net banking would expire. The webpage looked identical to SBI's login portal. He entered his username and password, handing his credentials to hackers.",
    dos: [
      "Always inspect the domain name strictly right before the first single slash (/).",
      "Look for official TLDs and verify the exact spelling of the institution.",
      "Type the official website URL directly into your browser bookmark bar.",
      "Use URL expansion previewers before clicking shortened bit.ly or tinyurl links.",
    ],
    donts: [
      "Never click login links embedded inside SMS, emails, or chat messages.",
      "Don't assume a padlock icon (HTTPS) alone means a site is legitimate; scammers also use free SSL certificates.",
      "Never submit credentials on raw IP addresses (e.g., http://192.168.1.50/login).",
      "Don't trust websites hosted on cheap or anomalous TLDs (.xyz, .top, .buzz, .tk) for banking.",
    ],
    safetyTip:
      "A legitimate bank will never send shortened URL links (bit.ly/tinyurl) requiring urgent user login or KYC updates.",
    quiz: [
      {
        question: "In the URL 'https://www.hdfcbank.security-verification.xyz/login', what is the actual domain hosting the page?",
        options: [
          "hdfcbank",
          "security-verification.xyz",
          "login",
          "www",
        ],
        correctIndex: 1,
        explanation:
          "The actual domain is 'security-verification.xyz'. The term 'hdfcbank' is merely a misleading subdomain created by an attacker.",
      },
      {
        question: "Does having an 'https://' prefix with a lock icon mean a website is completely authentic and safe?",
        options: [
          "Yes, HTTPS guarantees the company is verified",
          "No, HTTPS only means communication is encrypted; scammers can also obtain free SSL certificates",
          "Yes, it means the government has certified the webpage",
          "Only if the website has a green background",
        ],
        correctIndex: 1,
        explanation:
          "HTTPS ensures encryption between your browser and the server, but scammers easily obtain SSL certificates for their fake sites.",
      },
      {
        question: "Why do scammers frequently use URL shorteners like 'tinyurl' or 'bit.ly'?",
        options: [
          "To hide the real destination domain and trick security scanners",
          "To make websites load 10x faster",
          "Because banks require short URLs by law",
          "To automatically generate OTP codes",
        ],
        correctIndex: 0,
        explanation:
          "Shorteners conceal suspicious domain names, subdomains, and scam query parameters.",
      },
      {
        question: "Which of the following domains is most likely to be an authentic Indian State Bank website?",
        options: [
          "sbi-online-kyc-update.net",
          "onlinesbi.sbi",
          "sbi-bank-portal.xyz",
          "login-sbi-portal.com",
        ],
        correctIndex: 1,
        explanation:
          "State Bank of India owns the proprietary top-level domain '.sbi' and authentic portal 'onlinesbi.sbi'.",
      },
      {
        question: "What should you do if an SMS urges you to click a link to claim an overdue income tax refund?",
        options: [
          "Click immediately before the deadline lapses",
          "Forward it to your accountant via WhatsApp",
          "Open your browser, independently visit the official incometax.gov.in portal, and check your dashboard",
          "Enter your bank account number on the link to speed up the process",
        ],
        correctIndex: 2,
        explanation:
          "Always navigate directly to the verified official government portal (incometax.gov.in) rather than clicking SMS links.",
      },
    ],
  },
  {
    id: "digital-payment-safety",
    title: "Digital Payment Safety",
    icon: "CreditCard",
    tagline: "Safeguard cards, tap-to-pay & digital wallets",
    badge: "Protective",
    readTime: "3 min",
    explanation:
      "Modern debit cards, credit cards, and contactless wallets offer great convenience, but without proper card controls (disabling international usage, tokenization, transaction caps), a single data leak can expose your balance.",
    realLifeExample:
      "Vikram left international online transactions enabled with a high ₹1,00,000 limit. A foreign gaming website database was breached, and scammers drained ₹60,000 in recurring unauthorized USD charges without OTP.",
    dos: [
      "Use your banking app to disable international usage and set low daily online limits when not in use.",
      "Tokenize your cards on trusted merchant apps instead of saving full 16-digit card numbers.",
      "Cover your CVV number with an opaque sticker after memorizing it.",
      "Enable instant SMS and email notifications for all debits regardless of amount.",
    ],
    donts: [
      "Never photograph the front and back of your credit or debit cards.",
      "Never hand over your card out of your sight at restaurants or fuel pumps.",
      "Don't carry cards with contactless RFID tap enabled at maximum limit in crowded areas without an RFID-blocking sleeve.",
      "Never save card credentials on public computers or shared Wi-Fi.",
    ],
    safetyTip:
      "Keep international usage turned OFF on your debit and credit cards in your mobile banking app unless you are traveling abroad.",
    quiz: [
      {
        question: "Why can some international credit card transactions succeed without sending an SMS OTP?",
        options: [
          "International payment gateways are exempt from Indian two-factor authentication rules",
          "The bank knows your voice",
          "OTP is only needed for payments under ₹500",
          "Because credit cards do not have PIN numbers",
        ],
        correctIndex: 0,
        explanation:
          "Two-Factor Authentication (OTP) is mandated by the RBI in India, but many overseas merchants process transactions without OTP.",
      },
      {
        question: "What is Card Tokenization?",
        options: [
          "Converting your physical card into a cryptocurrency coin",
          "Replacing real 16-digit card details with a unique masked token specific to that merchant",
          "Selling your card points for shopping vouchers",
          "Printing a new plastic card at an ATM kiosk",
        ],
        correctIndex: 1,
        explanation:
          "Tokenization replaces sensitive card numbers with a unique encrypted token, preventing merchant breaches from leaking your real details.",
      },
      {
        question: "What is the best immediate action if you notice an unrecognized debit on your debit or credit card?",
        options: [
          "Wait 48 hours to see if it refunds automatically",
          "Immediately freeze the card via your mobile banking app and notify your bank's fraud desk",
          "Call the merchant's customer service number found on Google ads",
          "Change your phone wallpaper",
        ],
        correctIndex: 1,
        explanation:
          "Instantly freezing the card stops further unauthorized charges and establishes your timeline for zero-liability fraud protection.",
      },
      {
        question: "Where is the CVV code located on standard payment cards?",
        options: [
          "On the front next to the cardholder name",
          "Inside the EMV microchip",
          "On the back signature strip (3 or 4 digits)",
          "On your monthly utility bill",
        ],
        correctIndex: 2,
        explanation:
          "The CVV is a 3-digit (or 4-digit for Amex) security code printed on the signature strip on the reverse of the card.",
      },
      {
        question: "Is it safe to conduct online card transactions using public railway or cafe Wi-Fi?",
        options: [
          "Yes, public Wi-Fi is managed by cybersecurity professionals",
          "No, unencrypted public networks can allow 'man-in-the-middle' attackers to sniff network traffic",
          "Only between 9 AM and 5 PM",
          "Yes, if the Wi-Fi requires a room number",
        ],
        correctIndex: 1,
        explanation:
          "Open public Wi-Fi networks are vulnerable to packet sniffing and spoofing. Always use mobile cellular data or a VPN.",
      },
    ],
  },
  {
    id: "budgeting",
    title: "Budgeting & Cashflow",
    icon: "PieChart",
    tagline: "Build resilience through structured allocation",
    badge: "Foundational",
    readTime: "4 min",
    explanation:
      "Budgeting isn't restriction; it is conscious direction of your money. The 50/30/20 framework offers a balanced blueprint: 50% for Needs (rent, food, bills), 30% for Wants (entertainment, dining), and 20% for Savings and debt repayment.",
    realLifeExample:
      "Neha earned ₹40,000 per month but had zero savings after 2 years because impulsive food deliveries and spontaneous sales took up 45% of her salary. Applying the 50/30/20 rule helped her build a ₹60,000 safety cushion in 8 months.",
    dos: [
      "Track your expenses for 30 days to identify hidden cash leaks.",
      "Automate savings on salary day before beginning discretionary spending.",
      "Review subscriptions quarterly and cancel unused memberships.",
      "Plan for annual and quarterly irregular expenses (insurance, taxes).",
    ],
    donts: [
      "Don't rely on mental accounting; write down or use an app for cashflow.",
      "Never save 'whatever is left over at the end of the month'—save first, spend what remains.",
      "Don't use credit card limits to mask a chronic monthly budget deficit.",
      "Don't cut out all leisure entirely; unsustainable budgets trigger binge spending.",
    ],
    safetyTip:
      "Pay yourself first: schedule an automatic transfer of at least 20% of your income to a separate savings or investment account on salary day.",
    quiz: [
      {
        question: "In the classic 50/30/20 budgeting rule, what does the 20% represent?",
        options: [
          "Dining out and movies",
          "Groceries and utility bills",
          "Savings, investments, and debt reduction",
          "Luxury car loan EMIs",
        ],
        correctIndex: 2,
        explanation:
          "The 20% bucket is strictly designated for financial security: emergency funds, retirement investments, and paying down debt.",
      },
      {
        question: "What is 'lifestyle inflation'?",
        options: [
          "Inflation caused by international currency trading",
          "Increasing your spending proportionally every time your income increases, leaving zero additional savings",
          "The government increasing taxes on lifestyle goods",
          "The cost of gym memberships rising with age",
        ],
        correctIndex: 1,
        explanation:
          "Lifestyle creep or inflation happens when raises and bonuses are absorbed into fancier cars or eating out instead of building wealth.",
      },
      {
        question: "What does 'Pay Yourself First' mean?",
        options: [
          "Buying yourself a luxury gift on the 1st of every month",
          "Routing savings and investments immediately upon receiving income before paying other expenses",
          "Taking a loan from your company",
          "Only working for cash in hand",
        ],
        correctIndex: 1,
        explanation:
          "Paying yourself first treats your future financial security as your top mandatory monthly bill.",
      },
      {
        question: "Which of the following is considered a 'Need' rather than a 'Want'?",
        options: [
          "Premium 4K streaming family subscription",
          "Basic nutrition and essential grocery staples",
          "Designer sneakers on 50% discount",
          "Weekend beach staycation",
        ],
        correctIndex: 1,
        explanation:
          "Needs are survival essentials: basic food, shelter, primary healthcare, and minimal clothing.",
      },
      {
        question: "Why is tracking small daily expenses (like coffee or snacks) important in budgeting?",
        options: [
          "Because banks charge penalties for frequent small debits",
          "Micro-expenses accumulate into substantial monthly leaks that go unnoticed",
          "To report them for income tax rebates",
          "It is required by the RBI",
        ],
        correctIndex: 1,
        explanation:
          "A ₹150 daily habit equals ₹4,500/month or over ₹54,000 annually—tracking illuminates where cash genuinely disappears.",
      },
    ],
  },
  {
    id: "needs-vs-wants",
    title: "Needs vs Wants",
    icon: "Split",
    tagline: "Master the 48-hour delay rule for purchases",
    badge: "Mindset",
    readTime: "3 min",
    explanation:
      "A need is an essential obligation required for basic living, health, or sustaining employment. A want is a preference that enhances comfort or social status. Distinguishing between the two protects you from predatory BNPL and credit card traps.",
    realLifeExample:
      "Sameer purchased a ₹1,20,000 flagship smartphone on 12-month 'No Cost EMI' even though his existing ₹18,000 phone worked perfectly. When unexpected medical costs arose, he couldn't pay the EMI and incurred 42% annualized credit penalties.",
    dos: [
      "Implement the 48-Hour Rule: wait 48 hours before purchasing non-essential items over ₹2,000.",
      "Calculate costs in hours of your labor: 'Will this jacket take 20 hours of my hard work?'",
      "Prioritize utility and durability over brand prestige.",
      "Keep a wishlist; buy items only when on planned sale and after deliberate reflection.",
    ],
    donts: [
      "Don't justify wants as needs using phrases like 'I deserve this because I had a hard week'.",
      "Avoid shopping when emotional, stressed, or intoxicated.",
      "Never borrow money or take EMIs for depreciating lifestyle wants.",
      "Don't confuse 'No Cost EMI' with free money—processing fees and GST apply.",
    ],
    safetyTip:
      "If you cannot afford to buy an item twice in cash without touching your emergency fund, you cannot truly afford it.",
    quiz: [
      {
        question: "What is the primary objective of the '48-Hour Rule' in personal finance?",
        options: [
          "To wait for weekend discount codes",
          "To allow emotional impulses to subside before making non-essential purchases",
          "To check if the courier delivers within 48 hours",
          "To ensure the bank clears your cheque",
        ],
        correctIndex: 1,
        explanation:
          "Dopamine peaks at the moment of discovery. Waiting 48 hours allows rational logic to evaluate whether the purchase is truly needed.",
      },
      {
        question: "Which of the following purchases is a clear 'Want'?",
        options: [
          "Monthly prescription blood pressure medication",
          "Replacing a broken refrigerator used by the family",
          "Upgrading to the newest smartphone model while your current phone is 1 year old",
          "Paying basic electricity and water bills",
        ],
        correctIndex: 2,
        explanation:
          "Upgrading a working phone for novelty is a discretionary desire (want), not a vital survival need.",
      },
      {
        question: "What is a hidden risk of 'Buy Now, Pay Later' (BNPL) schemes for impulse purchases?",
        options: [
          "They eliminate the psychological pain of paying, leading to overspending and steep late penalties",
          "They are illegal in India",
          "They prevent you from receiving the product",
          "They convert your debit card into a SIM card",
        ],
        correctIndex: 0,
        explanation:
          "Frictionless borrowing decouples the joy of consumption from the pain of payment, leading consumers into cumulative debt traps.",
      },
      {
        question: "Evaluating a purchase by calculating how many hours you have to work to pay for it helps by:",
        options: [
          "Making you resent your employer",
          "Grounding monetary cost in terms of real life energy and time spent",
          "Reducing your income tax liability",
          "Improving your credit score immediately",
        ],
        correctIndex: 1,
        explanation:
          "Viewing price tags as hours of your finite lifespan provides instant clarity on an item's true worth to you.",
      },
      {
        question: "If an item is on a 50% discount from ₹10,000 to ₹5,000, and you buy it without needing it, how much did you save?",
        options: [
          "₹5,000",
          "₹10,000",
          "₹0 — you actually spent ₹5,000 you didn't need to spend",
          "₹2,500",
        ],
        correctIndex: 2,
        explanation:
          "Discounts on unneeded items aren't savings; they are expenditures. You spent ₹5,000.",
      },
    ],
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund",
    icon: "LifeBuoy",
    tagline: "Your financial shock absorber against crises",
    badge: "Critical",
    readTime: "4 min",
    explanation:
      "An emergency fund is 3 to 6 months' worth of non-negotiable living expenses set aside in highly liquid, capital-safe instruments (savings account + liquid mutual fund or auto-sweep fixed deposit). It prevents you from liquidating investments or borrowing at usurious rates during crises.",
    realLifeExample:
      "When Priya's company announced sudden layoffs, she had 6 months of living expenses (₹1,50,000) in an auto-sweep FD. She was able to pay rent and groceries calmly for 4 months until securing a better role, without taking any personal loans.",
    dos: [
      "Target 3 to 6 months of absolute living expenses (rent, groceries, utilities, EMIs).",
      "Keep funds in low-risk, high-liquidity accounts (sweep-in FDs or overnight/liquid funds).",
      "Replenish the fund immediately after any emergency withdrawal.",
      "Separate this money from your everyday spending account to prevent accidental use.",
    ],
    donts: [
      "NEVER invest your emergency fund in volatile equity stocks, crypto, or locked real estate.",
      "Don't use emergency savings for planned vacations, festive shopping, or wedding gifts.",
      "Don't rely on credit card limits as your sole emergency backup.",
      "Don't lock your emergency cash in products with early exit penalties or lock-ins (like PPF/ELSS).",
    ],
    safetyTip:
      "An emergency fund is insurance, not an investment: its purpose is liquidity and peace of mind, not maximizing high returns.",
    quiz: [
      {
        question: "How many months of essential living expenses should a typical emergency fund cover?",
        options: [
          "1 to 2 weeks",
          "3 to 6 months",
          "5 to 10 years",
          "Exactly 30 days",
        ],
        correctIndex: 1,
        explanation:
          "Financial planners recommend 3 to 6 months (up to 9–12 months for freelancers or single earners) to weather unforeseen job losses or medical emergencies.",
      },
      {
        question: "Which of the following is the IDEAL place to keep an emergency fund?",
        options: [
          "High-risk crypto tokens",
          "A high-liquidity sweep-in fixed deposit or liquid fund",
          "Physical gold jewellery kept in a bank locker",
          "Locked-in real estate property",
        ],
        correctIndex: 1,
        explanation:
          "Emergency funds require immediate 24/7 liquidity and capital preservation, making sweep-in FDs or liquid funds ideal.",
      },
      {
        question: "Which situation qualifies as a genuine reason to tap into your emergency fund?",
        options: [
          "A flash online sale on designer watches",
          "Sudden medical hospitalization or involuntary job loss",
          "Funding a friend's destination bachelor party",
          "Buying a lottery ticket jackpot",
        ],
        correctIndex: 1,
        explanation:
          "Unplanned, unavoidable, and urgent crises (health, sudden unemployment, emergency house repairs) are valid emergency triggers.",
      },
      {
        question: "Why should you NOT rely solely on a credit card as your emergency fund?",
        options: [
          "Credit cards don't work in hospitals",
          "Credit cards charge high interest (36%-45% APR) if balances cannot be paid in full immediately, compounding the crisis",
          "Credit card limits automatically drop to zero during emergencies",
          "Banks prohibit using cards during weekends",
        ],
        correctIndex: 1,
        explanation:
          "High revolving interest rates turn an acute temporary emergency into a chronic long-term debt cycle.",
      },
      {
        question: "Once an emergency has passed and you withdrew ₹40,000 from your safety fund, what should you do?",
        options: [
          "Celebrate and forget about it",
          "Temporarily redirect surplus cashflow to replenish the fund back to its full target",
          "Close the account completely",
          "Take a personal loan to replace it",
        ],
        correctIndex: 1,
        explanation:
          "A depleted emergency fund leaves you vulnerable to the next unexpected crisis; refilling it must become the immediate priority.",
      },
    ],
  },
  {
    id: "loan-awareness",
    title: "Loan & Debt Awareness",
    icon: "Coins",
    tagline: "Spot predatory loan apps & understand APR costs",
    badge: "High Risk Defense",
    readTime: "4 min",
    explanation:
      "Predatory instant loan apps trap vulnerable borrowers with instant disbursements, demanding access to contacts and gallery, charging up to 300% annualized interest, and deploying blackmail tactics. Responsible borrowing means verifying RBI registration and calculating total interest cost.",
    realLifeExample:
      "Deepak needed ₹5,000 urgently and downloaded a 'QuickCash2Min' app from an APK link. The app disbursed ₹3,200 (deducting ₹1,800 processing fee) and demanded ₹7,000 within 7 days. When he delayed, the lenders sent morphed photos to his entire phone contact list.",
    dos: [
      "Check that any lending entity is an RBI-registered NBFC or scheduled commercial bank.",
      "Check the loan's Annual Percentage Rate (APR), including upfront processing fees, GST, and penalties.",
      "Borrow only for wealth-generating or career-enhancing assets (education, home equity).",
      "Keep total debt obligations (EMIs) below 35% of your net monthly income.",
    ],
    donts: [
      "NEVER download lending apps via APK links or untrusted social media ads.",
      "Never grant contacts, camera, or gallery permissions to loan applications.",
      "Don't borrow to pay off other existing unsecured loans (debt spiral).",
      "Never sign blank loan agreements or share signed blank cheques.",
    ],
    safetyTip:
      "Legitimate lenders registered with the RBI will never ask for access to your contacts or photo gallery to disburse personal loans.",
    quiz: [
      {
        question: "What is the biggest warning sign of a predatory instant loan app?",
        options: [
          "Requiring KYC documents like PAN and Aadhaar",
          "Demanding permission to read your phone contacts, gallery, and location before giving money",
          "Providing a written repayment schedule",
          "Transferring money directly into your bank account",
        ],
        correctIndex: 1,
        explanation:
          "Predatory loan apps harvest your contacts and photos to harass and blackmail your friends and family if payments are delayed.",
      },
      {
        question: "What does APR stand for in loans?",
        options: [
          "Approved Payment Return",
          "Annual Percentage Rate (the total annual cost of borrowing, including interest and processing fees)",
          "Automatic Pension Reimbursement",
          "All-India Private Registry",
        ],
        correctIndex: 1,
        explanation:
          "APR reflects the true complete annualized cost of credit, encompassing interest rates plus origination and processing fees.",
      },
      {
        question: "Where can you verify if a financial institution is legally permitted to lend in India?",
        options: [
          "On RBI's official website listing of registered Banks and NBFCs (rbi.org.in)",
          "On Instagram influencer reels",
          "By checking if they have more than 10,000 Telegram channel members",
          "By seeing if their app logo is blue",
        ],
        correctIndex: 0,
        explanation:
          "The Reserve Bank of India maintains a public register of licensed banks and Non-Banking Financial Companies (NBFCs).",
      },
      {
        question: "What is a healthy Debt-to-Income (DTI) ratio for monthly EMIs?",
        options: [
          "Above 80% of your income",
          "Under 35% to 40% of your net take-home salary",
          "Exactly 100%",
          "0% is the only allowed legal limit",
        ],
        correctIndex: 1,
        explanation:
          "Keeping total EMI obligations under 35–40% ensures you have buffer room for living expenses and emergencies.",
      },
      {
        question: "If an illegal loan recovery agent threatens to contact your employers or relatives:",
        options: [
          "Take another quick loan to pay their blackmail fee",
          "Immediately file a cybercrime complaint at 1930 and report to the local police cyber cell",
          "Apologize and give them your bank password",
          "Delete your email account",
        ],
        correctIndex: 1,
        explanation:
          "Harassment and unauthorized data harvesting violate digital lending directives. Complain to law enforcement and the RBI Sachet portal.",
      },
    ],
  },
  {
    id: "investment-awareness",
    title: "Investment & Ponzi Awareness",
    icon: "TrendingUp",
    tagline: "Unmask guaranteed return scams & task frauds",
    badge: "Wealth Protection",
    readTime: "4 min",
    explanation:
      "There is no such thing as guaranteed high returns with zero risk. Ponzi schemes, fake algorithmic trading bots, and Telegram 'task/like YouTube video' scams lure victims with initial small payouts before absconding with massive deposits.",
    realLifeExample:
      "Kavita joined a Telegram group promising '20% weekly guaranteed profit through AI crypto arbitrage'. Initially, she invested ₹5,000 and received ₹6,000 back. Convinced it was real, she deposited ₹5,00,000 of her savings. The group vanished the next morning.",
    dos: [
      "Understand the fundamental rule: Higher returns ALWAYS require higher risk.",
      "Verify that financial advisors and brokers are registered with SEBI.",
      "Stick to regulated vehicles: Mutual Funds, Index Funds, NPS, SGBs, and PPF.",
      "Conduct independent research and understand how the underlying business generates profit.",
    ],
    donts: [
      "NEVER trust anyone promising 'guaranteed 2% daily or 20% monthly returns'.",
      "Don't participate in 'Like videos & earn ₹500/hour' work-from-home Telegram scams.",
      "Never invest based on tips from unverified WhatsApp groups or social media influencers.",
      "Don't borrow money or take loans to invest in volatile assets.",
    ],
    safetyTip:
      "If an investment scheme promises guaranteed high returns with zero chance of loss, it is 100% mathematically a scam.",
    quiz: [
      {
        question: "A WhatsApp group claims: 'Invest ₹10,000 today and get guaranteed ₹2,000 every week with zero risk'. This is:",
        options: [
          "An innovative breakthrough algorithmic fund",
          "A classic Ponzi/high-yield scam that will collapse",
          "A special scheme certified by the government",
          "A standard banking fixed deposit",
        ],
        correctIndex: 1,
        explanation:
          "No legitimate financial asset can generate 20% weekly guaranteed risk-free returns. New investor deposits pay old investors until founders vanish.",
      },
      {
        question: "Who regulates stock brokers, mutual funds, and portfolio managers in India?",
        options: [
          "SEBI (Securities and Exchange Board of India)",
          "TRAI",
          "NITI Aayog",
          "FSSAI",
        ],
        correctIndex: 0,
        explanation:
          "SEBI is the statutory regulatory body governing securities and capital markets in India.",
      },
      {
        question: "In common 'Telegram Part-time Job Scams', why do scammers pay you ₹150 for your first 3 completed tasks?",
        options: [
          "Because they value fair labor compensation",
          "To build false trust and convince you to deposit large 'prepaid security balances' later",
          "Because YouTube pays them directly",
          "To test your internet connection speed",
        ],
        correctIndex: 1,
        explanation:
          "Psychological grooming: paying small amounts initially lowers your skepticism, prompting you to send thousands for 'VIP tasks'.",
      },
      {
        question: "What is the relationship between financial risk and potential return?",
        options: [
          "High returns can easily be achieved with zero risk",
          "Risk and return are directly correlated: seeking higher returns demands accepting higher volatility and loss risk",
          "Risk only exists for fixed deposits",
          "Higher risk always guarantees higher returns",
        ],
        correctIndex: 1,
        explanation:
          "The risk-return tradeoff is an iron law of finance. Anyone promising high returns without risk is deceiving you.",
      },
      {
        question: "Before investing through any online financial platform or advisor, you should always check:",
        options: [
          "If they have thousands of Instagram likes",
          "Their SEBI registration number and authenticity on sebi.gov.in",
          "If their website has a dark mode theme",
          "Whether their office is in an expensive skyscraper",
        ],
        correctIndex: 1,
        explanation:
          "SEBI's public portal allows you to search and verify registered intermediaries, research analysts, and investment advisors.",
      },
    ],
  },
  {
    id: "privacy-credentials",
    title: "Privacy & Credentials",
    icon: "KeyRound",
    tagline: "Bulletproof passwords, MFA & data leakage prevention",
    badge: "Digital Fortress",
    readTime: "3 min",
    explanation:
      "Passwords are the primary keys to your digital identity. Reusing the same password across multiple shopping, gaming, and banking portals means a breach on a random gaming forum exposes your primary email and bank accounts.",
    realLifeExample:
      "Sunil used 'Sunil@1990' for his bank account, primary Gmail, and a small footwear website. The footwear site got hacked and leaked user hashes. Hackers tested the credentials on Gmail, bypassed SMS using an email recovery loop, and drained his savings.",
    dos: [
      "Use strong, unique passphrases (14+ characters) or a reputable password manager.",
      "Enable App-based Multi-Factor Authentication (MFA) like Google Authenticator rather than SMS OTP where possible.",
      "Periodically check haveibeenpwned.com to see if your email was compromised in public breaches.",
      "Log out of banking and email accounts when using public or shared computers.",
    ],
    donts: [
      "Never reuse the same password across multiple applications or websites.",
      "Don't write your passwords or PINs on sticky notes attached to your laptop or phone.",
      "Never share OTPs with callers under any pretext—OTPs are single-use authentication tokens.",
      "Don't use easily guessable personal info (birthdates, spouse names, phone numbers) in passwords.",
    ],
    safetyTip:
      "Treat your One-Time Password (OTP) like a bank locker key: sharing it with someone who calls you is identical to handing them your wallet.",
    quiz: [
      {
        question: "Why is reusing the same password across five different websites dangerous?",
        options: [
          "It confuses your keyboard driver",
          "If the least secure website gets hacked, attackers will use those credentials to unlock your other accounts (credential stuffing)",
          "Browsers do not support saved passwords",
          "It reduces your internet bandwidth",
        ],
        correctIndex: 1,
        explanation:
          "Credential stuffing bots automatically test stolen username/password pairs across thousands of high-value services.",
      },
      {
        question: "Which form of Two-Factor Authentication (2FA) is generally more secure against SIM-swap fraud?",
        options: [
          "SMS-based OTP",
          "App-based Authenticator (e.g. Google Authenticator or hardware security keys)",
          "Writing the code on a piece of paper",
          "Unencrypted voice call OTP",
        ],
        correctIndex: 1,
        explanation:
          "Authenticator apps generate time-based codes locally on your physical device and cannot be intercepted via telecommunication SIM swaps.",
      },
      {
        question: "What should you do if you receive an unexpected SMS OTP for a password reset you didn't initiate?",
        options: [
          "Forward it to your contacts to see who sent it",
          "Do not share the OTP with anyone, and immediately check and change your account password through the official app",
          "Call the number in the SMS to ask why it arrived",
          "Delete your phone operating system",
        ],
        correctIndex: 1,
        explanation:
          "An unsolicited OTP indicates someone is trying to access your account. Do not share it, and change your password immediately.",
      },
      {
        question: "Which of the following creates the strongest password?",
        options: [
          "Password123!",
          "Your birth date combined with your mother's maiden name",
          "A random four-word passphrase with symbols, like 'Thunder-Pencil-72-Velvet!'",
          "1234567890",
        ],
        correctIndex: 2,
        explanation:
          "Long multi-word passphrases with varied characters possess massive entropy, making brute-force cracking mathematically infeasible.",
      },
      {
        question: "What does 'SIM Swap Fraud' mean?",
        options: [
          "Buying a new phone from an unauthorized dealer",
          "Fraudsters tricking your telecom carrier into re-issuing your mobile phone number to a SIM card they control",
          "Swapping two SIM cards between friends",
          "Charging a phone with an incompatible cable",
        ],
        correctIndex: 1,
        explanation:
          "In SIM swap attacks, criminals take over your phone number to intercept your incoming SMS OTPs and access financial accounts.",
      },
    ],
  },
];
