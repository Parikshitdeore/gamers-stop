import React from 'react'
import { FidgetSpinner } from  'react-loader-spinner'
import "./loader.css"
const Loader = () => {

  return (
    <div className='loading-container'>

    <p><FidgetSpinner visible={true} height="80" width="80" ariaLabel="dna-loading" ballColors={['#ff0000', '#00ff00', '#0000ff']} backgroundColor="#915dc2"/>
   </p>
    </div>
  )
}

export default Loader