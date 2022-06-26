import React from 'react';
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  let deleteArticle = async (article) => {
    // make delete fetch to '/wishlist-article' with token and article with json encode
    let rawdata = await fetch(`/wishlist-article`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: props.user.token, article: article })
    });
    let data = await rawdata.json();
    if (data.error.length === 0) {
      // remove article from wishlist
      props.removeFromWishlist(article);
    } else {
      alert(data.error);
    }

  }

  let articles = props.wishlist.map(article => {
    return (
      <Card
        style={{
          width: 300,
          margin: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        cover={
          <img
            alt="example"
            src={article.urlToImage}
          />
        }
        actions={[
          <Icon type="read" key="ellipsis2" />,
          <Icon type="delete" key="ellipsis" onClick={() => deleteArticle(article)} />
        ]}
      >
        <Meta
          title={article.title}
          description={article.description}
        />
      </Card>
    )
  })

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {articles}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist,
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addToWishlist: function (article) {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: article });
    },
    removeFromWishlist: function (article) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: article });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
