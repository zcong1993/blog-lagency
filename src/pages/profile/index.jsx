import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import { siteMetadata } from '../../../gatsby-config'

class Profile extends React.Component {
  render() {
    const pathPrefix =
      process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__
    const title = 'Profile'
    return (
      <div>
        <Helmet
          title={`${title} | ${get(siteMetadata, 'title')}`}
          meta={[
            { name: 'twitter:card', content: 'summary' },
            {
              name: 'twitter:site',
              content: `@${get(siteMetadata, 'twitter')}`,
            },
            { property: 'og:title', content: title },
            { property: 'og:type', content: 'website' },
            {
              property: 'og:description',
              content: get(siteMetadata, 'description'),
            },
            {
              property: 'og:url',
              content: `${get(siteMetadata, 'siteUrl')}/profile`,
            },
            {
              property: 'og:image',
              content: `${get(siteMetadata, 'siteUrl')}/img/profile.jpg`,
            },
          ]}
        />
        <section className="text-center">
          <div className="container">
            <img
              src={pathPrefix + '/img/profile.jpg'}
              alt="zcong1993"
              className="rounded-circle mx-auto d-block"
              width="120px"
            />
            <h1>zcong1993</h1>
            <p className="lead text-muted">沉迷编程</p>
            <div>
              <a
                ref="twButton"
                href="https://twitter.com/CongZhangDev"
                className="twitter-follow-button"
                data-show-count="false"
              >
                Follow @CongZhangDev
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="bg-primary text-white text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-heading">SKILLS</h2>
                <hr className="border-white" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="JavaScript"
                >
                  <i
                    className="devicon-javascript-plain"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Node.js"
                >
                  <i
                    className="devicon-nodejs-plain-wordmark"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="React.js"
                >
                  <i
                    className="devicon-react-original"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Vue.js"
                >
                  <i className="devicon-vuejs-plain" data-emergence="hidden" />
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Docker"
                >
                  <i className="devicon-docker-plain" data-emergence="hidden" />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Express"
                >
                  <i
                    className="devicon-express-original"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Git"
                >
                  <i className="devicon-git-plain" data-emergence="hidden" />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Golang"
                >
                  <i className="devicon-go-plain" data-emergence="hidden" />
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Laravel"
                >
                  <i
                    className="devicon-laravel-plain"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Linux"
                >
                  <i className="devicon-linux-plain" data-emergence="hidden" />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Mongodb"
                >
                  <i
                    className="devicon-mongodb-plain"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="MySQL"
                >
                  <i
                    className="devicon-mysql-plain-wordmark"
                    data-emergence="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-lg-3 col-6">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Nginx"
                >
                  <i
                    className="devicon-nginx-original"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="PHP"
                >
                  <i className="devicon-php-plain" data-emergence="hidden" />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Webpack"
                >
                  <i
                    className="devicon-webpack-plain"
                    data-emergence="hidden"
                  />
                </div>
              </div>
              <div className="col-lg-3 col-6 ">
                <div
                  className="service-box"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="TypeScript"
                >
                  <i
                    className="devicon-typescript-plain"
                    data-emergence="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-heading">Features</h2>
                <hr className="border-primary" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-lg-8">
                <p>
                  西安交大学渣一枚, 半路出家 PHP。<br />
                  学了学 Node.js , 也算半个不会 css 的前端。<br />
                  Golang 萌新一个。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="bg-primary text-white text-center color-inverse"
          id="concept"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="section-heading">WORKS</h2>
                <hr className="border-white" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 slide-left" data-emergence="hidden">
                <img
                  src={pathPrefix + '/img/work1.png'}
                  alt="work1"
                  className="rounded-circle mx-auto"
                />
                <p>Yomu</p>
              </div>
              <div className="col-md-6 slide-right" data-emergence="hidden">
                <img
                  src={pathPrefix + '/img/work2.png'}
                  alt="work2"
                  className="rounded-circle mx-auto"
                />
                <p>Detector</p>
              </div>
            </div>
          </div>
        </section>

        <section id="repos">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center">
                <h2 className="section-heading">Repositories</h2>
              </div>
              <div className="col-md-6 text-left">
                <li>
                  <a href="https://github.com/gost-c/gost">gost</a>
                </li>
                <li>
                  <a href="https://github.com/gost-c/gost-cli">gost-cli</a>
                </li>
                <li>
                  <a href="https://github.com/zcong1993/neutrino-middleware-styles-loader">
                    neutrino-middleware-styles-loader
                  </a>
                </li>
                <li>
                  <a href="https://github.com/zcong1993/template-react">
                    template-react
                  </a>
                </li>
              </div>
            </div>
          </div>
        </section>
        <section id="features">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  src={pathPrefix + '/img/work3.png'}
                  className="img-rounded img-responsive"
                  title=""
                  alt=""
                />
              </div>
              <div className="col-md-6 text-center align-middle">
                <h2 className="section-heading">Github</h2>
                <p>
                  <a
                    href="https://github.com/zcong1993"
                    target="_blank"
                    rel="noopener"
                  >
                    https://github.com/zcong1993
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Profile
