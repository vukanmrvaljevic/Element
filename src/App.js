import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Titles from "./Components/Titles"
import Form from "./Components/Form"
import Weather from "./Components/Weather"
require("dotenv").config({ path: __dirname + ".env" })

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }
  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    try {
      if (city && country) {
        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
        )
        const weatherData = await api_call.json()
        this.setState({
          temperature: weatherData.main.temp,
          city: weatherData.name,
          country: weatherData.sys.country,
          humidity: weatherData.main.humidity,
          description: weatherData.weather[0].description,
          error: "",
        })
      } else {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the values.",
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({ error: "There was an error retrieving the weather" })
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-2 title-container">
                  <Titles />
                </div>
                <div className="col-xs-4 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
