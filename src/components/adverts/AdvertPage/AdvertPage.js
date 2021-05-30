import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import noPhoto from '../../../assets/notimage.png';
import { getUi, getAdvertDetailState } from '../../../store/selectors';
import { advertsDetailAction, advertsDeleteAction } from '../../../store/actions';
import { Redirect } from 'react-router-dom';
import { Confirmation } from '../../shared';

import './AdvertPage.css';

const URLIMG = process.env.REACT_APP_API_BASE_URL; 

export class AdvertPage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
      // advert: null,
      // error: null,
    // };
    //this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // handleClick() {
  //   const { match } = this.props;
  //   const res = window.confirm("Confirme que desea borrar el anuncio");
  //   if (res) {  
  //      deleteAdvert(match.params.advertId)
  //        .then(advert => {
  //          this.setState({ advert })
  //          this.props.history.push('/adverts')
  //       })
  //       .catch(error => this.setState({ error }));   
  //   }
  // };

  componentDidMount() {
     // onLoad nos llega como props al componente
     const { match, onLoad } = this.props;
     onLoad(match.params.advertId);
 
    //  const { match } = this.props;
    //  console.log('match.params.advertId', match.params.advertId);
    //  getAdvertDetail(match.params.advertId)
    //    .then(advert => this.setState({ advert }))
    //    .catch(error => this.setState({ error }));
   }

  handleDelete = () => {  
     const { match, onDelete } = this.props;
    //onDelete(match.params.advertId).then(() => this.props.history.push('/adverts'));
    onDelete(match.params.advertId);
        // deleteAdvert(match.params.advertId)
        //   .then(advert => {
        //     this.setState({ advert })
        //     this.props.history.push('/adverts')
        //  })
        //  .catch(error => this.setState({ error }));    
  };

  //  componentWillUnmount() {
  //    const { advert, error } = this.state;
  //    if (advert === undefined && error.status === 404 ) {
  //      this.props.history.push('/adverts');
  //    }
  //  }

  render() {
    //const { advert, error } = this.state;
    const { advert, error, loading } = this.props;
    
    if (error && error.status === 404) {
      return <Redirect to="/404" />;
    }

    if (advert) {
      
      return (
        
        <Layout title="Detalle Anuncio" {...this.props}>
          
          { loading && <div>Loading advert detail...</div>}
          
          <div className ="detail-advert">
        
            <div className="details-advert" key={advert.id}>
              <div className="big-img-advert">
                
                <img src={advert.photo ? URLIMG + advert.photo : noPhoto} alt="Imagen del anuncio" />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{advert.name}</h2>
                  <span><h2>{advert.price}€</h2></span>
                </div>
                <p>Anuncio de {advert.sale ? 'venta' : 'compra'}</p>
                <p>Tags: {'#'+advert.tags.join(', #')}</p>
                
                <time dateTime={advert.createdAt} className="advert-creation">
                    {formatDistanceToNow(new Date(advert.createdAt))}
                </time>
                <span className="advert-separator">·</span>
                <span><time dateTime={advert.createdAt}> Fecha Creación: {advert.createdAt.split("T")[0]}</time></span>
                <br />
              
                {/* <Button className="cart" variant="primary" onClick={this.handleClick}>Borrar Anuncio</Button> */}
                <Confirmation className="cart" variant="primary" message="Confirme que desea borrar el anuncio" onConfirm={this.handleDelete}>
                Borrar Anuncio
                </Confirmation>

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

//const mapStateToProps = (state, ownProps) => ( console.log('mapStateToProps', ownProps) || {
const mapStateToProps = (state, ownProps) =>  ({
  advert: getAdvertDetailState(state, ownProps.match.params.advertId),
  ...getUi(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoad: advertId => dispatch(advertsDetailAction(advertId)),
  //onLoad: () => dispatch(advertsDetailAction(ownProps.match.params.advertId)),
  onDelete: advertId => dispatch(advertsDeleteAction(advertId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvertPage);
