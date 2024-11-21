import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ListItem from '../ListItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, list: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const responce = await fetch('https://apis.ccbp.in/te/courses')
    const data = await responce.json()
    const {courses} = data
    const updateValue = courses.map(eachItem => ({
      id: eachItem.id,
      logoUrl: eachItem.logo_url,
      name: eachItem.name,
    }))

    if (responce.ok) {
      this.setState({apiStatus: apiStatusConstants.success, list: updateValue})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {list} = this.state
    return (
      <ul className="course-list-container">
        {list.map(eachItem => (
          <ListItem key={eachItem.id} course={eachItem} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getCourses()
  }

  failureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  checkApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <h1>Courses</h1>
        {this.checkApiStatus()}
      </div>
    )
  }
}
export default Home
