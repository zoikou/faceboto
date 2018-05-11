import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({changeInputState, onPictureSubmit})=>{
	return (
		<div>
           <p className='f3'>
             {'Faceboto can detect faces in your pictures. Make him smarter!'}
           </p>
           <div className='center'>
           <div className='form center pa4 br3 shadow-5'>
           	<input className='f4 pa2 w-70 center' type='tex' onChange={changeInputState}/>
           	<button 
           	className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
           	onClick={onPictureSubmit}
           	>Detect</button>
           </div> 	
           </div>
		</div>
    );
}

export default ImageLinkForm;