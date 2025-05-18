import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBaby, 
  faWandMagicSparkles, 
  faShirt, 
  faBrain, 
  faMagnifyingGlass,
  faCross,
  faGhost
} from '@fortawesome/free-solid-svg-icons'
import './Careers.scss'

const positionIcons = {
  doll_whisperer: faWandMagicSparkles,
  hair_stylist: faBaby,
  fashion_consultant: faShirt,
  doll_therapist: faBrain,
  toy_archaeologist: faMagnifyingGlass,
  doll_exorcist: faCross,
  entity_summoner: faGhost
}

export const Careers = () => {
  const { t } = useTranslation()

  return (
    <section className="careers-section">
      <h2>{t('careers.title')}</h2>
      <h3>{t('careers.subtitle')}</h3>
      <p>{t('careers.description')}</p>
      
      <div className="careers-grid">
        {Object.entries(positionIcons).map(([key, icon]) => (
          <div key={key} className="career-card">
            <FontAwesomeIcon icon={icon} className="career-icon" />
            <h4>{t(`careers.positions.${key}.title`)}</h4>
            <p>{t(`careers.positions.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
} 