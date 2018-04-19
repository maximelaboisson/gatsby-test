import React from 'react'
import Link from 'gatsby-link'
import styles from './product.module.css'
const NETLIFY_URL = 'https://snipcart-gatsby-grav.netlify.com'

export default ({data, location}) =>(
    <div>
        <h1>{data.markdownRemark.frontmatter.name}</h1>
        
        <div className={styles.breadcrumb}>
            <Link to='/products'>Back to the products</Link>
        </div>

        <section>
            <article>
                {data.markdownRemark.frontmatter.desc}
                <p>{data.markdownRemark.frontmatter.price}</p>
            </article>
        </section>
    </div>
)

export const query = graphql`
query productById($id: Int) {
    markdownRemark(frontmatter: { sku: { eq: $id } }) {
      html
      frontmatter {
        sku,
        loc,
        price,
        desc,
        private,
        name
      }
    }
  }
`