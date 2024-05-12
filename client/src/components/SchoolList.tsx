import { IonButton, IonItem, IonList } from '@ionic/react';
import { Link } from 'react-router-dom';

export default function SchoolList() {
    return (
        <div>
            <h1>Schools List:</h1>

            <IonList>
                <IonItem>
                    <IonButton fill="clear">
                        <Link to={'/school-chat/1'}>School 1</Link>
                    </IonButton>
                </IonItem>
                <IonItem>
                    <IonButton fill="clear">
                        <Link to={'/school-chat/2'}>School 2</Link>
                    </IonButton>
                </IonItem>
                <IonItem>
                    <IonButton fill="clear">
                        <Link to={'/school-chat/3'}>School 3</Link>
                    </IonButton>
                </IonItem>
                <IonItem>
                    <IonButton fill="clear">
                        <Link to={'/school-chat/4'}>School 4</Link>
                    </IonButton>
                </IonItem>
                <IonItem>
                    <IonButton fill="clear">
                        <Link to={'/school-chat/5'}>School 5</Link>
                    </IonButton>
                </IonItem>
            </IonList>
        </div>
    );
}
