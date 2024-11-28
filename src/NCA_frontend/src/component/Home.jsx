import React, {useEffect, useState} from 'react'

import Header from './Header.jsx'
import HomeCard from './HomeCard.jsx'
import Supported from './Supported.jsx'
import LatestNews from './LatestNews.jsx'
import Footer from './Footer.jsx'

import '../style/Home.css'


import sT1 from '../assets/home/signTouch-1.png'
import sT2 from '../assets/home/signTouch-2.png'
import sT3 from '../assets/home/signTouch-3.png'
import sT4 from '../assets/home/signTouch-4.png'


import actEarnHand from '../assets/home/actEarn-hand.png'
import actEarnPlant from '../assets/home/actEarn-plant.png'
import actEarnBall from '../assets/home/actEarn-ball.png'


import communityPeople from '../assets/home/community-people.png'


import natureCallsBackground from '../assets/home/natureCalls-bg.png'


import upperIcon from '../assets/home/upper-icon.png'
import prevIcon from '../assets/home/prev-icon.png'
import nextIcon from '../assets/home/next-icon.png'

import vect1 from '../assets/index/vector1.png'
import vect2 from '../assets/index/vector2.png'

function Home(){
    document.title = "Home Page | NCA";

    // Nature Calls
    const [ncCount, setncCount] = useState(0);

    function clickHandlingNatureCalls(mode){
        if(mode === 0){
            setncCount(() => 0);
        } else{
            setncCount(() => 1);
        }
    }


    // Home Card
    const listCard = [
        [
            "Discover",
            "Daily Challenges",
            "Open Now",
            1,
            "https://guthib.com/"
        ],
        [
            "Discover",
            "Leaderboard",
            "Open Now",
            2,
            "https://ns2006.github.io/NCA/"
        ],
        [
            "Discover",
            "Green Coin Explained",
            "Watch Now",
            3,
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ],
        [
            "Discover",
            "P Diddy's New Song",
            "Watch Now",
            1,
            "https://www.youtube.com/watch?v=khKdXTmbhDw"
        ],
        [
            "Discover",
            "Tea Party's Information",
            "Read Now",
            2,
            "https://bluearchive.fandom.com/wiki/Tea_Party"
        ],
        [
            "Discover",
            "What Is This ???",
            "Watch Now",
            2,
            "https://www.youtube.com/watch?v=Ix-Y4jv7yvM"
        ]
    ]

    const [homeCardCount, sethomeCardCount] = useState("0");
    const [homeCardCount2, sethomeCardCount2] = useState("1");
    const [homeCardCount3, sethomeCardCount3] = useState("2");

    function clickHandlingHomeCard(mode) {
        sethomeCardCount((prevhomeCardCount) => {
            const newhomeCardCount = mode === 0 ? Math.max(0, prevhomeCardCount - 1) : Math.min(3, prevhomeCardCount + 1);
            sethomeCardCount2(newhomeCardCount + 1);
            sethomeCardCount3(newhomeCardCount + 2);
            return newhomeCardCount;
        });
    }



    return(
        <>
            <Header/>

            {/* Nature Calls */}
            <div className="natureCalls-container">
                <div className="nc-left">
                    <div className="nc-info-container">

                    </div>
                </div>

                <div className="nc-right">
                    <div className="nc-title">
                        <h1>Nature</h1>
                        <h1><div className="nc-title-box"></div>Calls</h1>
                    </div>

                    <div className="nc-desc">
                        {
                            ncCount === 0 ? 
                            <p>Introducing <b>NCA</b> (Nature's Call to Action): a vibrant movement dedicated to empowering individuals to confront ecological challenges head-on. With powerful taglines like <b>"Act Now for a Greener Tomorrow"</b> and <b>"Your Journey Towards a Sustainable Future"</b>, NCA ignites a sense of urgency and personal responsibility, inspiring everyone to take meaningful eco-friendly actions—from recycling to community cleanups. Our branding, characterized by harmonious shades of greens, blues, and earth tones, reflects our commitment to the environment while embodying an approachable and contemporary aesthetic. Explore our engaging website to uncover actionable eco-tips, share impactful stories, and connect with a community of like-minded individuals committed to nurturing our planet. Together, we can make a difference today for a sustainable tomorrow!</p> 
                            : 
                            <p><b>A Carbon Credit</b> is a permit or certificate that represents the right to emit <b>one metric ton of carbon dioxide (CO₂)</b> or its equivalent in other greenhouse gases. These credits are part of a market-based approach to reduce global carbon emissions, where companies or organizations that reduce their emissions below a set limit can sell their excess credits to others that exceed their emission quotas. The goal is to create a financial incentive for businesses to adopt cleaner technologies and reduce their environmental impact, contributing to global efforts to combat climate change.</p>
                        }
                    </div>

                    <div className="nc-button">
                        <a href="#">
                            <button>ACT NOW</button>
                        </a>
                        <button className='nc-desc-button' onClick={() => {clickHandlingNatureCalls(0)}}>What is NCA?</button>
                        <button className='nc-desc-button' onClick={() => {clickHandlingNatureCalls(1)}}>What is Carbon Credit?</button>        
                    </div>
                </div>
            </div>


            {/* Home Card */}
            <div className="homeCard-container">
                <div className="homeCard-content">
                    <div className="homecard-icon-container">
                        <img src={prevIcon} alt="Prev Icon" className='homeCard-icon' id='prevIcon' onClick={() => clickHandlingHomeCard(0)} style={{visibility: homeCardCount <= 0 ? "hidden" : "visible"}}/>
                    </div>

                    <HomeCard text1={listCard[homeCardCount][0]} text2={listCard[homeCardCount][1]} text3={listCard[homeCardCount][2]} imgMode={listCard[homeCardCount][3]} clickUrl={listCard[homeCardCount][4]}/>

                    <HomeCard text1={listCard[homeCardCount2][0]} text2={listCard[homeCardCount2][1]} text3={listCard[homeCardCount2][2]} imgMode={listCard[homeCardCount2][3]} clickUrl={listCard[homeCardCount2][4]}/>

                    <HomeCard text1={listCard[homeCardCount3][0]} text2={listCard[homeCardCount3][1]} text3={listCard[homeCardCount3][2]} imgMode={listCard[homeCardCount3][3]} clickUrl={listCard[homeCardCount3][4]}/>

                    <div className="homecard-icon-container">
                        <img src={nextIcon} alt="Next Icon" className='homeCard-icon' id='nextIcon' onClick={() => clickHandlingHomeCard(1)} style={{visibility: homeCardCount >= 3 ? "hidden" : "visible"}}/>
                    </div>
                </div>

                <div className="homeCard-dot-container">
                    <div className="homeCard-dot" style={{backgroundColor: homeCardCount <= 0 ? "#505050" : "#D9D9D9"}}></div>
                    <div className="homeCard-dot" style={{backgroundColor: homeCardCount == 1 ? "#505050" : "#D9D9D9"}}></div>
                    <div className="homeCard-dot" style={{backgroundColor: homeCardCount == 2 ? "#505050" : "#D9D9D9"}}></div>
                    <div className="homeCard-dot" style={{backgroundColor: homeCardCount >= 3 ? "#505050" : "#D9D9D9"}}></div>
                </div>
            </div>


            {/* Vector Background */}
            <div className="margin-page-container">
                <div className="background-vector-container">
                    <div className="vector-container vector-up">
                        <img src={vect1} alt="Vector 1" className='vect1'/>
                    </div>

                    <div className="background-vector-content">
                        {/* Act and Earn */}
                        <div className="actEarn-container">
                            <div className="actEarn-up">
                                <h1>Act & Earn</h1>
                            </div>
                            <div className="actEarn-down">
                                <div className="actEarn-left">
                                    <ol>
                                        <li>
                                            <b>Act</b>: Start your journey by taking action! Engage in eco-friendly practice such as using a reusable bag, recycled stuff, or even doing volunteer cleanup. <b>Every small step homeCardCounts</b> toward a greener world.
                                        </li> <br />

                                        <li>
                                            <b>Submit</b>: Showcase your contributions! Once you've made an impact, submit a photo or video of your activity to highlight your efforts. This not only inspires others but also validates your commitment to the environment.
                                        </li> <br />

                                        <li>
                                            <b>Earn</b>: After your submission is reviewed and approved, you'll receive <b>Green Tokens</b> as a reward for your eco-friendly actions. These tokens symbolize your commitment to sustainability and your contributions toward a healthier planet. 
                                        </li> <br />

                                        <li>
                                            <b>Exchange</b>: Accumulate your Green Coin and exchange them for <b>Carbon Credit</b>, which can contribute to further environmental initiatives or even function as crypto currency in our ecosystem. Your actions not only benefit the planet but can also offer tangible rewards!
                                        </li> <br />
                                    </ol>
                                </div>

                                <div className="actEarn-right">
                                    <div className="actEarn-imgUp">
                                        <img src={actEarnHand} alt="Act Earn Hand" className="actEarn-imgLeft"/>
                                        <img src={actEarnPlant} alt="Act Earn Plant" className="actEarn-imgRight"/>
                                    </div>
                                    <div className="actEarn-imgDown">
                                            <img src={actEarnBall} alt="Act Earn Ball" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="upperIcon-button actEarn-button">
                                <a href="#">
                                    <button><p>ACT NOW!</p> <img src={upperIcon} alt="Upper Icon" /></button>
                                </a>
                            </div>
                        </div>


                        {/* Community */}
                        <div className="community-container">
                            <div className="community-left">
                                <img src={communityPeople} alt="Community People" />
                            </div>
                            <div className="community-right">
                                <h3>NCA Hub Network</h3>
                                <h1>Help Us Grow in the Web3 Ecosystem</h1>
                                <div className="upperIcon-button community-button">
                                    <a href="#">
                                        <button><p>JOIN COMMUNITIES</p> <img src={upperIcon} alt="Upper Icon" /></button>
                                    </a>
                            </div>
                            </div>
                        </div>
                    </div>


                    <div className="vector-container vector-low">
                        <img src={vect2} alt="Vector 2" className='vect2'/>
                    </div>
                </div>


                <Supported/>
                <LatestNews/>


                {/* Sign Touch */}  
                <div className="signTouch-container">
                    <div className="signTouch-left">
                        <h2>Sign up to keep in touch</h2>
                        <input type="email" placeholder='youremail@gmail.com'/>
                        <br />
                        <button>I WANT THE UPDATES</button>
                    </div>
                    <div className="signTouch-right">
                        <div className="signTouch-img">
                            <img src={sT1} alt="sT1" className='sT1'/>
                            <img src={sT2} alt="sT2" className='sT2'/>
                        </div>
                        <div className="signTouch-img">
                            <img src={sT3} alt="sT3" className='sT3'/>
                            <img src={sT4} alt="sT4" className='sT4'/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default Home;