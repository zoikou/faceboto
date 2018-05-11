import React from 'react';
import soundOn from './speaker.png';
import soundOff from './speakeroff.png';


const SoundButton = ({handleSong, playing})=>{

  if(playing){
    return (
    <div>
            <button 
            className='b input-reset ba b--black bg-transparent grow pointer dib mb4 '
            onClick={()=>handleSong(playing)}
            >
            <div className="pa3"> 
               <img style={{paddingTop: '5px'}}alt='sound' src={soundOn}/> 
              </div>
           </button>
    </div>
    );
  }else{
    return (
    <div>
            <button 
            className='b input-reset ba b--black bg-transparent grow pointer dib mb4'
            onClick={()=>handleSong(playing)}
            >
            <div className="pa3"> 
               <img style={{paddingTop: '5px'}}alt='sound' src={soundOff}/> 
              </div>
           </button>
    </div>
    );
  }
}

export default SoundButton;