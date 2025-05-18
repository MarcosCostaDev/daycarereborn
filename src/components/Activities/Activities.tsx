import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../contexts/ThemeContext'
import type { Activity } from '../../types'

const ActivitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`

const ActivityItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  
  svg {
    color: var(--baby-pink);
  }
`

interface ActivitiesProps {
  activities: Activity[]
}

export const Activities = ({ activities }: ActivitiesProps) => {
  const { t } = useTranslation()

  return (
    <ActivitiesList>
      {activities.map((activity) => (
        <ActivityItem key={activity.id}>
          <FontAwesomeIcon icon={faBaby} />
          <div>
            <h3>{t(`activities.${activity.name.toLowerCase().replace(/\s+/g, '')}.name`)}</h3>
            <p>{t(`activities.${activity.name.toLowerCase().replace(/\s+/g, '')}.description`)}</p>
          </div>
        </ActivityItem>
      ))}
    </ActivitiesList>
  )
} 