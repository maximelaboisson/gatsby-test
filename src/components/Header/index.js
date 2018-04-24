import React from 'react'
import Link from 'gatsby-link'
const netlifyIdentity = require("netlify-identity-widget");

export default class Header extends React.Component {  
  componentDidMount(){    
    netlifyIdentity.init({
      container: "#netlify-modal"
    });
  }
  
  render(){
    return (
    <div
      style={{
        background: 'rebeccapurple',
        marginBottom: '1.45rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          margin: '0 auto',
          maxWidth: '960px',
          padding: '1.45rem 1.0875rem',
          justifyContent: 'space-between'
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Gatsby
          </Link>
        </h1>
        <div id="netlify-modal"></div>
      </div>
    </div>)
  }
}
