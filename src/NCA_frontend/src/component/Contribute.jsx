import Header from "./Header.jsx";
import Action from "./Action.jsx"
import Supported from './Supported.jsx'
import LatestNews from './LatestNews.jsx'
import Footer from './Footer.jsx'

import vect1 from '../assets/index/vector1.png'
import vect2 from '../assets/index/vector2.png'

import '../style/Contribute.css'

import MonitorGraph from '../assets/contribute/monitorGraph.png'

function Contribute(){
    document.title = "Contribute Page | NCA";

    return(
        <>
            <Header/>

            {/* Title */}
            <div className="contribute-title-center">
                <div className="contribute-title-container">
                    <h1 className="contribute-title">EVERY ACTION</h1>
                    <h1 className="contribute-title">MATTERS</h1>
                </div>
            </div>


            <div className="margin-page-container">
                {/* Monitor */}
                <div className="contribute-monitor">
                    <h1>CO<sub>2</sub> Monitor</h1>

                    {/* Soon */}
                    <div className="contribute-graph">
                        <img src={MonitorGraph} alt="Monitor Graph" />
                    </div>
                </div>


                {/* Content */}
                <div className="background-vector-container">
                    <div className="vector-container vector-up">
                        <img src={vect1} alt="Vector 1" className='vect1'/>
                    </div>


                    <div className="background-vector-content">
                        {/* Action */}
                        <div className="action-container">
                            <h1 className="action-title">CHOOSE YOUR ACTION</h1>
                            <p className="action-desc">Involves GPS tracking, you don’t need to fill forms</p>

                            <div className="action-card-container">
                                <div className="action-pair">
                                    <Action actionName={"Walking"} imgColorUrl={"actionWalking.png"} actionGradient={"linear-gradient(#9AD2B2, #B9FFD8)"} imgProgressUrl={"actionWalkingProg.png"} actionTarget={40} actionMode={1}/>
                                    <Action actionName={"Public Transport"} imgColorUrl={"actionTransport.png"} actionGradient={"linear-gradient(#ACBCFF, #FFFFFF)"} imgProgressUrl={"actionTransportProg.png"} actionTarget={300} actionMode={2}/>
                                </div>
                                
                                <div className="action-pair">
                                    <Action actionName={"Electric Vehicle"} imgColorUrl={"actionVehicle.png"} actionGradient={"linear-gradient(#FFAAAA, #FFEDED)"} imgProgressUrl={"actionVehicleProg.png"} actionTarget={1250} actionMode={3}/>
                                    <Action actionName={"Cycling"} imgColorUrl={"actionCycling.png"} actionGradient={"linear-gradient(#00CB88, #99FFA0)"} imgProgressUrl={"actionCyclingProg.png"} actionTarget={833} actionMode={4}/>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <h3>Can’t find your activity above? I think you will, in the forms below</h3>
                        <form className="contribute-form">
                            <h1>Action Detail</h1>
                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="typeOfAction">Type Of Action<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <select name="typeOfAction" id="typeOfAction">
                                    <option value="#"></option>
                                    <option value="recycle">Recycle</option>
                                    <option value="treePlanting">Tree Planting</option>
                                    <option value="solarPanel">Solar Panel</option>
                                </select>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="actionName">Action Name</label>
                                </div>
                                <input type="text" name="actionName" id="actionName"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="date">Date<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <input type="date" name="date" id="date"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="country">Country<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <input type="text" name="country" id="country"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="city">City<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <input type="text" name="city" id="city"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="numberOfPeople">Number Of People<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <input type="text" name="numberOfPeople" id="numberOfPeople"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="organization">Organization / Institute</label>
                                </div>
                                <input type="text" name="organization" id="organization"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="actionScope">Action Scope<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <input type="text" name="actionScope" id="actionScope"/>
                            </div>

                            <div className="contribute-form-input">
                                <div className="contribute-label">
                                    <label htmlFor="documentation">Documentation / Certificate<sup className="contribute-label-active">*</sup></label>
                                </div>
                                <input type="file" name="documentation" id="documentation"/>
                            </div>

                            <div className="contribute-form-description">
                                <ul>
                                    <li>Accepts jpg, png, jpeg, pdf (Max Size: 100Mb).</li>
                                    <li>Please provide <b>verifiable proofs</b> that clearly demonstrates your participation in the action. </li>
                                </ul>
                            </div>

                            <div className="contribute-button-container">
                                <button className="contribute-button">Submit</button>
                            </div>
                        </form>
                    </div>


                    <div className="vector-container vector-low">
                        <img src={vect2} alt="Vector 2" className='vect2'/>
                    </div>
                </div>

                <Supported/>
                <LatestNews/>
            </div>
            <Footer/>
        </>
    );
}

export default Contribute;