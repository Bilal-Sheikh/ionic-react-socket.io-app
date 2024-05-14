import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SocketContext } from '../../providers/SocketContext';

export default function SchoolList() {
    const socket = useContext(SocketContext);
    const router = useIonRouter();

    const username = 'Bilal';

    function joinRoom(room: string) {
        socket?.emit('join_room', { username, room });
        // localStorage.setItem(
        //     'data',
        //     JSON.stringify({ id: socket?.id, role: 'STUDENT' })
        // );
        router.push(`/chat-room/chat?user=${username}&room=${room}`);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Schools List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    <IonItem>
                        <IonButton
                            onClick={() => {
                                joinRoom('room-1');
                            }}
                            fill="clear"
                        >
                            School 1
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            onClick={() => {
                                joinRoom('room-2');
                            }}
                            fill="clear"
                        >
                            School 2
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            onClick={() => {
                                joinRoom('room-3');
                            }}
                            fill="clear"
                        >
                            School 3
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            onClick={() => {
                                joinRoom('room-4');
                            }}
                            fill="clear"
                        >
                            School 4
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            onClick={() => {
                                joinRoom('room-5');
                            }}
                            fill="clear"
                        >
                            School 5
                        </IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}
