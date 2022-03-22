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
            array.push(<div className="grid-container">
                <br/>
                <br/>
                <div className="item1">
                     <img src={element.owner.avatar_url} alt="display image" />
                </div>
                <div className="item2">
                    <h2 className="repo">{element.name}</h2>
                    <div className="item3">
                        <p className="desc">{element.description}</p>
                    </div>
                    <div>
                        <div>
                            <div className="item4">
                                <AiFillStar/>
                                <p className="star">Stars: {element.stargazers_count}</p>
                                <BsRecordCircle />
                                <p className="issue">Issues: {element.open_issues_count}</p>
                                
                                <p className="uname">Submitted {element.created_at} by {element.owner.login}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <hr className="item7"/>
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