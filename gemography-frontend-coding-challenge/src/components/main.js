import React from "react"
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { BsRecordCircle } from 'react-icons/bs';
import debounce from 'lodash.debounce';
import "./styles.css";

class main extends React.Component {
    constructor() {
      super();
      this.state = {
        arr:[],
        error: false,
        hasMore: true,
        isLoading: false,
        page:1
      };

      window.onscroll = debounce(() => {
        const {
          loadPage,
          state: {
            error,
            isLoading,
            hasMore,
          },
        } = this;
  
        if (error || isLoading || !hasMore) return;
  //calculate the window's height to check if the scroll bar reached the end of the page or not if yes call loadPage function
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight ) {
            loadPage()
        }
      }, 100);
    }

    componentDidMount(){
      this.loadPage()
    }

    loadPage = () =>{
      //if it's the first time to load it will call the api without the page number
     
      if(this.state.page==1){
            this.setState({ isLoading: true },()=> {
              axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`)
              .then(res => {
                //calculate the next page number and save it in the state
                let pageTemp=this.state.page;
                pageTemp++;
                const Response_arr = res.data.items;
                //save the response body in the state
                this.setState({ arr:Response_arr,isLoading: false,page:pageTemp });
              })
              .catch((err)=>{
                this.setState({error: err.message,
                  isLoading: false});
              });
            }
          )
      }
       //if not the first time it will call the api according to the next page number
      else{
        let pageTemp=this.state.page;
        this.setState({ isLoading: true },()=> {
          axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=`+pageTemp)
          .then(res => {
            pageTemp++;
            const Response_arr = res.data.items;
             //save the response body in the state and append it to the previous state
            this.setState({ 
              arr:[...this.state.arr,...Response_arr],
              isLoading: false,
              page:pageTemp });
          })
          .catch((err)=>{
            this.setState({error: err.message,
              isLoading: false});
          });
        }
      )
      }
      
    }

    render() {
        var array=[]
        console.log("array ",this.state.arr)
        //loop on the array in the state
        this.state.arr.forEach(element => {
          //convert the date repo created at from string to date
            let ndate=new Date(element.created_at)
            let today = new Date()
            let Difference_In_Time = today.getTime() - ndate.getTime();
            // To calculate the no. of days between two dates
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let days = Math.trunc(Difference_In_Days)
            let temp=""
            if(element.description){
              temp=element.description.slice(0,5)
            }
          //push the page style in an array
            array.push(<div className="card">
                <br/>
                <br/>
                <div className="media">
                     <img src={element.owner.avatar_url} alt="display image" />
                        <div className="flex-container">
                              <div><h2 className="repo">{element.name}</h2></div>
                              <div className="desc">{element.description}</div>
                              <div >
                                <h5 className="rest"><i className="box"><AiFillStar className="icon"/>  Stars: {element.stargazers_count}</i> <i className="box"><BsRecordCircle /> Issues: {element.open_issues_count} </i> <small>Submitted {days} days ago by {element.owner.login}</small></h5>
                            </div>
                        </div>
                </div>
                <br/>
            </div>)
        });
        //render the array that contains the page style
            return (
                <div className="App">
                       {array}
                </div>
          );
    }
  }
  export default main;