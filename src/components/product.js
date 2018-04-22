import React from 'react'
import Link from 'gatsby-link'
import styles from './product.module.css'
const NETLIFY_URL = 'https://gatsby-netlify-snipcart.netlify.com'

export default ({data, location}) =>(
    <div>
        <h1>{data.markdownRemark.frontmatter.name}</h1>
        
        <div className={styles.breadcrumb}>
            <Link to='/products'>Back to the products</Link>
        </div>

        <section>
            <figure className={styles.productFigure}>
                <img src={data.markdownRemark.frontmatter.image} />
            </figure>

            <article>
                {data.markdownRemark.frontmatter.description}
            </article>
            <div className={styles.actions}>
                <button type="button" className={`${styles.buyButton} snipcart-add-item`}
                    data-item-name={data.markdownRemark.frontmatter.name}
                    data-item-id={data.markdownRemark.frontmatter.sku}
                    data-item-image={data.markdownRemark.frontmatter.image}
                    data-item-url={`${NETLIFY_URL}${location.pathname}`}
                    data-item-price={data.markdownRemark.frontmatter.price}>
                    Buy it now for {data.markdownRemark.frontmatter.price}$
                </button>
            </div>
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