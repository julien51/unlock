import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../components/interface/Layout'
import Signature from '../components/interface/Signature'
import {
  Section,
  Title,
  Headline,
  Column,
  TwoColumns,
  Columns,
} from '../components/Components'
import { pageTitle } from '../constants'
import { listenForNewLocks } from '../paywall-builder/mutationobserver'
import buildPaywall from '../paywall-builder/build'

export class Mutations extends Component {
  static propTypes = {
    plain: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.num = 0
    this.addMeta = () => {
      if (++this.num < 1000) {
        setTimeout(this.addMeta, 1)
      }
      const el = document.createElement('meta')
      el.setAttribute('name', `meta${this.num}`)
      el.setAttribute('content', `hi ${this.num}`)
      document.head.appendChild(el)
    }
  }

  componentDidMount() {
    const { plain } = this.props

    if (!plain) {
      listenForNewLocks(
        lock => buildPaywall(window, document, lock),
        document.head
      )
    }
    setTimeout(this.addMeta)
  }

  render() {
    return (
      <Layout forContent>
        <Head>
          <title>{pageTitle('Mutations')}</title>
        </Head>
        <Section>
          <Title>Testing Mutations speed</Title>
          <Headline>
            We’re a small, smart and nimble team of coders and designers with a
            vision for a better and fairer way to monetize content.
          </Headline>
          <TwoColumns>
            <Column>
              At Unlock, we believe the web needs a new business model. We
              believe the decentralization promise of the web cannot be achieved
              if economic incentives are not aligned between consumers and
              creators.
              <br />
              <br />
              For this, we&#39;re building a protocol which lets anyone restrict
              access to their work and for consumers to earn points when they
              discover and promote the best creations.
            </Column>
            <Column>
              The Unlock Protocol can be applied to publishing (paywalls),
              newsletters, software licenses or even the physical world, such as
              transportation systems. The web revolutionized all of these areas
              - Unlock will make them economically viable.
            </Column>
          </TwoColumns>
        </Section>
        <Section>
          <Title>Team</Title>
          <Columns>Spoople</Columns>
        </Section>
        <Section>
          <Title>News</Title>
          <News>Newsle</News>
        </Section>
        <Signature />
      </Layout>
    )
  }
}

export default connect(state => ({
  plain:
    !state.router.location.search ||
    !state.router.location.search.match(/observe/),
  router: state.router.location,
}))(Mutations)

const News = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 16px;
  font-family: 'IBM Plex Serif', serif;
  font-weight: 300;
  fonts-size: 22px;
  line-height: 1.5;
  color: var(--darkgrey);
`
