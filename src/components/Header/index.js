import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
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
    <div data-netlify-identity-menu></div>
    <div 
      data-netlify-identity-button           
      style={{
            color: 'white',
            textDecoration: 'none',
      }}>
        Login with Netlify Identity
      </div>
    </div>
  </div>
)

export default Header
