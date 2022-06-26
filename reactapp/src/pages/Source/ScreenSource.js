import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { List, Avatar } from 'antd';
import Nav from '../../components/Nav';
import '../../App.css';
import styles from './source.module.css';


function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {

    let getNews = async () => {
      try {
      let country = 'fr';
      let rawdata = await fetch(`/news/by-country?country=${country}`);
      if (!rawdata.ok) {
        alert('Something went wrong. Server connection problem.');
        return;
      }
      let data = await rawdata.json();
      if (!data.sources || data.sources.length < 1) {
        alert('Something went wrong. When obtaining news.');
        return;
      }
      setSourceList(data.sources);
      } catch (err) {
        console.log(err);
        alert('An error occured. Please try again later.');
      }
    }
    getNews();
    
  }, []);

  let handleFlagClick = (country) => {
    let getNews = async () => {
      try {
      let rawdata = await fetch('/news/by-country?country=' + country);
      if (!rawdata.ok) {
        alert('Something went wrong. Server connection problem.');
        return;
      }
      let data = await rawdata.json();
      if (!data.sources || data.sources.length < 1) {
        alert('Something went wrong. When obtaining news.');
        return;
      }
      setSourceList(data.sources);
      } catch (err) {
        console.log(err);
        alert('An error occured when connecting to server. Please try again later.');
      }
    }
    getNews();
  }

  return (
    <div>
      <Nav />

      <div className={styles['Banner']} >
        <img src={'/images/icons8-france-96.png'} className={styles['banner-flag']} alt='FR flag' onClick={() => handleFlagClick('fr')} />
        <img alt='GB flag' src={'/images/icons8-great-britain-96.png'} className={styles['banner-flag']} onClick={() => handleFlagClick('gb')} />
      </div>
      <div className={styles["HomeThemes"]} >

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
