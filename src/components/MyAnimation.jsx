import Lottie from "lottie-react";
import animationData from "../../src/assets/data/shop (2).json";

const MyAnimation = () => {
    return(
        <div className="w-32">
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
};

export default MyAnimation;
