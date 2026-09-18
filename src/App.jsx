import React, { useState, useEffect } from "react";
import { Smartphone, Monitor, Shield, Sparkles, ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { DEMO_CASES } from "./data/demoCases";
import { SplashScreen } from "./screens/SplashScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { ScanAndPayScreen } from "./screens/ScanAndPayScreen";
import { LearnHubScreen } from "./screens/LearnHubScreen";
import { AIAssistantScreen } from "./screens/AIAssistantScreen";
import { ScamCheckScreen } from "./screens/ScamCheckScreen";
import { FinancialEducationScreen } from "./screens/FinancialEducationScreen";
import { AIAssistantChatScreen } from "./screens/AIAssistantChatScreen";
import { BudgetScreen } from "./screens/BudgetScreen";
import { ProfileSettingsScreen } from "./screens/ProfileSettingsScreen";
import { MessageScannerScreen } from "./screens/MessageScannerScreen";
import { LinkCheckerScreen } from "./screens/LinkCheckerScreen";
import { TransactionAnalyzerScreen } from "./screens/TransactionAnalyzerScreen";
import { RiskResultScreen } from "./screens/RiskResultScreen";
import { TopicDetailScreen } from "./screens/TopicDetailScreen";
import { MiniQuizScreen } from "./screens/MiniQuizScreen";
import { RiskHistoryScreen } from "./screens/RiskHistoryScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { SettingsAboutScreen } from "./screens/SettingsAboutScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { BottomNav } from "./components/BottomNav";
import { StorageService } from "./services/storageService";
import { AuthService } from "./services/authService";
import { evaluateRisk } from "./services/riskEngine";
import { LITERACY_TOPICS } from "./data/literacyTopics";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => AuthService.getCurrentUser());
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [screenParams, setScreenParams] = useState(null);
  const [screenStack, setScreenStack] = useState(["dashboard"]);
  const [isFullView, setIsFullView] = useState(false);

  // Persistent States
  const [scans, setScans] = useState(() => StorageService.getScans());
  const [quizProgress, setQuizProgress] = useState(() => StorageService.getQuizProgress());
  const [safetyScore, setSafetyScore] = useState(() => StorageService.getSafetyScore());

  // Active result & conversation
  const [activeResult, setActiveResult] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [prefilledInput, setPrefilledInput] = useState(null);
  const [aiChatPrompt, setAiChatPrompt] = useState("");

  useEffect(() => {
    setSafetyScore(StorageService.getSafetyScore());
  }, [scans]);

  const navigateTo = (screen, params = null) => {
    if (params) setScreenParams(params);
    setScreenStack((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (screenStack.length > 1) {
      const newStack = [...screenStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setScreenStack(newStack);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen("dashboard");
    }
  };

  // Perform AI Risk Evaluation
  const handlePerformAnalysis = (inputData) => {
    const evaluation = evaluateRisk({
      message: inputData.message || "",
      url: inputData.url || "",
      transaction: inputData.transaction || null,
    });

    const updatedScans = StorageService.saveScan(evaluation);
    setScans(updatedScans);
    setActiveResult(evaluation);

    // If analyzed message or high-risk scam, show Screen 6 (Scam Check)
    if (inputData.message || evaluation.score >= 70) {
      navigateTo("scam-check", evaluation);
    } else {
      navigateTo("result", evaluation);
    }
  };

  // Handle Demo Case Selection from 1-Click Bar
  const handleSelectDemoCase = (demoCase) => {
    const { input } = demoCase;
    if (input.transaction && !input.message && !input.url) {
      setPrefilledInput(input.transaction);
      handlePerformAnalysis({ transaction: input.transaction });
    } else if (input.transaction && input.message) {
      handlePerformAnalysis({
        message: input.message,
        url: input.url,
        transaction: input.transaction,
      });
    }
  };

  const handleSelectTopic = (topic) => {
    setActiveTopic(topic);
    navigateTo("topic-detail", { topicId: topic.id });
  };

  const handleQuizComplete = (topicId, score, total) => {
    const updated = StorageService.saveQuizCompletion(topicId, score, total);
    setQuizProgress(updated);
  };

  const handleResetData = () => {
    setScans(StorageService.getScans());
    setQuizProgress(StorageService.getQuizProgress());
    setSafetyScore(StorageService.getSafetyScore());
    setCurrentScreen("dashboard");
  };

  const getTopicFromParams = () => {
    if (activeTopic) return activeTopic;
    if (screenParams?.topicId) {
      return LITERACY_TOPICS.find((t) => t.id === screenParams.topicId) || LITERACY_TOPICS[0];
    }
    return LITERACY_TOPICS[0];
  };

  // Show 5-Tab Bottom Nav on main root views
  const showBottomNav = [
    "dashboard",
    "learn-hub",
    "budget",
    "profile",
  ].includes(currentScreen) && Boolean(currentUser);

  return (
    <div className="app-wrapper">
      {/* Top Hackathon Bar with Frame View Toggle */}
      <div className="hackathon-bar">
        <div className="hackathon-badge">
          <div className="dot" />
          <span>FinGuard AI</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "#94A3B8" }}>Prototype v1.0</span>
          <button
            className="frame-toggle-btn"
            onClick={() => setIsFullView(!isFullView)}
            title="Toggle between Mobile Phone Frame and Expanded View"
          >
            {isFullView ? <Smartphone size={13} /> : <Monitor size={13} />}
            <span>{isFullView ? "Phone Frame" : "Expanded"}</span>
          </button>
        </div>
      </div>

      {/* 1-Click Demo Scenarios Toolbar for Evaluators / Hackathon */}
      <div className="demo-presets-topbar">
        <button
          className="topbar-demo-pill safe"
          onClick={() => handleSelectDemoCase(DEMO_CASES[0])}
          title="Run Case 1: Safe Payment Demo"
        >
          <ShieldCheck size={13} />
          <span>Case 1: Safe</span>
        </button>
        <button
          className="topbar-demo-pill med"
          onClick={() => handleSelectDemoCase(DEMO_CASES[1])}
          title="Run Case 2: Medium Risk Demo"
        >
          <AlertTriangle size={13} />
          <span>Case 2: Medium Risk</span>
        </button>
        <button
          className="topbar-demo-pill high"
          onClick={() => handleSelectDemoCase(DEMO_CASES[2])}
          title="Run Case 3: High Risk Attack Demo"
        >
          <ShieldAlert size={13} />
          <span>Case 3: High Risk</span>
        </button>
      </div>

      {/* Main Simulated Mobile Device Container */}
      <div className={`mobile-device ${isFullView ? "full-mode" : ""}`}>
        {/* Dynamic Island / Notch Simulator */}
        <div className={`phone-notch-bar ${currentScreen === "scan-pay" ? "dark-status" : ""}`}>
          <span>9:41</span>
          <div className="notch-pill" />
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Screen Content Container */}
        <div className="app-screen-container">
          {/* Screen 1: Splash Screen */}
          {currentScreen === "splash" && (
            <SplashScreen
              onFinish={() => {
                const user = AuthService.getCurrentUser();
                if (!user) {
                  setCurrentScreen("auth");
                } else {
                  setCurrentScreen("dashboard");
                }
              }}
            />
          )}

          {/* Authentication Screen: Login / Signup */}
          {currentScreen === "auth" && (
            <AuthScreen
              onAuthSuccess={(user) => {
                setCurrentUser(user);
                setCurrentScreen("dashboard");
                setScreenStack(["dashboard"]);
              }}
            />
          )}

          {/* Screen 2: Home Dashboard */}
          {currentScreen === "dashboard" && (
            <DashboardScreen
              currentUser={currentUser}
              safetyScore={safetyScore}
              recentScans={scans}
              onNavigate={(screen, params) => {
                if (screen === "result" || screen === "scam-check") {
                  setActiveResult(params);
                  navigateTo(screen, params);
                } else if (screen === "topic-detail") {
                  const t = LITERACY_TOPICS.find((x) => x.id === params.topicId);
                  setActiveTopic(t);
                  navigateTo("topic-detail", params);
                } else {
                  navigateTo(screen, params);
                }
              }}
              onSelectDemoCase={handleSelectDemoCase}
            />
          )}

          {/* Screen 3: Scan & Pay */}
          {currentScreen === "scan-pay" && (
            <ScanAndPayScreen
              onBack={handleBack}
              onSelectRecipient={(data) => {
                setPrefilledInput(data);
                navigateTo("transaction-analyzer", { transaction: data });
              }}
            />
          )}

          {/* Screen 4: Learn & Protect */}
          {currentScreen === "learn-hub" && (
            <LearnHubScreen
              onSelectTopic={handleSelectTopic}
              onBack={handleBack}
              onNavigate={(screen) => navigateTo(screen)}
            />
          )}

          {/* Screen 5: AI Assistant */}
          {currentScreen === "ai-assistant" && (
            <AIAssistantScreen
              onOpenChat={(prompt) => {
                setAiChatPrompt(prompt);
                navigateTo("ai-assistant-chat");
              }}
              onBack={handleBack}
            />
          )}

          {/* Screen 6: Detailed Scam Analysis (Scam Check) */}
          {currentScreen === "scam-check" && (
            <ScamCheckScreen
              scanData={activeResult || screenParams}
              onBack={handleBack}
              onReport={() => {
                alert("Scam report logged in local audit and shared to cyber defense log (1930)");
                navigateTo("dashboard");
              }}
            />
          )}

          {/* Screen 7: Financial Education (Search & Topic Modules) */}
          {currentScreen === "financial-education" && (
            <FinancialEducationScreen
              onSelectTopic={handleSelectTopic}
              onBack={handleBack}
            />
          )}

          {/* Screen 8: AI Assistant Chat */}
          {currentScreen === "ai-assistant-chat" && (
            <AIAssistantChatScreen
              initialPrompt={aiChatPrompt}
              onBack={handleBack}
            />
          )}

          {/* Screen 9: Budget & Expense Tracker */}
          {currentScreen === "budget" && (
            <BudgetScreen
              onBack={handleBack}
              onSetBudget={() => alert("Budget updated to ₹ 15,000 for September 2026")}
            />
          )}

          {/* Screen 10: Profile & Settings */}
          {currentScreen === "profile" && (
            <ProfileSettingsScreen
              currentUser={currentUser}
              onNavigate={(screen) => navigateTo(screen)}
              onResetData={handleResetData}
              onUpdateProfile={(updatedUser) => {
                setCurrentUser(updatedUser);
              }}
              onLogout={() => {
                AuthService.logout();
                setCurrentUser(null);
                setCurrentScreen("auth");
                setScreenStack(["auth"]);
              }}
              onBack={handleBack}
            />
          )}

          {/* Additional Connected Prototype Screens */}
          {currentScreen === "message-scanner" && (
            <MessageScannerScreen
              initialText={screenParams?.message || ""}
              onAnalyze={handlePerformAnalysis}
              onBack={handleBack}
            />
          )}

          {currentScreen === "link-checker" && (
            <LinkCheckerScreen
              initialUrl={screenParams?.url || ""}
              onCheck={handlePerformAnalysis}
              onBack={handleBack}
            />
          )}

          {currentScreen === "transaction-analyzer" && (
            <TransactionAnalyzerScreen
              initialData={prefilledInput || screenParams?.transaction || null}
              onAnalyze={handlePerformAnalysis}
              onBack={handleBack}
            />
          )}

          {currentScreen === "result" && (
            <RiskResultScreen
              result={activeResult || screenParams}
              onBack={handleBack}
              onNavigate={(screen, params) => {
                if (screen === "topic-detail") {
                  const t = LITERACY_TOPICS.find((x) => x.id === params.topicId);
                  setActiveTopic(t);
                }
                navigateTo(screen, params);
              }}
              onCheckAnother={() => navigateTo("dashboard")}
            />
          )}

          {currentScreen === "topic-detail" && (
            <TopicDetailScreen
              topic={getTopicFromParams()}
              isCompleted={Boolean(quizProgress[getTopicFromParams()?.id]?.completed)}
              userScore={quizProgress[getTopicFromParams()?.id]?.score || 0}
              onStartQuiz={() => navigateTo("mini-quiz")}
              onBack={handleBack}
            />
          )}

          {currentScreen === "mini-quiz" && (
            <MiniQuizScreen
              topic={getTopicFromParams()}
              onQuizComplete={handleQuizComplete}
              onBack={() => navigateTo("learn-hub")}
            />
          )}

          {currentScreen === "history" && (
            <RiskHistoryScreen
              scans={scans}
              onSelectScan={(scan) => {
                setActiveResult(scan);
                navigateTo("scam-check", scan);
              }}
              onSettings={() => navigateTo("settings")}
              onBack={handleBack}
            />
          )}

          {currentScreen === "insights" && (
            <InsightsScreen
              scans={scans}
              quizProgress={quizProgress}
              onNavigate={(screen, params) => navigateTo(screen, params)}
              onSettings={() => navigateTo("settings")}
              onBack={handleBack}
            />
          )}

          {currentScreen === "settings" && (
            <SettingsAboutScreen
              onBack={handleBack}
              onResetData={handleResetData}
            />
          )}
        </div>

        {/* 5-Tab Bottom Navigation Bar */}
        {showBottomNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              setScreenStack(["dashboard", screen]);
            }}
          />
        )}
      </div>
    </div>
  );
}
