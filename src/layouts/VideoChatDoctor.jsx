import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { connect, createLocalTracks } from 'twilio-video';
import styles from './VideoChatDoctor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../context/auth';
import { Redirect } from 'react-router';
import Loading from '../assets/img/loading.svg';
import LoadingGrey from '../assets/img/loadingGrey.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const videoChatEndpoint = 'https://medicalappapinsut.herokuapp.com';
var room;
var localAudioTrack;
var localVideoTrack;
var tracks;

function VideoChatDoctor(props) {
	const id = props.match.params.id;
	// const jwtUserToken = useAuthContext();
	const jwtUserToken = { token: 'abc' };
	const remoteRef = useRef(null);
	const localRef = useRef(null);
	const [preview, setPreview] = useState(false);
	const [connected, setConnected] = useState(false);
	const [failed, setFailed] = useState(false);
	const [notes, setNotes] = useState('');
	const [callFinished, setCallFinished] = useState(false);
	// const [preview, setPreview] = useState(true);
	const [otherParticipantConnected, setOtherParticipantConnected] = useState(
		false
	);

	const getPreview = async () => {
		// if (!preview) return;
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

	//var room;
	const createRoom = async () => {
		try {
			console.log(id);
			const { data: res } = await axios.post(
				`${videoChatEndpoint}/doctors/connect/chat`,
				{ patientID: id },
				{ headers: { Authorization: `Bearer ${jwtUserToken}` } }
			);
			await getPreview();
			setPreview(true);
			// console.log(res);
			const accessToken = res.token;
			const RoomName = res.room;
			console.log('ROOOM:::::', RoomName);
			room = await connect(accessToken, {
				name: RoomName,
				tracks,
			});
			setConnected(true);
			setUp();
		} catch (e) {
			setFailed(true);
			console.log('Failed');
			return <h1>Couldn't connect you!</h1>;
		}
	};

	const setUp = () => {
		room.on('participantConnected', (participant) => {
			//
			setOtherParticipantConnected(true);
			participant.tracks.forEach((publication) => {
				if (publication.isSubscribed) {
					const track = publication.track;
					setOtherParticipantConnected(true);
					remoteRef.current.appendChild(track.attach());
				}
			});

			participant.on('trackSubscribed', (track) => {
				remoteRef.current.appendChild(track.attach());
			});
		});

		room.on('participantDisconnected', (participant) => {
			// console.log(participant, 'left');
			remoteRef.current.innerHTML = '';
			setCallFinished(true);
		});

		room.on('disconnected', (room) => {
			// console.log('You Left');
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
		setCallFinished(true);
	};

	const handleSubmit = async () => {
		try {
			const { data } = await axios.post(
				`${videoChatEndpoint}/records/create`,
				{
					description: notes,
					patient: id,
				},
				{
					headers: {
						Authorization: `Bearer ${jwtUserToken.token}`,
					},
				}
			);
			toast.success('Record saved!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			setNotes('');
		} catch (e) {
			toast.error('Failed!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
		}
	};

	useEffect(() => {
		createRoom();
	}, [localRef]);

	return jwtUserToken.fetching ? (
		<main className={styles.loadingDiv}>
			<img src={Loading} alt='loading...' />
		</main>
	) : jwtUserToken.token ? (
		<main>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
			/>
			<div className={styles.holdingContainer}>
				{!connected && !failed ? (
					<div className={styles.videoContainer}>
						<img src={Loading} alt='loading...' />
					</div>
				) : (
					<div className={styles.videoContainer}>
						{failed ? (
							<h1
								className='display-1 text-white bg-gradient-danger'
								style={{ textAlign: 'center' }}
							>
								Can't Connect You!
							</h1>
						) : (
							<h1
								className='display-1 text-white bg-gradient-info'
								style={{ textAlign: 'center' }}
							>
								You are connected!
							</h1>
						)}
						<div
							id='remote-container'
							className={styles.remoteContainer}
							ref={remoteRef}
						>
							{!otherParticipantConnected && !failed ? (
								<img src={LoadingGrey} alt='loading' />
							) : null}
						</div>
						<div className={`${styles.toolbar}`}>
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
							style={preview ? {} : { opacity: '0' }}
						></div>
					</div>
				)}
				<div className={styles.notesContainer}>
					<form className={styles.notesForm}>
						<label
							htmlFor='notes-input'
							className={`heading-small text-muted ${styles.notesLabel}`}
						>
							Notes:
						</label>
						<textarea
							className={
								`form-control form-control ${styles.notesInput}` +
								(notes.length === 0 ? ' is-invalid' : '')
							}
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
						{callFinished ? (
							<button
								type='submit'
								className='mt-3 btn btn-primary btn-md'
								onClick={handleSubmit}
							>
								Submit Notes
							</button>
						) : null}
					</form>
				</div>
			</div>
		</main>
	) : (
		<Redirect to='/auth' />
	);
}

export default VideoChatDoctor;
