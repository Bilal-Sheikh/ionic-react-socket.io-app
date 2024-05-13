import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import SchoolList from '../components/SchoolList';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const router = useIonRouter();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>School Chat App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton
                    onClick={() => {
                        router.push('/student');
                    }}
                >
                    Student
                </IonButton>
                <IonButton
                    onClick={() => {
                        router.push('/school');
                    }}
                >
                    School
                </IonButton>
            </IonContent>
        </IonPage>
    );
}
