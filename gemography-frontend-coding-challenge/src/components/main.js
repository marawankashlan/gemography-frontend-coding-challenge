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
    }
    componentDidMount(){
      this.loadPage()
    }

    loadPage = () =>{
      if(this.state.page==1){
            this.setState({ isLoading: true },()=> {
              axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`)
              .then(res => {
                let pageTemp=this.state.page;
                pageTemp++;
                const Response_arr = res.data.items;
                this.setState({ arr:Response_arr,isLoading: false,page:pageTemp });
              })
              .catch((err)=>{
                this.setState({error: err.message,
                  isLoading: false});
              });
            }
          )
      }
      else{
        let pageTemp=this.state.page;
        this.setState({ isLoading: true },()=> {
          axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=`+pageTemp)
          .then(res => {
            pageTemp++;
            const Response_arr = res.data.items;
            this.setState({ arr:Response_arr,isLoading: false,page:pageTemp });
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
        
        this.state.arr.forEach(element => {
            let ndate=new Date(element.created_at)
            let today = new Date()
            let temp=''
            if(element.description){
              temp=element.description.slice(0,3)
            }
            let Difference_In_Time = today.getTime() - ndate.getTime();
            // To calculate the no. of days between two dates
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let days = Math.trunc(Difference_In_Days)

            array.push(<div className="card">
                <br/>
                <br/>
                <div className="media">
                     <img src={element.owner.avatar_url} alt="display image" />
                        <div >
                              <div><h2 className="repo">{element.name}</h2></div>
                              <div><p className="desc">{element.description}</p></div>
                              <div >
                                <h5 className="rest"><i className="box"><AiFillStar className="icon"/>  Stars: {element.stargazers_count}</i> <i className="box"><BsRecordCircle /> Issues: {element.open_issues_count} </i> <small>Submitted {days} days ago by {element.owner.login}</small></h5>
                            </div>
                        </div>
                </div>
                <br/>
            </div>)
        });
        
            return (
                <div className="App">
                       {array}
                </div>
          );
    }
  }
  export default main;