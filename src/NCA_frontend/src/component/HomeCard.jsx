import PropTypes from 'prop-types'

import '../style/HomeCard.css'

import img1 from '../assets/homeCard/homeCard-dailyChallenge.png'
import img2 from '../assets/homeCard/homeCard-greenCoin.png'
import img3 from '../assets/homeCard/homeCard-leaderboard.png'

function HomeCard(props){
    let imgUrl = props.imgUrl;

    if(imgUrl !== "#"){
        // imgUrl = `../../../NCA_frontend/public/${props.imgUrl}`;
        imgUrl = `/NCA/src/NCA_frontend/public/${props.imgUrl}`;
    }

    return(
        <>
            <a href={props.clickUrl} className="homeCard-card-container">
                <div className="homeCard-left">
                    <p>{props.text1}</p>
                    <h2>{props.text2}</h2>
                    <p>{props.text3}</p>
                </div>

                <div className="homeCard-right">
                    {
                        imgMode == 1 ? 
                        <img src={img1}/>
                        : imgMode == 2 ?
                        <img src={img2}/>
                        :
                        <img src={img3}/>
                        
                    }
                    {/* <img src={imgUrl} alt="Card Image" /> */}
                </div>
            </a>
        </>
    );
}

HomeCard.propTypes = {
    text1: PropTypes.string,
    text2: PropTypes.string,
    text3: PropTypes.string,
    clickUrl: PropTypes.string,
    imgUrl: PropTypes.string,
    imgMode: PropTypes.number
}

export default HomeCard;