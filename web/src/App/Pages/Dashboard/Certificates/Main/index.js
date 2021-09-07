import React from 'react'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Content from 'App/components/Content'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import {Form, Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import Section from 'App/components/Section'
import Button from 'orionsoft-parts/lib/components/Button'

@withGraphQL(
  gql`
    query getCertificateIndexOptions {
      credentials {
        value: _id
        label: name
      }
      regions {
        value: code
        label: name
      }
    }
  `,
  {loading: null}
)
export default class Main extends React.Component {
  static propTypes = {
    credentials: PropTypes.array,
    regions: PropTypes.array
  }

  state = {}

  getPath() {
    const {credentialId, region} = this.state
    if (!credentialId || !region) return
    return `/dashboard/certificates/${credentialId}/${region}`
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs>Certificates</Breadcrumbs>
        <div className="divider" />
        <Content>
          <Section
            title="View my SSL certificates"
            top
            description="To view your certificates please select a credential and a region">
            <Form state={this.state} onChange={changes => this.setState(changes)}>
              <div>
                <b>Select a credential and a region</b>
              </div>
              <br />
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="label">Credential</div>
                  <Field
                    fieldName="credentialId"
                    placeholder="Select credential"
                    type={Select}
                    options={this.props.credentials}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="label">Region</div>
                  <Field
                    fieldName="region"
                    placeholder="Select region"
                    type={Select}
                    options={this.props.regions}
                  />
                </div>
              </div>
              <br />
              <Button primary to={this.getPath()} disabled={!this.getPath()}>
                View
              </Button>
            </Form>
          </Section>
        </Content>
      </div>
    )
  }
}
