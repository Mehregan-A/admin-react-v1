import * as Icons from "react-icons/pi";

const FaIcons = ({ icon }) => {
    const IconComponent = Icons[icon];
    if (!IconComponent) return null;
    return <IconComponent size={24} />;
};

export default FaIcons;