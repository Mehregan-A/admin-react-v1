const ToastContainer = () => {

    const style = {
        position : "fixed",
        left : "25px",
        top : "25px",
        zIndex: "1000000000000000"
    }

    return (<div id="alertShow" className="flex flex-col gap-1.5" style={style}></div>);
};

export default ToastContainer;