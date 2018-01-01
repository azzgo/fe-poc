import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript'

import { demoAction } from 'src/actions/demoAction'
import { Header } from 'src/shared/components/Header';
import { Footer } from 'src/shared/components/Footer';

interface IOwnProps {
}

interface IState {
}

const mapStateToProps = (state: IStoreState) => ({
  demoCount: state.demo,
})

const mapStateToPropsType = returntypeof(mapStateToProps)

type IStateToPropsType = typeof mapStateToPropsType

const mapDispatchToProps = {
  demoAction,
}

type IDispatchToPropsType = typeof mapDispatchToProps

@(connect(mapStateToProps, mapDispatchToProps) as InferableConnectType<IStateToPropsType, IDispatchToPropsType, IOwnProps>)
export class HomePage extends PureComponent<IOwnProps & IStateToPropsType & IDispatchToPropsType, IState> {
  render() {
    const { demoCount, demoAction } = this.props

    return (
      <React.Fragment>
        <Header />
        <section id="banner">
          <div className="inner">
            <header>
              <h1>Welcome to Projection</h1>
            </header>

            <div className="flex ">

              <div>
                <span className="icon fa-car"></span>
                <h3>Aliquam</h3>
                <p>Suspendisse amet ullamco</p>
              </div>

              <div>
                <span className="icon fa-camera"></span>
                <h3>Elementum</h3>
                <p>Class aptent taciti ad litora</p>
              </div>

              <div>
                <span className="icon fa-bug"></span>
                <h3>Ultrices</h3>
                <p>Nulla vitae mauris non felis</p>
              </div>

            </div>

            <footer>
              <a href="#" className="button">Get Started</a>
            </footer>
          </div>
        </section>

        <section id="three" className="wrapper align-center">
          <div className="inner">
            <div className="flex flex-2">
              <article>
                <div className="image round">
                  <img src="src/assets/images/pic01.jpg" alt="Pic 01" />
                </div>
                <header>
                  <h3>Lorem ipsum<br /> dolor amet nullam</h3>
                </header>
                <p>Morbi in sem quis dui placerat ornare. Pellentesquenisi<br />euismod in, pharetra a, ultricies in diam sed arcu. Cras<br />consequat  egestas augue vulputate.</p>
                <footer>
                  <a href="#" className="button">Learn More</a>
                </footer>
              </article>
              <article>
                <div className="image round">
                  <img src="src/assets/images/pic02.jpg" alt="Pic 02" />
                </div>
                <header>
                  <h3>Sed feugiat<br /> tempus adipicsing</h3>
                </header>
                <p>Pellentesque fermentum dolor. Aliquam quam lectus<br />facilisis auctor, ultrices ut, elementum vulputate, nunc<br /> blandit ellenste egestagus commodo.</p>
                <footer>
                  <a href="#" className="button">Learn More</a>
                </footer>
              </article>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}
