import React, { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import MachineCard from './components/MachineCard'
import ATM from './machines/ATM'
import TicketMachine from './machines/TicketMachine'
import FoodMachine from './machines/FoodMachine'
import './App.css'

const PRACTICE_MACHINES = [
  {
    id: 'atm',
    icon: '🏧',
    badge: 'Banking Kiosk • بینک اے ٹی ایم',
    title: 'ATM Practice',
    titleUrdu: 'اے ٹی ایم کی مشق',
    description:
      'Learn how to check your balance or withdraw fictional cash safely. Practice selecting amounts, reviewing your screen, and taking your card back — without ever entering a real card number or PIN.',
    descriptionUrdu:
      'بغیر کسی اصلی کارڈ یا پن کے، محفوظ طریقے سے بیلنس چیک کرنے اور فرضی رقم نکالنے کی مشق کریں۔',
    skills: [
      {
        en: 'Choose Cash Withdrawal or Balance Inquiry',
        ur: 'رقم نکالنے یا بیلنس چیک کرنے کا انتخاب',
      },
      {
        en: 'Select preset Fast Cash or enter a custom amount',
        ur: 'تیار شدہ رقم یا اپنی مرضی کی رقم کا انتخاب',
      },
      {
        en: 'Make a mistake & fix the amount before confirming',
        ur: 'تصدیق سے پہلے غلط رقم کو تبدیل کرنے کی مشق',
      },
    ],
  },
  {
    id: 'ticket',
    icon: '🎫',
    badge: 'Travel Kiosk • سفری ٹکٹ مشین',
    title: 'Ticket Booking Practice',
    titleUrdu: 'ٹکٹ بکنگ کی مشق',
    description:
      'Practice buying train or bus tickets on a station touchscreen. Choose your departure and destination cities, select Senior or Economy fares, adjust passenger counts, and edit any detail before printing.',
    descriptionUrdu:
      'ریلوے یا بس اسٹیشن کی ٹچ اسکرین پر روانگی اور منزل کا شہر، ٹکٹ کی قسم اور مسافروں کی تعداد منتخب کرنے کی مشق کریں۔',
    skills: [
      {
        en: 'Pick Departure and Destination cities in order',
        ur: 'روانگی اور منزل کے شہروں کا انتخاب',
      },
      {
        en: 'Choose Economy, Business, or Senior Citizen discount',
        ur: 'اکانومی، بزنس یا بزرگ شہری رعایت کا انتخاب',
      },
      {
        en: 'Edit any city, ticket class, or passenger count on Review',
        ur: 'جائزہ اسکرین پر کسی بھی غلطی کی فوری درستگی',
      },
    ],
  },
  {
    id: 'food',
    icon: '🍔',
    badge: 'Restaurant Kiosk • ریستوران آرڈر مشین',
    title: 'Food Ordering Practice',
    titleUrdu: 'کھانا آرڈر کرنے کی مشق',
    description:
      'Practice ordering meals and drinks on a self-service restaurant screen. Browse menu categories, add items to your tray, change quantities, remove accidental items, and get your pickup number.',
    descriptionUrdu:
      'ریستوران کی سیلف سروس اسکرین پر مینو دیکھنا، کھانا شامل کرنا، تعداد بدلنا اور غلط آئٹم ہٹانا سیکھیں۔',
    skills: [
      {
        en: 'Choose Eat In (Dine Here) or Takeaway (Parcel)',
        ur: 'یہاں کھانے یا پارسل لے جانے کا انتخاب',
      },
      {
        en: 'Browse categories & adjust quantities with + and -',
        ur: 'مختلف کھانوں کی تعداد کم یا زیادہ کرنا',
      },
      {
        en: 'Remove an accidental item & review your order total',
        ur: 'غلطی سے شامل چیز کو ہٹانا اور کل بل چیک کرنا',
      },
    ],
  },
]

const HOME_SPEECH_TEXT =
  'Welcome to Kiosk of Confidence. Practice first. Use technology independently. This is a safe practice website with three touchscreen simulators: ATM Practice, Ticket Booking Practice, and Food Ordering Practice. Touch any Start Practice button to begin.'

export default function App() {
  const [activeMachine, setActiveMachine] = useState('home') // 'home' | 'atm' | 'ticket' | 'food'
  const [learningMode, setLearningMode] = useState('practice') // 'learn' | 'practice' | 'independent'
  const [language, setLanguage] = useState('both') // 'both' | 'en' | 'ur'
  const [largeText, setLargeText] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [currentScreenSpeech, setCurrentScreenSpeech] = useState(HOME_SPEECH_TEXT)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [ttsNotice, setTtsNotice] = useState('')

  const ttsSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window

  const showEnglish = language === 'both' || language === 'en'
  const showUrdu = language === 'both' || language === 'ur'

  const stopSpeech = useCallback(() => {
    if (ttsSupported) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [ttsSupported])

  const speakText = useCallback(
    (textToSpeak) => {
      if (!ttsSupported) {
        setTtsNotice(
          'Audio speech (Text-to-Speech) is not available in this browser, but all written guides are shown clearly on screen.'
        )
        return
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        return
      }
      setTtsNotice('')
      const utterance = new SpeechSynthesisUtterance(textToSpeak || currentScreenSpeech)
      utterance.rate = 0.92 // Slightly slower, clearer pace for older adults
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      setIsSpeaking(true)
      window.speechSynthesis.speak(utterance)
    },
    [ttsSupported, currentScreenSpeech]
  )

  useEffect(() => {
    return () => {
      if (ttsSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [ttsSupported])

  const handleGoHome = () => {
    stopSpeech()
    setActiveMachine('home')
    setCurrentScreenSpeech(HOME_SPEECH_TEXT)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStartMachine = (machineId, mode = 'practice') => {
    stopSpeech()
    setLearningMode(mode)
    setActiveMachine(machineId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app-shell ${largeText ? 'extra-large-text' : ''}`}>
      <Header
        activeMachine={activeMachine}
        onGoHome={handleGoHome}
        learningMode={learningMode}
        onSelectLearningMode={(mode) => setLearningMode(mode)}
        language={language}
        onChangeLanguage={(lang) => setLanguage(lang)}
        largeText={largeText}
        onToggleLargeText={() => setLargeText((prev) => !prev)}
        onToggleHelp={() => setIsHelpOpen((prev) => !prev)}
        isHelpOpen={isHelpOpen}
        onSpeakCurrentScreen={() => speakText(currentScreenSpeech)}
        isSpeaking={isSpeaking}
        ttsSupported={ttsSupported}
      />

      {ttsNotice && (
        <div className="tts-notice-banner" role="status">
          <span>ℹ️ {ttsNotice}</span>
          <button type="button" onClick={() => setTtsNotice('')}>
            Dismiss
          </button>
        </div>
      )}

      <main className="main-container">
        {/* HOME PAGE */}
        {activeMachine === 'home' && (
          <div className="home-view">
            {/* Hero Section */}
            <section className="hero-banner" aria-labelledby="hero-title">
              <div className="hero-badge-row">
                <span className="hero-pill">
                  🌱 Beginner-Friendly Touchscreen Practice
                </span>
                <span className="hero-pill" lang="ur" dir="rtl">
                  بزرگوں اور نئے سیکھنے والوں کے لیے آسان مشق
                </span>
              </div>

              <h1 id="hero-title" className="hero-title">
                Kiosk of Confidence
              </h1>

              {showEnglish && (
                <p className="hero-tagline">
                  Practice first. Use technology independently.
                </p>
              )}
              {showUrdu && (
                <p className="hero-tagline-urdu" lang="ur" dir="rtl">
                  پہلے مشق کریں۔ پھر خود اعتمادی کے ساتھ ٹیکنالوجی استعمال کریں۔
                </p>
              )}

              {showEnglish && (
                <p className="hero-explanation">
                  Feeling nervous in front of an ATM, train ticket kiosk, or fast-food touchscreen is completely normal. Here, you can practice at your own pace in a <strong>100% safe simulation</strong>. No real money, no bank cards, and no personal details are ever used — and making mistakes is the best way to learn!
                </p>
              )}
              {showUrdu && (
                <p className="hero-explanation-urdu" lang="ur" dir="rtl">
                  اے ٹی ایم، ٹکٹ مشین یا ریستوران کی ٹچ اسکرین استعمال کرتے وقت جھجھک محسوس کرنا ایک عام بات ہے۔ یہاں آپ بغیر کسی ڈر کے اپنی رفتار سے مشق کر سکتے ہیں۔ اس ویب سائٹ پر کوئی اصلی پیسہ یا ذاتی معلومات استعمال نہیں ہوتیں — اور غلطی کر کے اسے سدھارنا ہی سیکھنے کا بہترین طریقہ ہے!
                </p>
              )}

              {/* User Journey Visual Steps */}
              <div className="journey-strip" aria-label="How your practice journey works">
                <div className="journey-step">
                  <span className="journey-num">1</span>
                  <span>Select Machine</span>
                  {showUrdu && <small lang="ur">مشین منتخب کریں</small>}
                </div>
                <span className="journey-arrow" aria-hidden="true">➔</span>
                <div className="journey-step">
                  <span className="journey-num">2</span>
                  <span>Learn</span>
                  {showUrdu && <small lang="ur">سمجھیں</small>}
                </div>
                <span className="journey-arrow" aria-hidden="true">➔</span>
                <div className="journey-step">
                  <span className="journey-num">3</span>
                  <span>Practise</span>
                  {showUrdu && <small lang="ur">مشق کریں</small>}
                </div>
                <span className="journey-arrow" aria-hidden="true">➔</span>
                <div className="journey-step highlight">
                  <span className="journey-num">4</span>
                  <span>Make & Fix a Mistake</span>
                  {showUrdu && <small lang="ur">غلطی درست کریں</small>}
                </div>
                <span className="journey-arrow" aria-hidden="true">➔</span>
                <div className="journey-step">
                  <span className="journey-num">5</span>
                  <span>Complete Task!</span>
                  {showUrdu && <small lang="ur">مکمل کریں</small>}
                </div>
              </div>
            </section>

            {/* Optional Home Screen Help Drawer when "? Help" is clicked */}
            {isHelpOpen && (
              <section className="home-help-box" aria-label="How to use Kiosk of Confidence">
                <div className="home-help-header">
                  <h2>❓ How to Use This Website (مدد اور رہنمائی)</h2>
                  <button
                    type="button"
                    className="btn-secondary-small"
                    onClick={() => setIsHelpOpen(false)}
                  >
                    ✖ Close Help
                  </button>
                </div>
                <div className="home-help-grid">
                  <div className="home-help-item">
                    <strong>🟢 Start Practice Button</strong>
                    <p>
                      Opens the machine simulator with helpful step-by-step hints.
                    </p>
                    {showUrdu && (
                      <p lang="ur" dir="rtl">
                        مشین کی مشق کو مرحلہ وار اشاروں کے ساتھ کھولتا ہے۔
                      </p>
                    )}
                  </div>
                  <div className="home-help-item">
                    <strong>📖 Learn Mode</strong>
                    <p>
                      Explains what every single button on the screen means before you touch it.
                    </p>
                    {showUrdu && (
                      <p lang="ur" dir="rtl">
                        اسکرین کے ہر بٹن کا مطلب آسان الفاظ میں سمجھاتا ہے۔
                      </p>
                    )}
                  </div>
                  <div className="home-help-item">
                    <strong>🔊 Listen Button</strong>
                    <p>
                      Reads the instructions on the screen out loud using your device speaker.
                    </p>
                    {showUrdu && (
                      <p lang="ur" dir="rtl">
                        اسکرین پر لکھی ہدایات کو بلند آواز میں پڑھ کر سناتا ہے۔
                      </p>
                    )}
                  </div>
                  <div className="home-help-item">
                    <strong>🔍 Text Size & Language</strong>
                    <p>
                      Use the top bar anytime to make letters Extra Large (A+) or switch between English and Urdu.
                    </p>
                    {showUrdu && (
                      <p lang="ur" dir="rtl">
                        الفاظ کو بڑا کرنے یا اردو/انگریزی زبان بدلنے کے لیے اوپر والے بٹن استعمال کریں۔
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Three Practice Machine Cards */}
            <section className="machines-section" aria-label="Choose a practice machine">
              <div className="section-heading-row">
                {showEnglish && (
                  <h2>Choose a Machine to Start Practicing:</h2>
                )}
                {showUrdu && (
                  <h2 className="urdu-heading" lang="ur" dir="rtl">
                    مشق شروع کرنے کے لیے کوئی ایک مشین منتخب کریں:
                  </h2>
                )}
              </div>

              <div className="machines-grid">
                {PRACTICE_MACHINES.map((machine) => (
                  <MachineCard
                    key={machine.id}
                    machine={machine}
                    language={language}
                    onStartMachine={handleStartMachine}
                  />
                ))}
              </div>
            </section>

            {/* Reassurance Footer Section */}
            <section className="safety-promise-card" aria-label="Safety promise">
              <div className="safety-icon" aria-hidden="true">🛡️</div>
              <div>
                {showEnglish && (
                  <h3>Our Safety Promise to Learners</h3>
                )}
                {showEnglish && (
                  <p>
                    This website never asks for your name, phone number, bank account, or real card PIN. You cannot lose money or break anything here. Feel free to press every button, test what happens when you make a mistake, and practice as many times as you like!
                  </p>
                )}
                {showUrdu && (
                  <p className="urdu-text" lang="ur" dir="rtl">
                    <strong>حفاظتی وعدہ:</strong> یہ ویب سائٹ کبھی بھی آپ کا نام، فون نمبر، بینک اکاؤنٹ یا اصلی پن کوڈ نہیں مانگتی۔ یہاں آپ سے کوئی نقصان نہیں ہو سکتا۔ بے فکر ہو کر ہر بٹن دبائیں اور جتنی بار چاہیں مشق کریں!
                  </p>
                )}
              </div>
            </section>
          </div>
        )}

        {/* SIMULATOR 1: ATM */}
        {activeMachine === 'atm' && (
          <ATM
            learningMode={learningMode}
            language={language}
            isHelpOpen={isHelpOpen}
            onToggleHelp={() => setIsHelpOpen((prev) => !prev)}
            onGoHome={handleGoHome}
            onSelectLearningMode={(mode) => setLearningMode(mode)}
            onSpeakText={speakText}
            onUpdateScreenSpeech={setCurrentScreenSpeech}
          />
        )}

        {/* SIMULATOR 2: TICKET MACHINE */}
        {activeMachine === 'ticket' && (
          <TicketMachine
            learningMode={learningMode}
            language={language}
            isHelpOpen={isHelpOpen}
            onToggleHelp={() => setIsHelpOpen((prev) => !prev)}
            onGoHome={handleGoHome}
            onSelectLearningMode={(mode) => setLearningMode(mode)}
            onSpeakText={speakText}
            onUpdateScreenSpeech={setCurrentScreenSpeech}
          />
        )}

        {/* SIMULATOR 3: FOOD ORDERING MACHINE */}
        {activeMachine === 'food' && (
          <FoodMachine
            learningMode={learningMode}
            language={language}
            isHelpOpen={isHelpOpen}
            onToggleHelp={() => setIsHelpOpen((prev) => !prev)}
            onGoHome={handleGoHome}
            onSelectLearningMode={(mode) => setLearningMode(mode)}
            onSpeakText={speakText}
            onUpdateScreenSpeech={setCurrentScreenSpeech}
          />
        )}
      </main>

      <footer className="site-footer">
        <p>
          <strong>Kiosk of Confidence</strong> — Practice first. Use technology independently. • 100% Simulated Educational Prototype (No real transactions).
        </p>
      </footer>
    </div>
  )
}

