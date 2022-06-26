import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  let { id } = useParams();
  const [articleList, setArticleList] = useState([]);

  let likeArticle = async (article) => {
    // look if article is in props.wishlist
    let index = props.wishlist.findIndex(wishlistArticle => wishlistArticle.title === article.title);
    if (index === -1) {
      // send article to backend
      let rawdata = await fetch(`/wishlist-article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: props.user.token, article:article })
      });
      let data = await rawdata.json();
      if (data.success) {
        // add article to wishlist
        props.addToWishlist(article);
      } else {
        alert(data.error);
      }
    } else {
      // remove article from wishlist
      let rawdata = await fetch(`/wishlist-article`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: props.user.token, article:article })
      });
      let data = await rawdata.json();
      if (data.success) {
        // remove article from wishlist
        props.removeFromWishlist(article);
      } else {
        alert(data.error);
      }
     }
  }

  useEffect(() => {
    let getNews = async () => {
      let rawdata = await fetch('https://newsapi.org/v2/top-headlines?sources=' + id + '&apiKey=3ab465eb2e554f95a1d0f2ac998f1750');
      let data = await rawdata.json();
      let Cards = data.articles.map(article => {
        // check if article is in wishlist
        let index = props.wishlist.findIndex(wishlistArticle => wishlistArticle.title === article.title);
        let theme = ''
        if (index === -1) {
          theme = 'outlined';
        } else {
          theme = 'filled';
        }
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
                alt={article.title}
                src={article.urlToImage}
              />
            }
            actions={[
              <Icon type="read" key="ellipsis2" />,
              <Icon type="like" key="ellipsis" theme={theme} onClick={() => likeArticle(article)} />
            ]}
          >
            <Meta
              title={<a href={article.url} target='_blank' rel='noopener noreferrer'>{article.title}</a>}
              description={article.description}
            />
          </Card>
        );
      })
      setArticleList(Cards);
    }
    getNews();
  });

  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articleList}
      </div>
    </div>
  );
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
function mapStateToProps(state) {
  return {
    wishlist: state.wishlist,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenArticlesBySource);
