import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hi folks!</h1>

    <p>Welcome to our Netlify powered store</p>

    <Link to="/products">See our products!</Link>
  </div>
)

export default IndexPage
