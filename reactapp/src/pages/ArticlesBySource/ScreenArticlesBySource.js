import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { ReadOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import { Card } from 'antd';
import Nav from '../../components/Nav'
import { connect } from 'react-redux';


const { Meta } = Card;

function ScreenArticlesBySource(props) {
  let { id } = useParams();
  const [articleList, setArticleList] = useState([]);

  let likeArticle = useCallback(async (article) => {
    // look if article is in props.wishlist
    let index = props.wishlist.findIndex(wishlistArticle => wishlistArticle.title === article.title);
    if (index === -1) {
      // send article to backend
      let rawdata = await fetch(`/wishlist-article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: props.user.token, article: article })
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
        body: JSON.stringify({ token: props.user.token, article: article })
      });
      let data = await rawdata.json();
      if (data.success) {
        // remove article from wishlist
        props.removeFromWishlist(article);
      } else {
        alert(data.error);
      }
    }
  }, [props])

  useEffect(() => {
    let getNews = async () => {
      try {
        let rawdata = await fetch(`/news/top-headlines?source=${id}`);
        let response = await rawdata.json();
        let data = response.data
        if (!data.articles || data.articles.length === 0) {
          console.log(data)
          alert('No articles found');
          return;
        }
        let Cards = data.articles.map((article, i) => {
          // check if article is in wishlist
          let index = props.wishlist.findIndex(wishlistArticle => wishlistArticle.title === article.title);
          let likeIcon;
          if (index === -1) {
            likeIcon = <LikeOutlined key='likeIcon' onClick={() => likeArticle(article)} />;
          } else {
            likeIcon = <LikeFilled key='likeIcon' onClick={() => likeArticle(article)} />;
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
              key={i}
              cover={
                <img
                  alt={article.title}
                  src={article.urlToImage}
                />
              }
              actions={[
                <ReadOutlined key="ellipsis2" />,
                likeIcon
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
      } catch (err) {
        console.log(err);
        alert('Server connection error.')
      }
    }
    getNews();
  }, [id, likeArticle, props.wishlist]);

  if (!props.user.username) {
    return (
      <Navigate to={'/'} replace={true} />
    )
  }

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
