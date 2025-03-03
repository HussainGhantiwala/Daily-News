import React,{useEffect, useState}  from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const updateNews= async() =>{
    props.setProgress(10)
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${props.categories}&apiKey=${props.apiKey}&page=${page}&props.pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(apiUrl)
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(50)
   setArticles(parsedData.articles)
   setTotalResults(parsedData.totalResults)
   setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    // eslint-disable-next-line
    updateNews();
    document.title=`${capitalizeLetter(props.categories)} -Daily News`
  },[]);
  // handleOnNext = async () => {
  //   console.log("next")
  //   let apiUrl=`https://newsapi.org/v2/top-headlines?country=us&category${props.categories}&&apiKey=083beec604eb47559cc531b38e52e30f&page=${this.state.page+1}&props.pageSize=${props.props.pageSize}`
  //   if (!(this.state.page+1>Math.ceil(this.state.totalResults/props.props.pageSize))) {
  //     let data=await fetch(apiUrl)
  //     this.setState({ loading:true})
  //     let parsedData=await data.json()
  //     this.setState({
  //       articles:parsedData.articles,
  //       page:this.state.page+1,
  //       loading:false

  //     })
  //   }
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }
  // handlePrevious = async () => {
  //   console.log("Previous")
  //   let apiUrl=`https://newsapi.org/v2/top-headlines?country=us&category${props.categories}&&apiKey=083beec604eb47559cc531b38e52e30f&page=${this.state.page-1}&props.pageSize=${props.props.pageSize}`
  //   let data=await fetch(apiUrl)
  //   let parsedData=await data.json()
  //   this.setState({
  //     articles:parsedData.articles,
  //     page:this.state.page-1
  //   })
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }
  const fetchMoreData = async () => {
    if (articles.length >= totalResults) {
      return;
    }
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${props.categories}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage((prevPage) => prevPage + 1); // Ensure correct page update
    let data = await fetch(apiUrl);
    let parsedData = await data.json();

    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  //This function runs after Render runs, so first constructor runs then Render then ComponentDidMount method.
    let { mode } = props
    // console.log("This will first")
    return (
      <>
        <h1 className={`text-center text-${mode === 'light' ? 'dark' : 'light'}`} style={{ margin: '90px 0px 35px' }}>Top Daily {capitalizeLetter(props.categories)} headlines</h1>
        {loading && <Spinner mode={mode} />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner mode={mode} />}
          endMessage={<center><h3 className={`text-${mode==='light'?'dark':'light'}`} style={{margin:'0px 0px 30px 0px'}}>Yayy You have caught up!!!</h3></center>}>
          <div className={`container my-3  text-${mode === 'light' ? 'dark' : 'light'}`}>
            <div className="row">
              {articles.map((elements, index) => {
                //adding key to the div because it has a return value. Give a unique key since the news url is unique for every article.
                return <div className="col-md-4" key={`${elements.url}-${index}`}>
                  <NewsItem title={elements.title ? elements.title.slice(0, 50) : ""} description={elements.description ? elements.description.slice(0, 50) : ""} imgUrl={elements.urlToImage} newsUrl={elements.url} time={elements.publishedAt} author={elements.author} source={elements.source.name} mode={mode === 'dark' ? 'light' : 'dark'} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }

 News.defaultProps = {
  pageSize: 5,
  categories: 'general'
  } 
  News.propTypes = {
  pageSize: PropTypes.number,
  categories: PropTypes.string
}
export default News
