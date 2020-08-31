/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './IframePreview.css'
import axios from 'axios';

const assembleProjectUrl = ({displayed, options}) => {
  const {slug} = displayed
  const {previewURL} = options
  if (!slug || !previewURL) {
    console.warn('Missing slug or previewURL', {slug, previewURL})
    return ''
  }
  return `${previewURL}/${slug.current}`
}

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    document: null
  }

  state = {
    isLoading: true,
    url: '',
    error: false,
  };

  componentDidMount() {
    console.log('hello pows');
    axios.post(
      'https://yskeo5mgc0.execute-api.us-west-2.amazonaws.com/dev/startSandbox',
      {
        sanity: {
          id: 'rkoi68m8',
          token: 'sk2scnVVmBBJyntFgRPcNilEv4gUduZCIhim9AaB89YVprkOEvEvquhX7fIkeGlCSdKFEzP95DczQ8St5ZCfvpLrv3MR0AcAxx6ZRPwhiDmeXQLda250PlX436BNvyyeSWStjmU32cT9OoOoC4dHxhr2mbiJG3pp7sdwxh7AyTMIcBNTUYxP'
        }
      }
    ).then( (response) => {
      console.log('response', response);
      this.setState({
        isLoading: false,
        url: response.data.url,
        error: false
      });
    }).catch( (e) => {
      console.log('e', e);
      this.setState({
        isLoading: false,
        url: '',
        error: e
      });
    })
  }

  render () {
    const { isLoading, url, error } = this.state;

    if(error) {
      return <div>Error</div>  
    }

    console.log('error', error);
    console.log('url', url);
    console.log('isLoading', isLoading);
    if(isLoading) {
      return <div>Loading...</div>
    } else {
      return (
        <div className={styles.componentWrapper}>
          <div className={styles.iframeContainer}>
            <iframe src={url} frameBorder={'0'} />
          </div>
        </div>
      )
    }
  }
}

export default IframePreview
