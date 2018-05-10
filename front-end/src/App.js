import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignOut from './components/signOut/SignOut';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import ImageDisplay from './components/imageDisplay/ImageDisplay';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import './App.css';

//Using API from Clarifai.com
const app = new Clarifai.App({
 apiKey: 'f4d2f05d61574857b6c27d92cefeb37c'
});
//Using Particles.js
const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity:{
   detect_on: "canvas",
   events:{
    onhover:{
    enable: true,
    mode: "repulse"
    }
   }
  }
}
//Main functionality between the App interface and the API
class App extends Component {
  constructor (){
    super();
    this.state={
      input:'', //parameter to keep track of the input in the APP, starting from an empty state
      imageUrl:'', //parameter to keep the image URL to display it, starting froma an empty state
      box: {}, // an object to keep the coordinates of the face in the image, starting from an empty state
      route: 'signIn', //the App should start from the signIn page
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

 loadUser = (data)=>{
   this.setState({user: {
       id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
   }})
 }
  
  changeInputState = (event)=>{
     this.setState({input: event.target.value});
  }
  
  // returns the location of the face inside the image
  returnFaceLocation = (data) => {
     const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return{ 
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)
     }
  }
  
  // Change the state of the box parameter
  displayFaceBox = (box) =>{
      console.log(box);
      this.setState({box: box})
  }
  
  // Communication with the clarifai API on button submit
  onPictureSubmit = () =>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(rank => {
          this.setState(Object.assign(this.state.user, { entries: rank}))
        })
    }
    this.displayFaceBox(this.returnFaceLocation(response))
  })
    .catch(err => console.log(err));
}

  onRouteChange = (route)=>{
    if(route ==='signIn'){
      this.setState ({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route });
  }
  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={particleOptions}
        />
        <SignOut isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
           ?<div>
               <Logo/>
               <Rank name={this.state.user.name} entries={this.state.user.entries}/>
               <ImageLinkForm 
                  changeInputState={this.changeInputState} 
                  onPictureSubmit={this.onPictureSubmit}/>
               <ImageDisplay box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
           :( this.state.route === 'signIn'
            ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) 
           
      }
      </div>
    );
  }
}

export default App;
