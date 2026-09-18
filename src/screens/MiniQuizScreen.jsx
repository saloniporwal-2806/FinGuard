import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles, BookOpen } from "lucide-react";
import { Header } from "../components/Header";

export function MiniQuizScreen({ topic, onQuizComplete, onBack }) {
  const questions = topic.quiz || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 0 : 0);
      setQuizFinished(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Confetti fallback
      }

      onQuizComplete(topic.id, finalScore, questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Header
        title={`${topic.title} Quiz`}
        subtitle={quizFinished ? "Results & Assessment" : `Question ${currentIndex + 1} of ${questions.length}`}
        showBack={true}
        onBack={onBack}
      />

      <div className="screen-content" style={{ flex: 1 }}>
        {!quizFinished ? (
          <>
            {/* Progress indicator */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748B", fontWeight: "700" }}>
                <span>QUESTION {currentIndex + 1} OF {questions.length}</span>
                <span>CURRENT SCORE: {score}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "6px",
                  background: "#E2E8F0",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                    height: "100%",
                    background: "#00D09C",
                    borderRadius: "3px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="card" style={{ padding: "20px 18px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#0F172A",
                  lineHeight: 1.4,
                  marginBottom: "16px",
                }}
              >
                {currentQ.question}
              </h3>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {currentQ.options.map((opt, idx) => {
                  let borderColor = "#E2E8F0";
                  let bg = "#FFFFFF";
                  let textColor = "#1E293B";

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      borderColor = "#10B981";
                      bg = "#ECFDF5";
                      textColor = "#065F46";
                    } else if (idx === selectedOption) {
                      borderColor = "#EF4444";
                      bg = "#FEF2F2";
                      textColor = "#991B1B";
                    }
                  } else if (idx === selectedOption) {
                    borderColor = "#00D09C";
                    bg = "rgba(0, 208, 156, 0.08)";
                    textColor = "#0F172A";
                  }

                  const letter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: "14px",
                        border: `2px solid ${borderColor}`,
                        background: bg,
                        color: textColor,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: isAnswerSubmitted ? "default" : "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          background: isAnswerSubmitted && idx === currentQ.correctIndex ? "#10B981" : "#F1F5F9",
                          color: isAnswerSubmitted && idx === currentQ.correctIndex ? "#FFFFFF" : "#475569",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        {letter}
                      </span>
                      <span style={{ fontSize: "13px", fontWeight: "600", lineHeight: 1.35 }}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner when answered */}
              {isAnswerSubmitted && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    background: selectedOption === currentQ.correctIndex ? "#ECFDF5" : "#FEF2F2",
                    border: `1px solid ${selectedOption === currentQ.correctIndex ? "#A7F3D0" : "#FECACA"}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    animation: "fadeIn 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "700", fontSize: "12px" }}>
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 size={16} color="#10B981" />
                        <span style={{ color: "#065F46" }}>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} color="#EF4444" />
                        <span style={{ color: "#991B1B" }}>Incorrect</span>
                      </>
                    )}
                  </div>
                  <p style={{ fontSize: "12px", color: selectedOption === currentQ.correctIndex ? "#064E3B" : "#7F1D1D", lineHeight: 1.4 }}>
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div>
              {!isAnswerSubmitted ? (
                <button
                  className="btn-accent"
                  disabled={selectedOption === null}
                  onClick={handleConfirmAnswer}
                  style={{ opacity: selectedOption === null ? 0.6 : 1 }}
                >
                  <span>Submit Answer</span>
                </button>
              ) : (
                <button className="btn-primary" onClick={handleNextQuestion}>
                  <span>
                    {currentIndex < questions.length - 1 ? "Next Question" : "View Final Results"}
                  </span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Quiz Completed Celebration Screen */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "20px 0",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #00D09C 0%, #059669 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 10px 25px rgba(0, 208, 156, 0.35)",
              }}
            >
              <Trophy size={42} />
            </div>

            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#059669",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                TOPIC MASTERED 🎉
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#0F172A",
                  marginTop: "4px",
                }}
              >
                QUIZ COMPLETE
              </h2>
              <p style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>
                You completed the safety check for <strong>{topic.title}</strong>
              </p>
            </div>

            {/* Score Card */}
            <div
              className="card"
              style={{
                width: "100%",
                padding: "20px",
                background: "#F8FAFC",
                border: "1.5px solid #E2E8F0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Your Score</span>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "44px", fontWeight: "800", color: "#0F172A", lineHeight: 1 }}>
                {score} <span style={{ fontSize: "20px", color: "#94A3B8" }}>/ {questions.length}</span>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: score >= 4 ? "#059669" : "#D97706",
                  background: score >= 4 ? "#ECFDF5" : "#FFFBEB",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                }}
              >
                {score === 5 ? "Perfect Score! Master FinGuard" : score >= 3 ? "Solid Financial Literacy!" : "Keep Practicing!"}
              </span>
            </div>

            {/* Actions */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button className="btn-accent" onClick={onBack}>
                <BookOpen size={16} />
                <span>Return to Learn Hub</span>
              </button>
              <button className="btn-secondary" onClick={handleRestartQuiz}>
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
