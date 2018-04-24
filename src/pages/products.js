import React from 'react'
import Link from 'gatsby-link'
import styles from './products.module.css'

export default class Products extends React.Component {
    constructor(data){
        super(data);

        this.state = {
          products: []
        }
      }

    componentDidMount(){
        var products =  window.netlifyIdentity 
        && window.netlifyIdentity.currentUser() != null
            ? this.props.data.allMarkdownRemark.edges
            : this.props.data.allMarkdownRemark.edges
                .filter(x => !x.node.frontmatter.private)    

        this.setState({ products: products });
    }

    render(){
        return (
        <div>
            <h1>Products</h1>

            <ul className={styles.itemsList}>
                {this.state.products.map((o, index) =>
                    <li key={index} className={styles.item}>
                        <Link to={o.node.frontmatter.loc}>
                            <figure>
                                <img className={styles.image} src={o.node.frontmatter.image} alt={o.node.frontmatter.name}></img>
                                <figcaption className={styles.figCaption}>Buy the {o.node.frontmatter.name} now</figcaption>
                            </figure>
                        </Link>
                    </li>
                )}
            </ul>
        </div>)
    }
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
                    name,
                    image
                }
            }
        }
    }
}
`