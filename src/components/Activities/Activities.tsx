import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import type { Activity } from '../../types'
import './Activities.scss'

interface ActivitiesProps {
  activities: Activity[]
}

export const Activities = ({ activities }: ActivitiesProps) => {
  const { t } = useTranslation()

  return (
    <ul className="activities-list">
      {activities.map((activity) => (
        <li key={activity.id} className="activity-item">
          <FontAwesomeIcon icon={faBaby} />
          <div>
            <h3>{t(`activities.${activity.name.toLowerCase().replace(/\s+/g, '')}.name`)}</h3>
            <p>{t(`activities.${activity.name.toLowerCase().replace(/\s+/g, '')}.description`)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
} 