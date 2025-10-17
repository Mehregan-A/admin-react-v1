export default function ColoredShadowImage({ src, alt = "image" }) {
    return (
        <div className="relative w-17 h-17 flex items-center justify-center">
            <div
                className="absolute inset-0 rounded-tl-3xl rounded-br-3xl rounded-tr-xl blur-3xl scale-115 opacity-70"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(2) brightness(0.9)",
                }}
            ></div>
            <img
                src={src}
                alt={alt}
                className="relative z-10 w-full h-full object-cover rounded-tl-3xl rounded-br-3xl rounded-tr-xl shadow-lg transition-transform duration-500"
            />
        </div>
    );
}



