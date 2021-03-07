import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { connect, createLocalTracks } from 'twilio-video';
import styles from './VideoChatPatient.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingGrey from '../assets/img/loadingGrey.svg';
import './globals.css';

const videoChatEndpoint = 'https://medicalappapinsut.herokuapp.com';
var room;
var localAudioTrack;
var localVideoTrack;
var tracks;

function VideoChatPatient(props) {
	const roomName = props.match.params.roomName;
	const remoteRef = useRef(null);
	const localRef = useRef(null);
	const [connected, setConnected] = useState(false);
	const [failed, setFailed] = useState(false);
	const [preview, setPreview] = useState(false);

	const getPreview = async () => {
		try {
			tracks = await createLocalTracks({
				audio: true,
				video: { width: 1024 },
			});
			localAudioTrack = tracks.find((track) => track.kind === 'audio');
			localVideoTrack = tracks.find((track) => track.kind === 'video');
			localRef.current.appendChild(localVideoTrack.attach());
		} catch (e) {
			localRef.current.appendChild(
				document.createTextNode("Can't show Preview")
			);
		}
	};

	const setUp = () => {
		room.on('participantConnected', (participant) => {
			console.log(`Participant connected: ${participant.identity}`);
			participant.tracks.forEach((publication) => {
				if (publication.isSubscribed) {
					const track = publication.track;
					remoteRef.current.appendChild(track.attach());
				}
			});

			participant.on('trackSubscribed', (track) => {
				remoteRef.current.appendChild(track.attach());
			});
		});

		room.on('participantDisconnected', (participant) => {
			console.log(participant, 'left');
			remoteRef.current.innerHTML = '';
		});

		room.on('disconnected', (room) => {
			console.log('You Left');
			// Detach the local media elements
			room.localParticipant.tracks.forEach((publication) => {
				const attachedElements = publication.track.detach();
				attachedElements.forEach((element) => element.remove());
			});
			remoteRef.current.innerHTML = '';
		});

		room.participants.forEach((participant) => {
			console.log('I detected a participant that was already present');
			participant.tracks.forEach((publication) => {
				if (publication.isSubscribed) {
					const track = publication.track;
					if (track.kind === 'video') {
						remoteRef.current.appendChild(track.attach());
					}
				}
			});
			participant.on('trackSubscribed', (track) => {
				remoteRef.current.appendChild(track.attach());
			});
		});
		setConnected('true');
	};

	const stopCall = () => {
		console.log('disconnecting');
		room.disconnect();
		room.localParticipant.unpublishTrack(localVideoTrack);
		localAudioTrack.detach();
		localVideoTrack.detach();
		localRef.current.innerHTML = '';
		localVideoTrack.stop();
		localAudioTrack.stop();
		setConnected(false);
	};

	const joinRoom = async () => {
		try {
			const { data: res } = await axios.post(
				`${videoChatEndpoint}/patients/connect/chat`,
				{
					room: roomName,
				}
			);
			getPreview();
			setPreview(true);
			const accessToken = res.token;
			room = await connect(accessToken, {
				name: roomName,
				tracks,
			});
			setConnected(true);
			setUp();
		} catch (e) {
			console.log('Failed');
			setFailed(true);
			return;
		}
	};

	useEffect(() => {
		joinRoom();
	}, [localRef]);

	return (
		<main className={styles.holdingContainer}>
			<div className={styles.videoContainer}>
				<div
					id='remote-container'
					className={styles.remoteContainer}
					ref={remoteRef}
				>
					{!connected && !failed ? (
						<img src={LoadingGrey} alt='loading' />
					) : failed ? (
						<h1>Couldn't connect you!</h1>
					) : null}
				</div>
				<div className={styles.toolbar} id='toolbar'>
					{connected ? (
						<button
							onClick={() => stopCall()}
							style={{
								backgroundColor: 'red',
								borderRadius: '50%',
								width: '50px',
								height: '50px',
							}}
						>
							<FontAwesomeIcon
								icon={faPhoneSlash}
								style={{ color: 'white' }}
							/>
						</button>
					) : null}
				</div>
				<div
					id='local-container'
					className={styles.localContainer}
					ref={localRef}
					style={preview ? {} : { opacity: 0 }}
				></div>
			</div>
		</main>
	);
}

export default VideoChatPatient;
