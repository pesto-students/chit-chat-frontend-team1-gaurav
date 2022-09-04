import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state={
            hasError:false
        }
    }

    static getDerivedStateFromError(){
        return {
            hasError:true
        }
    }
  render() {
    if(this.state.hasError){
        return <h1>Something Went Wrong...</h1> 
       }
    else{
        return this.props.children
    }
  }
}
  