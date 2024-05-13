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
} from '@ionic/react';
import { useCallback, useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import { useIonRouter } from '@ionic/react';
import { SocketContext } from '../../providers/SocketContext';

interface Message {
    message: string;
    username: string;
    time: string;
}
export default function ChatPage() {
    const router = useIonRouter();
    const socket = useContext(SocketContext);
    if (!socket) return;

    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('user');
    const room = queryParams.get('room');

    const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
    const [outgoingMessage, setOutgoingMessage] = useState('');
    // const [typingUser, setTypingUser] = useState('');

    // setTimeout(() => {
    //     setTypingUser("");
    // }, 5000);

    const formatTime = useCallback((time: string) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
        return formattedTime;
    }, []);

    function sendMessage() {
        if (outgoingMessage.trim().length > 0) {
            console.log('in send');
            console.log(outgoingMessage);

            const currentTime = Date.now();
            socket?.emit('send_message', {
                username: username,
                room: room,
                message: outgoingMessage,
                time: currentTime,
            });
            // setTypingUser('');
            setOutgoingMessage('');
        }
    }
    function handleLeaveRoom() {
        socket?.emit('leave_room', {
            userId: socket.id,
            username: username,
            room: room,
        });
        router.push('/home');
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            if (data.username === '🤖 BOT') {
                // return toast(data.message);
                console.log(data.message);
                return (
                    <IonToast
                        message={data.message}
                        duration={3000}
                        position="top"
                    ></IonToast>
                );
            } else {
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

        // socket.on('user_typing', (data) => {
        //     setTypingUser(data.username);
        // });

        return () => {
            socket.off('recieve_message');
            // socket.off('user_typing');
        };
    }, [socket]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>SCHOOL CHAT ID - {room}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="flex-grow overflow-auto p-4 h-[500px] md:h-auto">
                    {incomingMessages.map((message, index) => (
                        <div key={index}>
                            {message.username === username ? (
                                <div className="flex items-end gap-2 justify-end pt-4">
                                    <div className="rounded-lg bg-blue-500 text-white p-2">
                                        <div className="flex justify-between text-xs pb-1">
                                            <p className="mr-2 font-bold border-b">
                                                {message.username}
                                            </p>
                                            <p>{formatTime(message.time)}</p>
                                        </div>
                                        <div className="max-w-2xl">
                                            <p className="text-sm overflow-hidden">
                                                {message.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-end gap-2 pt-4">
                                    <div className="rounded-lg bg-zinc-200 dark:bg-zinc-700 p-2">
                                        <div className="flex justify-between text-xs pb-1">
                                            <p className="mr-2 font-bold border-b">
                                                {message.username}
                                            </p>
                                            <p>{formatTime(message.time)}</p>
                                        </div>
                                        <div className="max-w-2xl">
                                            <p className="text-sm overflow-hidden">
                                                {message.message}
                                            </p>
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
                    <IonItem>
                        <IonInput
                            placeholder="Enter Message"
                            onIonChange={(e) => {
                                setOutgoingMessage(e.detail.value ?? '');
                                // isTyping();
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
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}
