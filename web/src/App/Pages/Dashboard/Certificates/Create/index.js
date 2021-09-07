import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import PropTypes from 'prop-types'
import {Field} from 'simple-react-form'
import Select from 'orionsoft-parts/lib/components/fields/Select'
import Domains from './Domains'
import Button from 'orionsoft-parts/lib/components/Button'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Content from 'App/components/Content'
import Breadcrumbs from 'App/components/Breadcrumbs'

const validationMethods = [{label: 'Email', value: 'EMAIL'}, {label: 'DNS', value: 'DNS'}]

@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object
  }

  @autobind
  onSuccess(certificate) {
    const {credentialId, region} = this.props.match.params
    this.props.showMessage('The certificate was created, now you must validate it')
    this.props.history.push(
      `/dashboard/certificates/${credentialId}/${region}/${encodeURIComponent(certificate._id)}`
    )
  }

  render() {
    const {credentialId, region} = this.props.match.params
    const listPath = `/dashboard/certificates/${credentialId}/${region}`
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/dashboard/certificates': 'Certificates', [listPath]: 'List'}}>
          Create
        </Breadcrumbs>
        <div className="divider" />
        <Content>
          <Section
            top
            title="Create certificate"
            description="Request a public certificate from Amazon. You can use this certificates to add https functionality to your apps">
            <AutoForm
              ref="form"
              mutation="createCertificate"
              doc={{credentialId, region}}
              onSuccess={this.onSuccess}>
              <div className="label">Domains</div>
              <Field fieldName="domains" type={Domains} />
              <div className="description">
                Type the fully qualified domain name of the site you want to secure with an SSL/TLS
                certificate (for example, www.example.com). Use an asterisk (*) to request a
                wildcard certificate to protect several sites in the same domain. For example:
                *.example.com protects www.example.com, site.example.com and images.example.com.
              </div>
              <div className="label">Validation method</div>
              <Field fieldName="validationMethod" type={Select} options={validationMethods} />
              <div className="description">
                if you have or can obtain permission to modify the DNS configuration for the domains
                in your certificate request select DNS. If not, choose Email
              </div>
            </AutoForm>
            <br />
            <Button to={listPath} style={{marginRight: 10}}>
              Cancel
            </Button>
            <Button primary onClick={() => this.refs.form.submit()}>
              Create certificate
            </Button>
          </Section>
        </Content>
      </div>
    )
  }
}
