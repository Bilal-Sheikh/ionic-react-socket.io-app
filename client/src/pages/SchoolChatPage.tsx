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
} from '@ionic/react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';

export default function SchoolChatPage() {
    const socket = io('http://localhost:3000');

    const { id } = useParams<{ id: string }>();

    const username = 'Bilal';
    const room = `school-${id}`;

    function joinRoom() {
        socket.emit('join_room', { username, room });
        localStorage.setItem(
            'data',
            JSON.stringify({ id: socket.id, role: 'STUDENT' })
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>SCHOOL CHAT {id}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent></IonContent>

            <IonFooter>
                <IonToolbar>
                    <IonItem>
                        <IonInput placeholder="Enter Message" />
                        <IonButton>Send</IonButton>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
}
