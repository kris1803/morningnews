import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { List, Avatar } from 'antd';
import Nav from '../../components/Nav';
import '../../App.css';
import styles from './source.module.css';

//import ukraineImg from './img/icons8-ukraine-96.png';

const NEWSAPI_KEY = '3ab465eb2e554f95a1d0f2ac998f1750';

function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {

    let getNews = async () => {
      try {
      let country = 'fr';
      let rawdata = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWSAPI_KEY}&country=${country}`);
      if (!rawdata.ok) {
        alert('Something went wrong. Server connection problem.');
        return;
      }
      let data = await rawdata.json();
      setSourceList(data.sources);
      } catch (err) {
        console.log(err);
        alert('An error occured. Please try again later.');
      }
      //console.log(data.sources);
    }
    getNews();
    
  }, []);

  let handleFlagClick = (country) => {
    let getNews = async () => {
      let rawdata = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey='+NEWSAPI_KEY+'&country=' + country);
      let data = await rawdata.json();
      setSourceList(data.sources);
      //console.log(data.sources);
    }
    getNews();
  }

  return (
    <div>
      <Nav />

      <div className="Banner" >
        <img src={'/images/icons8-france-96.png'} className={styles['banner-flag']} alt='FR flag' onClick={() => handleFlagClick('fr')} />
        <img alt='GB flag' src={'/images/icons8-great-britain-96.png'} className={styles['banner-flag']} onClick={() => handleFlagClick('gb')} />
        {/*<img alt='Ukr flag' src={ukraineImg} style={{height: '80%'}} onClick={() => handleFlagClick('ua')} /> */}
      </div>
      <div className="HomeThemes">

        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta           
                avatar={<Avatar src={ 'images/general.png' } />}
                title={<Link to={ '/articles-by-source/'+item.id }>{item.name}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />

      </div>
    </div>
  );
}

export default ScreenSource;
