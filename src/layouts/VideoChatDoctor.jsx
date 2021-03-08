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
	const jwtUserToken = useAuthContext();
	// const jwtUserToken = { token: 'abc' };
	const remoteRef = useRef(null);
	const localRef = useRef(null);
	const [preview, setPreview] = useState(false);
	const [connected, setConnected] = useState(false);
	const [localRefSet, setLocalRefSet] = useState(false);
	const [failed, setFailed] = useState(false);
	const [notes, setNotes] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [callFinished, setCallFinished] = useState(false);
	const [otherParticipantConnected, setOtherParticipantConnected] = useState(
		false
	);

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
			// console.log('I detected a participant that was already present');
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
		// console.log('disconnecting');
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
			if (submitting) return;
			setSubmitting(true);
			if (submitted || notes.trim().length === 0) {
				setSubmitting(false);
				throw Error();
			}
			await axios.post(
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
			setSubmitting(false);
			setSubmitted(true);
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
			console.log(e);
			toast.error(
				`Failed! 
			Make sure you have written some notes
			or haven't already submitted`,
				{
					position: 'top-right',
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
				}
			);
		}
	};

	useEffect(() => {
		const createRoom = async () => {
			try {
				// console.log(id);
				const { data: res } = await axios.post(
					`${videoChatEndpoint}/doctors/connect/chat`,
					{ patientID: id },
					{ headers: { Authorization: `Bearer ${jwtUserToken.token}` } }
				);
				await getPreview();
				setPreview(true);
				// console.log(res);
				const accessToken = res.token;
				const RoomName = res.room;
				// console.log('ROOOM:::::', RoomName);
				room = await connect(accessToken, {
					name: RoomName,
					tracks,
				});
				setConnected(true);
				setUp();
			} catch (e) {
				setFailed(true);
				console.log('Failed');
			}
		};
		// console.log(localRef.current);
		console.log(id);
		console.log(jwtUserToken.token);
		console.log('-------------');
		if (localRefSet && id && jwtUserToken.token) createRoom();
	}, [localRefSet, id, jwtUserToken.token]);

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
				<div className={styles.videoContainer}>
					{failed ? (
						<h1
							className='display-1 text-white bg-gradient-danger'
							style={{ textAlign: 'center' }}
						>
							Can't Connect You!
						</h1>
					) : null}
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
					>
						{!localRefSet ? setLocalRefSet(true) : null}
					</div>
				</div>
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
						{callFinished && otherParticipantConnected ? (
							<button
								type='submit'
								className='mt-3 btn btn-primary btn-md'
								onClick={(e) => {
									e.preventDefault();
									handleSubmit();
								}}
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
