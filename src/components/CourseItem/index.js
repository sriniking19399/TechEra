import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItem extends Component {
  state = {apiStatus: apiStatusConstants.initial, list: {}}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    const updateData = {
      id: data.course_details.id,
      description: data.course_details.description,
      imageUrl: data.course_details.image_url,
      name: data.course_details.name,
    }

    if (response.ok) {
      this.setState({list: updateData, apiStatus: apiStatusConstants.success})
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
    const {imageUrl, name, description} = list
    return (
      <div className="course-detail-container">
        <img alt={name} className="course-image" src={imageUrl} />
        <div className="course-success-detail">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
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
    return <div className="course-bg-container">{this.checkApiStatus()}</div>
  }
}
export default CourseItem
