import React from 'react'

/**
 * Header component providing navigation back to Home, learning mode switching,
 * English/Urdu language controls, text size toggle, Text-to-Speech (Listen), and Help button.
 */
export default function Header({
  activeMachine,
  onGoHome,
  learningMode,
  onSelectLearningMode,
  language,
  onChangeLanguage,
  largeText,
  onToggleLargeText,
  onToggleHelp,
  isHelpOpen,
  onSpeakCurrentScreen,
  isSpeaking,
  ttsSupported,
}) {
  const showEnglish = language === 'both' || language === 'en'
  const showUrdu = language === 'both' || language === 'ur'

  return (
    <header className="site-header" role="banner">
      <div className="header-top-row">
        <div className="brand-group">
          <button
            type="button"
            className="brand-home-btn"
            onClick={onGoHome}
            aria-label="Go to Kiosk of Confidence Home Screen"
          >
            <span className="brand-icon" aria-hidden="true">
              🖥️
            </span>
            <div className="brand-titles">
              <span className="brand-name">Kiosk of Confidence</span>
              {showUrdu && (
                <span className="brand-urdu" lang="ur" dir="rtl">
                  اعتماد کا کیوسک — بے خوف ہو کر مشین استعمال کرنا سیکھیں
                </span>
              )}
            </div>
          </button>
          <span className="safe-simulation-pill">
            🛡️ 100% Safe Simulation • محفوظ مشق
          </span>
        </div>

        <div className="header-utility-controls" aria-label="Accessibility and support tools">
          {/* Language Switcher */}
          <div className="control-pill-group" role="group" aria-label="Language selection">
            <button
              type="button"
              className={`utility-btn ${language === 'both' ? 'active' : ''}`}
              onClick={() => onChangeLanguage('both')}
              title="Show both English and Urdu instructions"
            >
              EN + اردو
            </button>
            <button
              type="button"
              className={`utility-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => onChangeLanguage('en')}
              title="Show English instructions only"
            >
              English
            </button>
            <button
              type="button"
              className={`utility-btn ${language === 'ur' ? 'active' : ''}`}
              onClick={() => onChangeLanguage('ur')}
              title="صرف اردو ہدایات دکھائیں"
              lang="ur"
            >
              اردو
            </button>
          </div>

          {/* Text Size Toggle */}
          <button
            type="button"
            className={`utility-btn text-size-btn ${largeText ? 'active' : ''}`}
            onClick={onToggleLargeText}
            aria-pressed={largeText}
            title="Toggle Extra Large Text for easier reading"
          >
            {largeText ? '🔍 Text: Extra Large (A+)' : '🔍 Text: Large (A+)'}
          </button>

          {/* Browser Text-to-Speech Listen Button */}
          <button
            type="button"
            className={`utility-btn listen-btn ${isSpeaking ? 'speaking' : ''}`}
            onClick={onSpeakCurrentScreen}
            title={
              ttsSupported
                ? 'Listen to the instructions on this screen read aloud'
                : 'Audio speech is not supported in this browser'
            }
          >
            {isSpeaking ? (
              <>
                ⏹ Stop Audio {showUrdu && <span lang="ur">• آواز روکیں</span>}
              </>
            ) : (
              <>
                🔊 Listen {showUrdu && <span lang="ur">• ہدایات سنیں</span>}
              </>
            )}
          </button>

          {/* Contextual Help Toggle */}
          <button
            type="button"
            className={`utility-btn help-toggle-btn ${isHelpOpen ? 'active' : ''}`}
            onClick={onToggleHelp}
            aria-expanded={isHelpOpen}
          >
            ❓ Help {showUrdu && <span lang="ur">• مدد</span>}
          </button>

          {/* Explicit Home button when inside a simulator */}
          {activeMachine !== 'home' && (
            <button
              type="button"
              className="utility-btn home-nav-btn"
              onClick={onGoHome}
            >
              🏠 Home {showUrdu && <span lang="ur">• ہوم پیج</span>}
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher Bar when inside any simulator */}
      {activeMachine !== 'home' && (
        <div className="mode-switcher-bar" role="navigation" aria-label="Learning mode selection">
          <div className="mode-switcher-label">
            {showEnglish && <span>Choose How You Want to Practice:</span>}
            {showUrdu && (
              <span className="urdu-inline" lang="ur" dir="rtl">
                مشق کا طریقہ منتخب کریں:
              </span>
            )}
          </div>

          <div className="mode-buttons">
            <button
              type="button"
              className={`mode-tab-btn ${learningMode === 'learn' ? 'active' : ''}`}
              onClick={() => onSelectLearningMode('learn')}
            >
              <span className="mode-icon" aria-hidden="true">📖</span>
              <div className="mode-text">
                <strong>1. Learn Mode</strong>
                <small>Explains every part of this screen</small>
                {showUrdu && (
                  <small className="urdu-block" lang="ur" dir="rtl">
                    سیکھنے کا طریقہ (ہر بٹن کی وضاحت)
                  </small>
                )}
              </div>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${learningMode === 'practice' ? 'active' : ''}`}
              onClick={() => onSelectLearningMode('practice')}
            >
              <span className="mode-icon" aria-hidden="true">🎯</span>
              <div className="mode-text">
                <strong>2. Guided Practice</strong>
                <small>Step-by-step hints & mistake recovery</small>
                {showUrdu && (
                  <small className="urdu-block" lang="ur" dir="rtl">
                    رہنمائی کے ساتھ مشق (اشاروں کے ساتھ)
                  </small>
                )}
              </div>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${learningMode === 'independent' ? 'active' : ''}`}
              onClick={() => onSelectLearningMode('independent')}
            >
              <span className="mode-icon" aria-hidden="true">⭐</span>
              <div className="mode-text">
                <strong>3. Independent Practice</strong>
                <small>Fewer hints — just like a real machine</small>
                {showUrdu && (
                  <small className="urdu-block" lang="ur" dir="rtl">
                    خودکار مشق (کم اشارے — حقیقی مشین کی طرح)
                  </small>
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

