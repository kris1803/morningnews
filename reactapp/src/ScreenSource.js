import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import franceImg from './img/icons8-france-96.png';
import gbImg from './img/icons8-great-britain-96.png';
//import ukraineImg from './img/icons8-ukraine-96.png';


function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {

    let getNews = async () => {
      let rawdata = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=3ab465eb2e554f95a1d0f2ac998f1750&country=fr');
      let data = await rawdata.json();
      setSourceList(data.sources);
      console.log(data.sources);
    }
    getNews();
    
  }, []);

  let handleFlagClick = (country) => {
    let getNews = async () => {
      let rawdata = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=16f56ca733924bb6a0e667f077c5cb18&country=' + country);
      let data = await rawdata.json();
      setSourceList(data.sources);
      console.log(data.sources);
    }
    getNews();
  }

  return (
    <div>
      <Nav />

      <div className="Banner" >
        <img src={franceImg} alt='France flag' style={{height: "80%"}} onClick={() => handleFlagClick('fr')} />
        <img alt='GB flag' src={gbImg} style={{height: "80%"}} onClick={() => handleFlagClick('gb')} />
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
