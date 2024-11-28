import '../style/LogRegInput.css'

import { Link } from "react-router-dom";

import imgCalendar from '../assets/form/formCalendar.png'
import imgEmail from '../assets/form/formEmail.png'
import imgNamee from '../assets/form/formName.png'
import imgPassword from '../assets/form/formPassword.png'

function LogRegInput({
    value,
    setValue,
    inputType,
    title,
    description,
    imgName,
    placeholder
}){
    const inputHandling = (e) => {
        setValue(e.target.value);
    }

    const buttonHandling = () => {
        setValue(1);
    }
    
    if(inputType === "title"){
        return(
            <>
                <h1 className='form-h1'>{title}</h1>
                <hr />
            </>
        );
    }

    if(inputType == "link"){
        return(
            <>
                <div className="form-container">
                    <Link to={title} className='input-link'><p>{description}</p></Link>
                </div>
            </>
        );
    }

    if(inputType == "checkbox"){
        return(
            <>
                <div className="form-container input-checkbox">
                    <input type="checkbox" id='inputCheckbox'/>
                    <label htmlFor="inputCheckbox">{description}</label>
                </div>
            </>
        );
    }

    if(inputType != "button"){
        return(
            <>
                <div className="input-container">
                    <div className="input-left">
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                    <div className="input-right">
                        <div className="input-wrap">
                            {
                                imgName == "formName.png" ? 
                                    <img src={imgNamee} alt="Image" />
                                : imgName == "formEmail.png" ? 
                                    <img src={imgEmail} alt="Image" />
                                : imgName == "formCalendar.png" ? 
                                    <img src={imgCalendar} alt="Image" />
                                :
                                    <img src={imgPassword} alt="Image" />
                            }
                            <input type={inputType} placeholder={placeholder} onChange={(e) => inputHandling(e)}/>
                        </div>
                    </div>
                </div>
                <hr />
            </>
        );
    }

    return (
        <>
            <div className="form-container">
                <button className='input-button' onClick={() => buttonHandling}>{title}</button>
            </div>
        </>
    );
}

export default LogRegInput;