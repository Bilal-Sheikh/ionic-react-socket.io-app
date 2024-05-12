import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import SchoolList from '../components/SchoolList';
import './Home.css';

export default function Home() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>School Chat App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <SchoolList />
            </IonContent>
        </IonPage>
    );
}
