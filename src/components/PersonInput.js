import React from "react";
import axios from "axios";

export default class PersonInput extends React.Component{
    
        
        state={
            id : 0
        }

       handleSubmit=((event)=>{
           event.preventDefault();
           

           axios.delete(`http://jsonplaceholder.typicode.com/users/${this.state.id}`).then(res=>{
               console.log(res)
               console.log(res.data)
           })
       })

       handleChange=((event)=>{
        this.setState({id:event.target.value})

       })

        render(){
            return(
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person ID:
                        <input type="number" name="id" onChange={this.handleChange}></input>
                    </label>
                    <button className="btn btn-primary btn-sm btn-danger" type="submit">Delete</button>
                </form>
            )
        }

    
}