import * as Icons from "react-icons/md";

const FaIcons = ({ icon }) => {
    const IconComponent = Icons[icon];
    if (!IconComponent) return null;
    return <IconComponent size={28} />;
};

export default FaIcons;