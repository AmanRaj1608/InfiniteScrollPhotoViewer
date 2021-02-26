
import React, {useState,useEffect,Suspense} from 'react';
import Loader from './components/Loader';

import axios from 'axios';
import styled,{createGlobalStyle} from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

const Photos = React.lazy(() => import('./components/Images'));

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    font-family: sans-serif;
  }
`;

const ImageStyle = styled.section `
  max-width: 70rem;
  margin: 5rem auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;
const baseURL = "https://api.unsplash.com";
const accessKey = process.env.REACT_APP_ACCESSKEY;

function App() {
  const [image,setImage] = useState([]);
  
  useEffect(()=>{
    fetchImage()
  },[])

  const fetchImage = async () => {
    let {data} = await axios.get(`${baseURL}/photos/random?client_id=${accessKey}&count=12`);
    data = data.map((ele, i)=> {
      return {
        "id": ele.id,
        "blur_hash": ele.blur_hash,
        "urls": ele.urls,
        "likes": ele.likes,
        "views": ele.views
      }
    }) 
    setImage([...image,...data]);
    console.log(image)
  }
  return (
    <div className="App">
      Hello World;
      <GlobalStyle/>
      <InfiniteScroll
        dataLength={image.length}
        next={fetchImage}
        hasMore={true}
        loader={<Loader/>}
      >
        <ImageStyle>
          {image.map(im=>(
            <Suspense fallback={<Loader/>}>
              <Photos url={im.urls.thumb} likes={im.likes} key={im.id}/> 
            </Suspense>
          ))}
        </ImageStyle>
      </InfiniteScroll>
      
      
    </div>
  );
}

export default App;
