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
        //console.log("arr",JSON.stringify(res.data))
        this.setState({ arr:Response_arr });
      })
    }

    render() {
        var array=[]
        var today = new Date();
        
        this.state.arr.forEach(element => {
            let ndate=Date.parse(element.created_at)
            //console.log(ndate)
            array.push(<div>
                <br/>
                <br/>
                <div className="media">
                     <img src={element.owner.avatar_url} alt="display image" />
                        <div >
                              <div><h2 className="repo">{element.name}</h2></div>
                              <div><p className="desc">{element.description}</p></div>
                        <div>
                        <div>
                            <div className="item4">
                                <h5><AiFillStar/>  Stars: {element.stargazers_count}   <BsRecordCircle /> Issues: {element.open_issues_count} <small>Submitted {element.created_at} by {element.owner.login}</small></h5>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
                
                <hr className="hr"/>
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