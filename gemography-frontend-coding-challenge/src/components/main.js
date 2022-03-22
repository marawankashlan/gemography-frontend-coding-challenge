import React from "react"
import axios from 'axios';
import Icon from '@mui/material/Icon';
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
        this.state.arr.forEach(element => {
            var uname=element.owner.login
            var iss=element.open_issues_count
            var des=element.description
            var date=element.created_at
            var stars=element.stargazers_count
            var repo=element.name
            array.push(<div>
                <br/>
                <br/>
                <h2 className="repo">{repo}</h2>
                <div>
                    <Icon className="icon">star</Icon>;
                    <p className="star">Stars: {stars}</p>
                </div>
                <p className="issue">{iss}</p>
                <p className="uname">Submitted {date} by {uname}</p>
                <hr/>
            </div>)
        });
        
            return (
                <div className="App">
                       
                </div>
          );
    }
  }
  export default main;