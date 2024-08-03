import MediaDevice from "./MediaDevice";
import Emitter from "./Emitter";
import socket from "./socket";

const PC_CONFIG = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };

class PeerConnection extends Emitter {
  /**
   * Create a PeerConnection.
   * @param {String} friendID - ID of the friend you want to call.
   */
  constructor(friendID) {
    super();
    this.friendID = friendID;
    this.pc = new RTCPeerConnection(PC_CONFIG);

    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("call", {
          to: this.friendID,
          candidate: event.candidate,
        });
      }
    };

    this.pc.ontrack = (event) => {
      this.emit("peerStream", event.streams[0]);
    };

    this.mediaDevice = new MediaDevice();
  }

  /**
   * Starting the call
   * @param {Boolean} isCaller
   */
  start(isCaller) {
    this.mediaDevice
      .on("stream", (stream) => {
        stream.getTracks().forEach((track) => {
          this.pc.addTrack(track, stream);
        });

        this.emit("localStream", stream);

        if (isCaller) {
          socket.emit("request", { to: this.friendID });
        } else {
          this.createOffer();
        }
      })
      .start();

    return this;
  }

  /**
   * Stop the call
   * @param {Boolean} isStarter
   */
  stop(isStarter) {
    if (isStarter) {
      socket.emit("end", { to: this.friendID });
    }

    this.mediaDevice.stop();
    this.pc.close();
    this.pc = null;
    this.off();

    return this;
  }

  createOffer() {
    this.pc
      .createOffer()
      .then((offer) => this.getDescription(offer))
      .catch((err) => console.error("Error creating offer:", err));

    return this;
  }

  createAnswer() {
    this.pc
      .createAnswer()
      .then((answer) => this.getDescription(answer))
      .catch((err) => console.error("Error creating answer:", err));

    return this;
  }

  /**
   * @param {RTCLocalSessionDescriptionInit} desc - Session description
   */
  getDescription(desc) {
    this.pc
      .setLocalDescription(desc)
      .then(() => {
        socket.emit("call", { to: this.friendID, sdp: desc });
      })
      .catch((err) => console.error("Error setting local description:", err));

    return this;
  }

  /**
   * @param {RTCSessionDescriptionInit} sdp - Session description
   */
  setRemoteDescription(sdp) {
    const rtcSdp = new RTCSessionDescription(sdp);
    this.pc
      .setRemoteDescription(rtcSdp)
      .catch((err) => console.error("Error setting remote description:", err));

    return this;
  }

  /**
   * @param {RTCIceCandidateInit} candidate - ICE Candidate
   */
  addIceCandidate(candidate) {
    if (candidate) {
      const iceCandidate = new RTCIceCandidate(candidate);
      this.pc
        .addIceCandidate(iceCandidate)
        .catch((err) => console.error("Error adding ice candidate:", err));
    }

    return this;
  }
}

export default PeerConnection;
