// node_modules
import { useParams } from "react-router-dom";

// components
import { AudioControlComponent } from "../../components";

const AudioControlPage = () => {
    const { id } = useParams();

    return <AudioControlComponent id={id} />;
};

export default AudioControlPage;
