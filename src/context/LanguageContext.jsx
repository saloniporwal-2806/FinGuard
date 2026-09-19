import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_learn: "Learn",
    nav_scan: "Scan",
    nav_goals: "Goals",
    nav_budget: "Budget",
    nav_profile: "Profile",

    // Common Actions
    btn_back: "Back",
    btn_continue: "Continue",
    btn_cancel: "Cancel",
    btn_save: "Save",
    btn_edit: "Edit",
    btn_close: "Close",
    btn_submit: "Submit",
    btn_verify: "Verify",
    btn_analyze: "Analyze",
    btn_view_details: "View Details →",
    btn_view_all: "View All →",
    btn_view_account: "View Account →",
    btn_check_another: "Check Another Message, Link, or Payment",
    btn_learn_more: "Learn More",

    // Dashboard
    dash_greeting: "Good Morning,",
    dash_health_title: "Your Financial Health",
    dash_health_good: "Good",
    dash_health_desc: "You're on track! Keep learning and stay secure.",
    dash_quick_scan: "Scan & Pay",
    dash_quick_learn: "Learn",
    dash_quick_budget: "Budget",
    dash_quick_more: "AI & More",
    dash_total_balance: "Total Balance",
    dash_balance_trend: "+12% this month",
    dash_scam_check: "Scam Check",
    dash_scam_check_sub: "Analyze SMS / text",
    dash_link_check: "Link Check",
    dash_link_check_sub: "Inspect URL safety",
    dash_recent_activity: "Recent Activity",
    dash_upi_payment: "UPI Payment",
    dash_received: "Received",
    dash_salary_credit: "Salary Credit • Yesterday, 4:32 PM",
    dash_security_premium: "Security Premium • Today, 9:14 AM",

    // Scan & Pay / QR
    scan_title: "Scan & Pay",
    scan_subtitle: "Secure • Fast • UPI",
    scan_heading: "Scan any UPI QR",
    scan_open_camera: "Open Camera Scanner",
    scan_close_camera: "Close Camera",
    scan_camera_error: "Camera access unavailable. You can upload a QR image or select a test scenario.",
    scan_upload_qr: "Scan from Gallery / Image",
    scan_quick_pay: "Quick Pay",
    scan_processing: "Processing QR Code...",
    scan_detected_title: "UPI Payment Detected",
    scan_payee_name: "Payee Name",
    scan_payee_vpa: "UPI ID / VPA",
    scan_amount: "Amount (₹)",
    scan_note: "Note",
    scan_enter_amount: "Enter amount to pay",
    scan_verify_btn: "Verify & Analyze Risk",
    scan_demo_pill: "Use Demo QR",

    // Risk Engine & Results
    risk_low: "LOW RISK",
    risk_med: "MEDIUM RISK",
    risk_high: "HIGH RISK",
    risk_score_title: "Prototype Risk Score",
    risk_assessment_subtitle: "Transparent AI Explainable Report",
    risk_analysis_complete: "ANALYSIS COMPLETE",
    risk_why_title: "Why this score was calculated",
    risk_safety_lesson: "RECOMMENDED SAFETY LESSON",
    risk_standard_vigilance: "STANDARD VIGILANCE",
    risk_verify_proceeding: "VERIFY BEFORE PROCEEDING",
    risk_pause_verify: "PAUSE & VERIFY",
    risk_official_domain: "OFFICIAL VERIFIED DOMAIN",

    // Budget & Goals
    budget_title: "My Budget",
    budget_subtitle: "September 2026 • Monthly Goals",
    budget_tab_budget: "Budget",
    budget_tab_goals: "Goals",
    budget_remaining: "Remaining",
    budget_used: "used",
    budget_set_new: "Set New Budget",
    budget_cat_food: "Food & Dining",
    budget_cat_travel: "Travel & Fuel",
    budget_cat_shopping: "Shopping",
    budget_cat_entertainment: "Entertainment",
    goals_heading: "Financial Savings Goals",
    goals_subtitle: "Track targets and protect long-term reserves",
    goals_target: "Target",
    goals_saved: "Saved",
    goals_add_btn: "+ Add New Goal",
    goals_modal_title: "Create New Savings Goal",
    goals_name_placeholder: "Goal Name (e.g., Emergency Fund)",
    goals_target_placeholder: "Target Amount (₹)",
    goals_saved_placeholder: "Currently Saved (₹)",

    // Profile & Settings
    profile_title: "Profile & Settings",
    profile_subtitle: "Manage your credentials and safety settings",
    profile_edit_btn: "Edit Profile",
    profile_language: "Language",
    profile_language_select: "Select Language",
    profile_progress: "My Progress",
    profile_progress_sub: "lessons completed",
    profile_saved: "Saved Articles",
    profile_saved_sub: "Review bookmarked security tips",
    profile_notifications: "Notifications",
    profile_notifications_sub: "security alerts",
    profile_help: "Help & Support",
    profile_help_sub: "FAQs and cyber helplines (1930)",
    profile_about: "About FinGuard",
    profile_about_sub: "Version 1.0 • Prototype",
    profile_reset: "Reset Prototype Data",
    profile_logout: "Log Out",

    // Mini Quiz & Learning
    quiz_title: "Mini Quiz",
    quiz_question_of: "Question",
    quiz_current_score: "CURRENT SCORE",
    quiz_confirm: "Confirm Answer",
    quiz_next: "Next Question",
    quiz_finish: "View Results",
    quiz_completed: "Quiz Completed!",
    quiz_restart: "Retake Quiz",
    quiz_back_learn: "Back to Learn Hub",
    learn_hub_title: "Learn & Protect",
    learn_hub_subtitle: "Bite-sized financial safety lessons",
  },
  hi: {
    // Navigation
    nav_home: "होम",
    nav_learn: "सीखें",
    nav_scan: "स्कैन",
    nav_goals: "लक्ष्य",
    nav_budget: "बजट",
    nav_profile: "प्रोफ़ाइल",

    // Common Actions
    btn_back: "वापस",
    btn_continue: "आगे बढ़ें",
    btn_cancel: "रद्द करें",
    btn_save: "सहेजें",
    btn_edit: "संपादित करें",
    btn_close: "बंद करें",
    btn_submit: "जमा करें",
    btn_verify: "सत्यापित करें",
    btn_analyze: "विश्लेषण करें",
    btn_view_details: "विवरण देखें →",
    btn_view_all: "सभी देखें →",
    btn_view_account: "खाता देखें →",
    btn_check_another: "अन्य संदेश, लिंक या भुगतान जांचें",
    btn_learn_more: "अधिक जानें",

    // Dashboard
    dash_greeting: "शुभ प्रभात,",
    dash_health_title: "वित्तीय स्वास्थ्य",
    dash_health_good: "उत्कृष्ट",
    dash_health_desc: "आप सही दिशा में हैं! सीखते रहें और सुरक्षित रहें।",
    dash_quick_scan: "स्कैन और भुगतान",
    dash_quick_learn: "सीखें",
    dash_quick_budget: "बजट",
    dash_quick_more: "एआई और अन्य",
    dash_total_balance: "कुल शेष राशि",
    dash_balance_trend: "+12% इस महीने",
    dash_scam_check: "स्कैम जांच",
    dash_scam_check_sub: "एसएमएस / टेक्स्ट विश्लेषण",
    dash_link_check: "लिंक जांच",
    dash_link_check_sub: "यूआरएल सुरक्षा जांचें",
    dash_recent_activity: "हाल की गतिविधि",
    dash_upi_payment: "यूपीआई भुगतान",
    dash_received: "प्राप्त हुआ",
    dash_salary_credit: "वेतन जमा • कल, 4:32 अपराह्न",
    dash_security_premium: "सुरक्षा प्रीमियम • आज, 9:14 पूर्वाह्न",

    // Scan & Pay / QR
    scan_title: "स्कैन और भुगतान",
    scan_subtitle: "सुरक्षित • तेज़ • यूपीआई",
    scan_heading: "कोई भी यूपीआई क्यूआर स्कैन करें",
    scan_open_camera: "कैमरा स्कैनर खोलें",
    scan_close_camera: "कैमरा बंद करें",
    scan_camera_error: "कैमरा उपलब्ध नहीं है। आप गैलरी से क्यूआर छवि अपलोड कर सकते हैं या डेमो चुन सकते हैं।",
    scan_upload_qr: "गैलरी / छवि से स्कैन करें",
    scan_quick_pay: "त्वरित भुगतान",
    scan_processing: "क्यूआर कोड प्रोसेस हो रहा है...",
    scan_detected_title: "यूपीआई भुगतान प्राप्त हुआ",
    scan_payee_name: "प्राप्तकर्ता का नाम",
    scan_payee_vpa: "यूपीआई आईडी (VPA)",
    scan_amount: "राशि (₹)",
    scan_note: "विवरण / नोट",
    scan_enter_amount: "भुगतान राशि दर्ज करें",
    scan_verify_btn: "सत्यापित करें और जोखिम जांचें",
    scan_demo_pill: "डेमो क्यूआर उपयोग करें",

    // Risk Engine & Results
    risk_low: "कम जोखिम",
    risk_med: "मध्यम जोखिम",
    risk_high: "उच्च जोखिम",
    risk_score_title: "प्रोटोटाइप जोखिम स्कोर",
    risk_assessment_subtitle: "पारदर्शी एआई व्याख्या रिपोर्ट",
    risk_analysis_complete: "विश्लेषण संपन्न",
    risk_why_title: "यह स्कोर क्यों निर्धारित किया गया",
    risk_safety_lesson: "अनुशंसित सुरक्षा पाठ",
    risk_standard_vigilance: "मानक सतर्कता",
    risk_verify_proceeding: "आगे बढ़ने से पहले पुष्टि करें",
    risk_pause_verify: "रुकें और सत्यापित करें",
    risk_official_domain: "आधिकारिक सत्यापित डोमेन",

    // Budget & Goals
    budget_title: "मेरा बजट",
    budget_subtitle: "सितंबर 2026 • मासिक लक्ष्य",
    budget_tab_budget: "बजट",
    budget_tab_goals: "लक्ष्य",
    budget_remaining: "शेष राशि",
    budget_used: "खर्च",
    budget_set_new: "नया बजट निर्धारित करें",
    budget_cat_food: "भोजन और खान-पान",
    budget_cat_travel: "यात्रा और ईंधन",
    budget_cat_shopping: "खरीदारी",
    budget_cat_entertainment: "मनोरंजन",
    goals_heading: "वित्तीय बचत लक्ष्य",
    goals_subtitle: "अपने लक्ष्यों को ट्रैक करें और बचत सुरक्षित रखें",
    goals_target: "लक्ष्य",
    goals_saved: "संचित",
    goals_add_btn: "+ नया लक्ष्य जोड़ें",
    goals_modal_title: "नया बचत लक्ष्य बनाएं",
    goals_name_placeholder: "लक्ष्य का नाम (उदा. आपातकालीन निधि)",
    goals_target_placeholder: "लक्ष्य राशि (₹)",
    goals_saved_placeholder: "वर्तमान बचत (₹)",

    // Profile & Settings
    profile_title: "प्रोफ़ाइल और सेटिंग्स",
    profile_subtitle: "अपनी साख और सुरक्षा सेटिंग्स प्रबंधित करें",
    profile_edit_btn: "प्रोफ़ाइल संपादित करें",
    profile_language: "भाषा (Language)",
    profile_language_select: "भाषा चुनें (Select Language)",
    profile_progress: "मेरी प्रगति",
    profile_progress_sub: "पाठ पूरे हुए",
    profile_saved: "सहेजे गए लेख",
    profile_saved_sub: "सहेजी गई सुरक्षा युक्तियाँ देखें",
    profile_notifications: "सूचनाएं",
    profile_notifications_sub: "सुरक्षा अलर्ट",
    profile_help: "सहायता और समर्थन",
    profile_help_sub: "अक्सर पूछे जाने वाले प्रश्न और साइबर हेल्पलाइन (1930)",
    profile_about: "FinGuard के बारे में",
    profile_about_sub: "संस्करण 1.0 • प्रोटोटाइप",
    profile_reset: "प्रोटोटाइप डेटा रीसेट करें",
    profile_logout: "लॉग आउट",

    // Mini Quiz & Learning
    quiz_title: "मिनी क्विज",
    quiz_question_of: "प्रश्न",
    quiz_current_score: "वर्तमान स्कोर",
    quiz_confirm: "उत्तर की पुष्टि करें",
    quiz_next: "अगला प्रश्न",
    quiz_finish: "परिणाम देखें",
    quiz_completed: "क्विज संपन्न!",
    quiz_restart: "पुनः क्विज दें",
    quiz_back_learn: "लर्न हब पर वापस जाएं",
    learn_hub_title: "सीखें और सुरक्षित रहें",
    learn_hub_subtitle: "आसान वित्तीय सुरक्षा पाठ",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem("finguard_language") || "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("finguard_language", lang);
    } catch (e) {
      console.warn("Could not save language to localStorage", e);
    }
  };

  const t = (key, fallback = "") => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isHindi: language === "hi",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      t: (k, fb = "") => fb || k,
      isHindi: false,
    };
  }
  return context;
}
