import React from "react"
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { BsRecordCircle } from 'react-icons/bs';
import "./styles.css";

class main extends React.Component {
    constructor() {
      super();
      this.state = {
        arr:[],
      };
    }
    componentDidMount(){
    axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`)
      .then(res => {
        const Response_arr = res.data.items;
        this.setState({ arr:Response_arr });
      })
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