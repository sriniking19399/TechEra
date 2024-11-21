import {Link} from 'react-router-dom'
import './index.css'

const ListItem = props => {
  const {course} = props
  const {name, id, logoUrl} = course
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="course-item">
        <img alt={name} src={logoUrl} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default ListItem
