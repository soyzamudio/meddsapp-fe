import { PatientService } from './../shared/services/patient.service';
import { Patient } from './../shared/interfaces/index';
import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  doc,
  collection,
  addDoc,
  setDoc,
  onSnapshot,
  getDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  faChevronLeft,
  faClock,
  faPhone,
  faPhoneHangup,
} from '@fortawesome/pro-regular-svg-icons';
import { stream } from 'xlsx';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);
const dc = pc.createDataChannel('my channel');
let localStream: MediaStream;
let remoteStream: MediaStream;

@Component({
  selector: 'app-conference',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DashboardBlockComponent,
  ],
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
})
export class ConferenceComponent implements OnInit, OnDestroy {
  faChevronLeft = faChevronLeft;
  faPhone = faPhone;
  faPhoneHangup = faPhoneHangup;
  faClock = faClock;
  callId = this.route.snapshot.params['callId'];
  patientId = this.route.snapshot.params['patientId'];
  patient: Patient;
  callTimer: number = 0;
  webcamVideo: HTMLVideoElement;
  remoteVideo: HTMLVideoElement;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.patient = this.patientService.getPatientById(this.patientId);
    console.log(this.patient)
    this.webcamVideo = document.getElementById(
      'webcamVideo'
    ) as HTMLVideoElement;
    this.remoteVideo = document.getElementById(
      'remoteVideo'
    ) as HTMLVideoElement;

    this.webcamBtnClick();
  }

  ngOnDestroy() {
    localStream.getTracks().forEach((track) => track.stop());
  }

  async webcamBtnClick() {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: {
        frameRate: 10,
        aspectRatio: 1.7777777778,
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: true,
    });

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

    this.webcamVideo.srcObject = localStream;

    remoteStream = new MediaStream();

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    this.remoteVideo.srcObject = remoteStream;

    let bandwidth = 75;

    const sender = pc.getSenders()[0];
    const parameters = sender.getParameters();
    if (!parameters.encodings) {
      parameters.encodings = [{}];
    }

    parameters.encodings[0].maxBitrate = bandwidth * 1000;
    sender
      .setParameters(parameters)
      .then()
      .catch((e) => console.error(e));
  }

  async callBtnClick() {
    const callTimer = setInterval(() => {
      this.callTimer = this.callTimer + 1000;
    }, 1000);

    const callDoc = doc(this.firestore, 'calls', this.callId);
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data: any = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    dc.onclose = () => {
      clearInterval(callTimer);
      localStream.getTracks().forEach((track) => track.stop());
      // this.router.navigate(['/video-consultas']);
    };
  }

  async answerBtnClick() {
    const callDoc = doc(this.firestore, 'calls', this.callId);
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data() as any;

    const offerDescription = callData?.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await setDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  hangUp() {
    pc.close();
  }
}
