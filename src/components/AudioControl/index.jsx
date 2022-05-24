// node_modules
import { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// config
import { SERVER_BASE_URL } from "../../config";

// redux
import { fetchAudio } from "../../store/audios-slice";

const WIDTH = 1000;
const HEIGHT = 200;

const AudioControlComponent = ({ id }) => {
    const dispatch = useDispatch();

    const audioRef = useRef();
    const canvasRef = useRef();
    const audio = useSelector((state) => state.audios.audio);

    const [canvasContext, setCanvasContext] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [audioAnalyzer, setAudioAnalyzer] = useState(null);
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchAudio(id));
        }
    }, [id]);

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        setCanvasContext(context);
    }, [canvasRef.current]);

    const initializeAnalyser = useCallback(async () => {
        if (audio.url) {
            const audioTempFile = new Audio();
            audioTempFile.src = `${SERVER_BASE_URL}/${audio.url}`;
            audioTempFile.controls = true;
            audioTempFile.className = "w-full";
            audioTempFile.crossOrigin = "anonymous";
            audioRef.current.replaceChildren();
            audioRef.current.appendChild(audioTempFile);

            const audioContext = new AudioContext();
            audioContext.resume();
            const source = audioContext.createMediaElementSource(audioTempFile);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            source.connect(audioContext.destination);
            source.connect(analyser);

            setAudioFile(audioTempFile);
            setAudioAnalyzer(analyser);
            setAudioContext(audioContext);
        }
    }, [audio.url]);

    useEffect(() => {
        initializeAnalyser();
    }, [initializeAnalyser]);

    useEffect(() => {
        if (audioFile && audioAnalyzer && audioContext) {
            requestAnimationFrame(runSpectrum);
        }
    }, [audioFile, audioAnalyzer, audioContext]);

    useEffect(() => {
        if (audioFile) {
            audioFile.onplay = onPlay;
        }
    }, [audioFile]);

    const onPlay = useCallback(async () => {
        if (audioContext) {
            await audioContext.resume();
            audioFile.play();
        }
    }, [audioFile, audioContext]);

    const getFrequencyData = (styleAdjuster, canvasContext) => {
        const bufferLength = audioAnalyzer.frequencyBinCount;
        const amplitudeArray = new Uint8Array(bufferLength);
        audioAnalyzer.getByteFrequencyData(amplitudeArray);
        styleAdjuster(amplitudeArray, canvasContext);
    };

    const drawSpectrum = (dataArray, canvasContext) => {
        canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

        canvasContext.fillStyle = "rgb(200, 200, 200)";
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = "rgb(0, 0, 0)";
        canvasContext.beginPath();

        const bufferLength = dataArray.length;

        let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;

            canvasContext.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
            canvasContext.fillRect(
                x,
                HEIGHT - barHeight / 2,
                barWidth,
                barHeight
            );

            x += barWidth + 1;
        }
    };

    const runSpectrum = () => {
        getFrequencyData(drawSpectrum, canvasContext);
        requestAnimationFrame(runSpectrum);
    };

    return (
        <div className="flex justify-between mt-2">
            <div className="flex flex-col w-full">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 dark:bg-gray-700"
                    width={WIDTH}
                    height={HEIGHT}
                ></canvas>
                <div className="mt-2" ref={audioRef}></div>
            </div>
        </div>
    );
};

export default AudioControlComponent;
