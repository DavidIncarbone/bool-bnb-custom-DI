import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";


function Star({ num }) {

    const renderStars = () => {
        let stars = [];
        let tempN = num;
        for (let i = 0; i < 5; i++) {
            // console.log("iterazione n: " + i + "del num: " + num +"del temp:" + tempN);
            if (tempN >= 1) {
                stars.push(< FaStar key={i} style={{ color: "#c6a664" }} />);
            } else if (tempN >= 0.5) {
                stars.push(< FaStarHalfAlt key={i} style={{ color: "#c6a664" }} />);
            } else {
                stars.push(< FaRegStar key={i} style={{ color: "#c6a664" }} />);
            }
            tempN -= 1;
        }

        return stars;
    }
    if (num > 1)
        renderStars();
    return (
        <>
            <span>{renderStars()}</span>
        </>
    );
}

export default Star;