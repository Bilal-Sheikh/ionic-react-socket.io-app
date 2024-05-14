import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonBackButton,
	IonButtons,
	IonPage,
	IonFooter,
	IonInput,
	IonItem,
	IonButton,
	IonToast,
	IonFab,
	IonFabButton,
	IonFabList,
	IonIcon,
} from '@ionic/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { SocketContext } from '../../providers/SocketContext';
import './ChatPage.css';
import { colorPalette, document, globe, language } from 'ionicons/icons';
import { GoogleTranslatorTokenFree } from '@translate-tools/core/translators/GoogleTranslator';

interface Message {
	message: string;
	username: string;
	time: string;
}
enum Language {
	ENGLISH = 'en',
	ARABIC = 'ar',
}

export default function ChatPage() {
	const translator = new GoogleTranslatorTokenFree();
	const router = useIonRouter();
	const socket = useContext(SocketContext);
	if (!socket) return;

	const queryParams = new URLSearchParams(window.location.search);
	const username = queryParams.get('user');
	const room = queryParams.get('room');

	const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
	const [outgoingMessage, setOutgoingMessage] = useState('');
	const [typingUser, setTypingUser] = useState('');
	const [selectLanguage, setSelectLanguage] = useState(Language.ENGLISH);

	// console.log('LANGUAGE', selectLanguage);

	let timeout;
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		setTypingUser('');
	}, 5000);

	const formatTime = useCallback((time: string) => {
		const date = new Date(time);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? 'pm' : 'am';
		const formattedHours = hours % 12 || 12;
		const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
		return formattedTime;
	}, []);
	const isTyping = useCallback(() => {
		socket?.emit('is_typing', {
			username: username,
			room: room,
		});
	}, []);

	const sendMessage = async () => {
		if (outgoingMessage.trim().length > 0) {
			const currentTime = Date.now();
			socket?.emit('send_message', {
				username: username,
				room: room,
				message: outgoingMessage,
				time: currentTime,
			});
			setTypingUser('');
			setOutgoingMessage('');
		}
	};
	function handleLeaveRoom() {
		socket?.emit('leave_room', {
			userId: socket.id,
			username: username,
			room: room,
		});
		router.goBack();
	}

	useEffect(() => {
		socket.on('recieve_message', (data) => {
			if (data.username === '🤖 BOT') {
				console.log(data.message);
				return <IonToast message={data.message} duration={3000} position="top"></IonToast>;
			} else if (username === 'School') {
				console.log('inside else if cause role is SCHOOL dwag');

				translator.translate(data.message, 'ar', 'en').then((translatedMessage) => {
					setIncomingMessages((prevMesaages) => [
						...prevMesaages,
						{
							message: translatedMessage,
							username: data.username,
							time: data.time,
						},
					]);
				});
			} else {
				console.log('inside else, normal stuff');

				setIncomingMessages((prevMesaages) => [
					...prevMesaages,
					{
						message: data.message,
						username: data.username,
						time: data.time,
					},
				]);
			}
		});

		socket.on('user_typing', (data) => {
			setTypingUser(data.username);
		});

		return () => {
			socket.off('recieve_message');
			socket.off('user_typing');
			// clearTimeout(timeout);
		};
	}, [socket]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton
						slot="start"
						onClick={() => {
							handleLeaveRoom();
						}}
					>
						Back
					</IonButton>
					<IonTitle>{room}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className="ion-padding">
				<IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
					<IonFabButton>
						<IonIcon icon={language}></IonIcon>
					</IonFabButton>
					<IonFabList side="bottom">
						<IonFabButton
							onClick={() => {
								setSelectLanguage(Language.ENGLISH);
							}}
						>
							En
						</IonFabButton>
						<IonFabButton
							onClick={() => {
								setSelectLanguage(Language.ARABIC);
							}}
						>
							Ar
						</IonFabButton>
					</IonFabList>
				</IonFab>

				<div className={`flex-grow overflow-auto p-4 h-[500px] md:h-auto ${selectLanguage === Language.ARABIC ? 'rtl' : ''}`}>
					{incomingMessages.map((message, index) => (
						<div key={index}>
							{message.username === username ? (
								<div className="flex items-end gap-2 justify-end pt-4">
									<div className={`rounded-lg bg-blue-500 text-white p-2 ${selectLanguage === Language.ARABIC ? 'rtl' : ''}`}>
										<div className="flex justify-between text-xs pb-1">
											<p className="mr-2 font-bold border-b">{message.username}</p>
											<p>{formatTime(message.time)}</p>
										</div>
										<div className="max-w-2xl">
											<p className="text-sm overflow-hidden">{message.message}</p>
										</div>
									</div>
								</div>
							) : (
								<div className="flex items-end gap-2 pt-4">
									<div className={`rounded-lg bg-zinc-200 p-2 ${selectLanguage === Language.ARABIC ? 'rtl' : ''}`}>
										<div className="flex justify-between text-xs pb-1">
											<p className="mr-2 font-bold border-b">{message.username}</p>
											<p>{formatTime(message.time)}</p>
										</div>
										<div className="max-w-2xl">
											<p className="text-sm overflow-hidden">{message.message}</p>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</IonContent>

			<IonFooter>
				<IonToolbar>
					<IonItem className={`${selectLanguage === Language.ARABIC ? 'rtl' : ''}`}>
						<IonInput
							placeholder="Enter Message"
							onIonInput={(e) => {
								setOutgoingMessage(e.detail.value ?? '');
								isTyping();
							}}
							value={outgoingMessage}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									sendMessage();
								}
							}}
						/>
						<IonButton
							onClick={() => {
								sendMessage();
							}}
						>
							Send
						</IonButton>
					</IonItem>
					<IonItem>{typingUser && <p className="text-base mt-2 italic text-white">{typingUser} is typing...</p>}</IonItem>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
}
