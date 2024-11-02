import server from "./server";
import colors from "colors";

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${PORT}`));
    
})