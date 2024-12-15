import { useState } from "react";
import { useEffect } from "react";

const TextToVoice = ({ text }) => {
  const [user, setUser] = useState(null);
  const [isPause, setIsPause] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const initialVoice = () => {
      const user = new SpeechSynthesisUtterance(text);
      user.lang = "th-TH";

      // กำหนดเสียงภาษาไทย
      const voices = synth.getVoices();
      const thaiVoice = voices.find((voice) => voice.lang === "th-TH");
      if (thaiVoice) {
        user.voice = thaiVoice;
      } else {
        console.warn("ไม่พบเสียงภาษาไทยในระบบ");
      }

      setUser(user);
    };

    if (synth.getVoices().length > 0) {
      initialVoice();
    } else {
      synth.onvoiceschanged = initialVoice;
    }

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPause) {
      synth.resume();
    }

    user.rate = speed;
    synth.speak(user);
    setIsPause(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPause(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPause(false);
  };

  console.log(speed);

  return (
    <div>
      <input
        type="range"
        min={-1}
        max={2}
        step={0.1}
        defaultValue={speed}
        onChange={(event) => setSpeed(event.target.value)}
      ></input>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      {text}
    </div>
  );
};
export default TextToVoice;
