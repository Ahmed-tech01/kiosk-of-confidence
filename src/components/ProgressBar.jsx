import React from 'react'

/**
 * ProgressBar component showing the user's current step in the simulator flow,
 * a visual progress meter, and clickable completed steps so users can easily go back.
 */
export default function ProgressBar({
  machineName,
  machineNameUrdu,
  steps,
  currentStepIndex,
  onStepClick,
  language,
}) {
  const showEnglish = language === 'both' || language === 'en'
  const showUrdu = language === 'both' || language === 'ur'
  const totalSteps = steps.length
  const percentage = Math.round(((currentStepIndex + 1) / totalSteps) * 100)

  return (
    <section className="progress-bar-container" aria-label="Practice progress">
      <div className="progress-header-row">
        <div className="progress-machine-title">
          {showEnglish && <strong>{machineName}</strong>}
          {showUrdu && (
            <span className="urdu-inline" lang="ur" dir="rtl">
              {machineNameUrdu}
            </span>
          )}
        </div>

        <div className="progress-step-counter">
          {showEnglish && (
            <span>
              Step {currentStepIndex + 1} of {totalSteps} ({percentage}%)
            </span>
          )}
          {showUrdu && (
            <span className="urdu-inline" lang="ur" dir="rtl">
              مرحلہ {currentStepIndex + 1} از {totalSteps}
            </span>
          )}
        </div>
      </div>

      {/* Visual Progress Track */}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={currentStepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Pills */}
      <ol className="progress-steps-list">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex
          const isCurrent = idx === currentStepIndex
          const canJumpBack = isCompleted && typeof onStepClick === 'function'

          return (
            <li
              key={step.id || idx}
              className={`progress-step-item ${
                isCurrent ? 'current' : isCompleted ? 'completed' : 'upcoming'
              }`}
            >
              {canJumpBack ? (
                <button
                  type="button"
                  className="progress-step-btn"
                  onClick={() => onStepClick(idx)}
                  title={`Go back to Step ${idx + 1}: ${step.label}`}
                >
                  <span className="step-badge">✓ {idx + 1}</span>
                  <div className="step-labels">
                    {showEnglish && <span className="step-en">{step.label}</span>}
                    {showUrdu && (
                      <span className="step-ur" lang="ur" dir="rtl">
                        {step.labelUrdu}
                      </span>
                    )}
                  </div>
                </button>
              ) : (
                <div className="progress-step-static" aria-current={isCurrent ? 'step' : undefined}>
                  <span className="step-badge">{idx + 1}</span>
                  <div className="step-labels">
                    {showEnglish && <span className="step-en">{step.label}</span>}
                    {showUrdu && (
                      <span className="step-ur" lang="ur" dir="rtl">
                        {step.labelUrdu}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

