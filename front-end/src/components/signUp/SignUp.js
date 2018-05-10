//Code used from http://tachyons.io/components/forms/sign-in/index.html
import React from 'react';

class SignUp extends React.Component {
	constructor(props){
		super();
		this.state = {
			signUpEmail: '',
			signUpPassword: '',
			name:''
		}
	}
	nameInput = (event)=>{
		this.setState({name: event.target.value})
	}
	emailInput = (event)=>{
       this.setState({signUpEmail : event.target.value})
	}
	passwordInput = (event)=>{
		this.setState({signUpPassword: event.target.value})
	}
	submitSignUp = ()=>{
    	fetch('http://localhost:3000/signup', {
    		    method: 'post',
    		    headers: {'Content-Type' : 'application/json'},
    		    body: JSON.stringify({
    			   name: this.state.name,
    			   email: this.state.signUpEmail,
    			   password: this.state.signUpPassword
    		})
    	})
    	  .then(response => response.json())
    	  .then(user => {
    	  	if(user){
    	  		this.props.loadUser(user)
    	  		this.props.onRouteChange('home');
    	  	}
    	  })
    	
    }

	render(){
		
		return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		<main className="pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="text" 
		        name="name"  
		        id="name"
		        onChange={this.nameInput}
		        />
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" 
		        name="email-address"  
		        id="email-address"
		        onChange={this.emailInput}
		        />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input 
		        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" 
		        name="password"  
		        id="password"
		        onChange={this.passwordInput}
		        />
		      </div>
		    </fieldset>
		    <div className="">
		      <input 
		      onClick={this.submitSignUp} // call the function when onClick
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
		      type="submit" value="Sign Up"/>
		    </div>
		  </div>
		</main>
		</article>

    );
  }
	
}

export default SignUp;
