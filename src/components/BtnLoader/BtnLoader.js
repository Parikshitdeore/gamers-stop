import { FidgetSpinner } from  'react-loader-spinner'

export const BtnLoader =()=>{
    return(
<FidgetSpinner
 visible={true} 
 height="15" 
 width="20" 
 ariaLabel="dna-loading" 
 ballColors={['#ff0000', '#00ff00', '#0000ff']} 
 backgroundColor="purple"
/>
    )
}