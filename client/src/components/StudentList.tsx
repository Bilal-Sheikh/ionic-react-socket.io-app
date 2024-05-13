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
import { SocketContext } from '../../providers/SocketContext';

export default function StudentList() {
    const socket = useContext(SocketContext);
    const router = useIonRouter();

    const username = 'School';

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
                    <IonTitle>Students List</IonTitle>
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
                            Student 1
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton
                            onClick={() => {
                                joinRoom('room-2');
                            }}
                            fill="clear"
                        >
                            Student 2
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton fill="clear">
                            <Link to={'/chat-room/3'}>Student 3</Link>
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton fill="clear">
                            <Link to={'/chat-room/4'}>Student 4</Link>
                        </IonButton>
                    </IonItem>

                    <IonItem>
                        <IonButton fill="clear">
                            <Link to={'/chat-room/5'}>Student 5</Link>
                        </IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}
