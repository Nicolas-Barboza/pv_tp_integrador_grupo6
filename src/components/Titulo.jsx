function Titulo({ texto }) {
    const style = {
        fontFamily: "Lato, sans-serif",
        fontSize: "35px",         
        fontWeight: "600",        
        color: "#2c3e50",         
        margin: "10px 0 25px 0",   
        textAlign: "center",
        letterSpacing: "0.5px",    
    };
    return (
        <h2 style={style}>{texto}</h2>
    );
}
export default Titulo;