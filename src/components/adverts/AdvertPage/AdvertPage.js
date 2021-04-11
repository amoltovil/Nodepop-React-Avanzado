import React from 'react';
import Layout from '../../layout/Layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import noPhoto from '../../../assets/notimage.png';
import { Button } from '../../shared';
import { getAdvertDetail, deleteAdvert } from '../../../api/adverts';
import { Redirect } from 'react-router-dom';

import './AdvertPage.css';

const URLIMG = process.env.REACT_APP_API_BASE_URL; 

class AdvertPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advert: null,
      error: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    
    const { match } = this.props;
    const res = window.confirm("Confirme que desea borrar el anuncio");
    if (res) {  
       deleteAdvert(match.params.advertId)
         .then(advert => {
           this.setState({ advert })
           this.props.history.push('/adverts')
        })
        .catch(error => this.setState({ error }));   
    }
   
  };

  componentDidMount() {
    const { match } = this.props;
    getAdvertDetail(match.params.advertId)
      .then(advert => this.setState({ advert }))
      .catch(error => this.setState({ error }));
  }


   componentWillUnmount() {
     
     const { advert, error } = this.state;

     if (advert === undefined && error.status === 404  ) {
     
       this.props.history.push('/adverts');
       
     }
    
   }

  render() {
    const { advert, error } = this.state;
    
    if (error && error.status === 404) {
      return <Redirect to="/404" />;
    }

    if (this.state.advert) {
      
      return (
        <Layout title="Detalle Anuncio" {...this.props}>
        
          <div className ="detail-advert">
        
            <div className="details-advert" key={this.state.advert.id}>
              <div className="big-img-advert">
                
                <img src={this.state.advert.photo ? URLIMG + this.state.advert.photo : noPhoto} alt="Imagen del anuncio" />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{this.state.advert.name}</h2>
                  <span><h2>{this.state.advert.price}€</h2></span>
                </div>
                <p>Anuncio de {this.state.advert.sale ? 'venta' : 'compra'}</p>
                <p>Tags: {'#'+this.state.advert.tags.join(', #')}</p>
                
                <time dateTime={this.state.advert.createdAt} className="advert-creation">
                    {formatDistanceToNow(new Date(this.state.advert.createdAt))}
                </time>
                <span className="advert-separator">·</span>
                <span><time dateTime={this.state.advert.createdAt}> Fecha Creación: {this.state.advert.createdAt.split("T")[0]}</time></span>
                <br />
              
                <Button className="cart" variant="primary" onClick={this.handleClick}>Borrar Anuncio</Button>

              </div>
            </div>
          </div>
        </Layout>
      );
     }
    else {
       return (
         <Layout title="Advert Detail" {...this.props}>
           <div>Anuncio no encontrado</div>
         </Layout>
       );
    }
  }
}

export default AdvertPage;
