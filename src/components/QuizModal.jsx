import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Trophy } from 'lucide-react';

export default function QuizModal() {
  const { activeModal, closeModal, modalData, showToast } = useApp();
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (activeModal !== 'quiz' || !modalData) return null;

  const quiz = modalData;
  const totalQuestions = quiz.questions.length;

  const handleOptionSelect = (questionId, optionIdx) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length < totalQuestions) {
      showToast('Please answer all questions before submitting.', 'warning');
      return;
    }
    setSubmitted(true);
    const finalScore = calculateScore();
    showToast(`Quiz Submitted! You scored ${finalScore}/${totalQuestions}`, 'success');
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = submitted ? calculateScore() : 0;
  const scorePercent = Math.round((score / totalQuestions) * 100);

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-2xl max-h-[90vh]">
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {quiz.title}
            </h3>
          </div>
          <button
            onClick={() => {
              handleReset();
              closeModal();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {submitted && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/30 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Quiz Result: {score}/{totalQuestions} ({scorePercent}%)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {scorePercent >= 70
                  ? 'Great job! You have demonstrated strong understanding of the module concepts.'
                  : 'Review the module lessons and try again to improve your score.'}
              </p>
            </div>
          )}

          {quiz.questions.map((q, qIdx) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Q{qIdx + 1}: {q.question}
              </h4>

              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswers[q.id] === oIdx;
                  const isCorrect = q.correctAnswer === oIdx;

                  let borderStyle = 'border-slate-200 dark:border-slate-700 hover:border-indigo-400';
                  let bgStyle = 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200';

                  if (isSelected) {
                    borderStyle = 'border-indigo-600 ring-2 ring-indigo-500/30';
                    bgStyle = 'bg-indigo-50 dark:bg-indigo-950/60 font-semibold text-indigo-600 dark:text-indigo-400';
                  }

                  if (submitted) {
                    if (isCorrect) {
                      borderStyle = 'border-emerald-500 ring-2 ring-emerald-500/30';
                      bgStyle = 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-400';
                    } else if (isSelected && !isCorrect) {
                      borderStyle = 'border-rose-500 ring-2 ring-rose-500/30';
                      bgStyle = 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionSelect(q.id, oIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 text-xs rounded-xl border transition-all flex items-center justify-between ${borderStyle} ${bgStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {submitted && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3 text-[11px] rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          {submitted ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl hover:bg-indigo-100 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              {Object.keys(userAnswers).length} of {totalQuestions} answered
            </span>
          )}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => {
                handleReset();
                closeModal();
              }}
              className="px-6 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
            >
              Close
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
