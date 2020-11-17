import './App.css'
import React from 'react'
import BallWorld from './BallWorld'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let ballWorld = new BallWorld(["hi"])

    ballWorld.init()
  }

  render() {
    return <canvas id="canvas"></canvas>
  }
}
