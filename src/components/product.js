import React from 'react'
import Link from 'gatsby-link'
import styles from './product.module.css'
const NETLIFY_URL = 'gatsby-netlify-snipcart.netlify.com/.netlify/functions'

export default class Product extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            reviews: []
        }
    }

    componentDidMount(){
        fetch(`https://${NETLIFY_URL}/fetchreviews?id=${this.props.data.markdownRemark.frontmatter.sku}`)
            .then(x => x.json())
            .then(x => {
                this.setState({reviews: x})
            })
    }

    render(){
        var formId = `product-${this.props.data.markdownRemark.frontmatter.sku}`

        return (
        <div>
            <h1>{this.props.data.markdownRemark.frontmatter.name}</h1>
            <div className={styles.breadcrumb}>
                <Link to='/products'>Back to the products</Link>
            </div>
            <p>{this.props.data.markdownRemark.frontmatter.desc}</p>
    
            <section>
                <figure className={styles.productFigure}>
                    <img src={this.props.data.markdownRemark.frontmatter.image} />
                </figure>
    
                <article>
                    {this.props.data.markdownRemark.frontmatter.description}
                </article>
                <div className={styles.actions}>
                    <button type="button" className={`${styles.buyButton} snipcart-add-item`}
                        data-item-name={this.props.data.markdownRemark.frontmatter.name}
                        data-item-id={this.props.data.markdownRemark.frontmatter.sku}
                        data-item-image={this.props.data.markdownRemark.frontmatter.image}
                        data-item-url={`${NETLIFY_URL}${this.props.location.pathname}`}
                        data-item-price={this.props.data.markdownRemark.frontmatter.price}
                        data-item-description={this.props.data.markdownRemark.frontmatter.desc}>
                        Buy it now for {this.props.data.markdownRemark.frontmatter.price}$
                    </button>
                </div>
            </section>
            <section>
            <h3 className="reviews">Reviews</h3>
    
            <div className="reviews__list">
                {this.state.reviews.map((o) =>
                    <p key={o.number}><div className="review__name">{o.name}</div>: {o.data.message}</p>
                )}
            </div>

            <form className="review__form" name={formId} method="POST" data-netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="form-name" value={formId} />    
                <div className="field__form">
                    <label>NAME</label>
                    <input type="text" name="name"></input>
                </div>
                <div className="field__form">
                    <label>EMAIL</label>
                    <input type="email" name="email"></input>
                </div>
                <div className="field__form">
                    <label>MESSAGE</label>
                    <textarea name="message"></textarea>
                </div>

                <button className="button__form" type="submit">SEND</button>
            </form>
            </section>
        </div>)
    }
    
}

export const query = graphql`
query productById($sku: String) {
    markdownRemark(frontmatter: { sku: { eq: $sku } }) {
      html
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
`