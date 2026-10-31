import React from 'react'

/**
 * MachineCard displays a large, accessible card on the Home page for each
 * practice simulator (ATM, Ticket Booking, Food Ordering).
 */
export default function MachineCard({
  machine,
  language,
  onStartMachine,
}) {
  const showEnglish = language === 'both' || language === 'en'
  const showUrdu = language === 'both' || language === 'ur'

  return (
    <article className={`machine-card machine-card-${machine.id}`}>
      <div className="machine-card-top">
        <div className="machine-icon-badge" aria-hidden="true">
          <span className="machine-emoji">{machine.icon}</span>
        </div>
        <span className="machine-tag">{machine.badge}</span>
      </div>

      <div className="machine-card-body">
        {showEnglish && <h2 className="machine-card-title">{machine.title}</h2>}
        {showUrdu && (
          <h3 className="machine-card-title-urdu" lang="ur" dir="rtl">
            {machine.titleUrdu}
          </h3>
        )}

        {showEnglish && (
          <p className="machine-card-description">{machine.description}</p>
        )}
        {showUrdu && (
          <p className="machine-card-description-urdu" lang="ur" dir="rtl">
            {machine.descriptionUrdu}
          </p>
        )}

        <div className="machine-skills-box">
          {showEnglish && (
            <p className="skills-heading">What you will practice:</p>
          )}
          {showUrdu && (
            <p className="skills-heading-urdu" lang="ur" dir="rtl">
              آپ کیا سیکھیں گے:
            </p>
          )}
          <ul className="machine-skills-list">
            {machine.skills.map((skill, index) => (
              <li key={index} className="machine-skill-item">
                <span className="skill-check" aria-hidden="true">✓</span>
                <div>
                  {showEnglish && <span>{skill.en}</span>}
                  {showUrdu && (
                    <span className="urdu-skill-line" lang="ur" dir="rtl">
                      {skill.ur}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="machine-card-actions">
        <button
          type="button"
          className="btn-primary start-practice-btn"
          onClick={() => onStartMachine(machine.id, 'practice')}
        >
          <span>Start Practice</span>
          {showUrdu && (
            <span className="btn-urdu-sub" lang="ur" dir="rtl">
              مشق شروع کریں ←
            </span>
          )}
        </button>

        <div className="secondary-mode-links">
          <button
            type="button"
            className="btn-secondary-small"
            onClick={() => onStartMachine(machine.id, 'learn')}
          >
            📖 Start in Learn Mode {showUrdu && <span lang="ur">• پہلے سیکھیں</span>}
          </button>
          <button
            type="button"
            className="btn-secondary-small"
            onClick={() => onStartMachine(machine.id, 'independent')}
          >
            ⭐ Try Without Hints {showUrdu && <span lang="ur">• خودکار مشق</span>}
          </button>
        </div>
      </div>
    </article>
  )
}

