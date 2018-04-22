import React from 'react'
import Link from 'gatsby-link'
import styles from './products.module.css'

export default ({data}) => {
    var products = netlifyIdentity.currentUser() == null
        ? data.allMarkdownRemark.edges
            .filter(x => !x.node.frontmatter.private)
        : data.allMarkdownRemark.edges

    return (
        <div>
            <h1>Products</h1>

            <ul className={styles.itemsList}>
                {products.map((o, index) =>
                    <li key={index} className={styles.item}>
                        <Link to={o.node.frontmatter.loc}>
                            <figure>
                                <img className={styles.image} src={o.node.image} alt={o.node.name}></img>
                                <figcaption className={styles.figCaption}>Buy the {o.node.name} now</figcaption>
                            </figure>
                        </Link>
                    </li>
                )}
            </ul>
        </div>)
}

export const query = graphql`
query allProducts {
    allMarkdownRemark {
        edges {
            node {
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
    }
}
`