import "./errorpage.css"
import error from "../../assets/error.svg"

export const Errorpage=()=> {
  return (
    <div className="error-page">
        <img src={error} alt="404: Page not Found"/>
    </div>
  )
}
