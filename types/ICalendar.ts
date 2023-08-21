import { IActivity } from "./IActivity";
import { IEstablishments } from "./IEstablishments";
import { IUser } from "./IUser";

export interface IEventSession {
    _id: string, // Identifiant unique de l'événement (optionnel)
    title: string, // Titre ou texte de l'événement
    start: string, // Date et heure de début de l'événement
    end: string, // Date et heure de fin de l'événement
    educator: IUser;
    activity: IActivity;
    establishment: IEstablishments;
    status: "Pending" | "Confirmed" | "Cancelled";
    maximumCapacity: number;
    report: string;
    beginDate: string;
    endDate: string;
    allDay?: boolean, // Indique si l'événement dure toute la journée (optionnel)
    color: string, // Couleur de fond et de border (optionnel)
    backgroundColor?: string, // Couleur de fond de l'événement (optionnel)
    borderColor?: string, // Couleur de la bordure de l'événement (optionnel)
    textColor?: string, // Couleur du texte de l'événement (optionnel)
    className?: string | string[], // Classe(s) CSS supplémentaire(s) à appliquer à l'événement (optionnel)
    editable?: boolean, // Indique si l'événement est éditable (optionnel)
    startEditable?: boolean, // Indique si la date et l'heure de début de l'événement sont éditables (optionnel)
    durationEditable?: boolean, // Indique si la durée de l'événement est éditable (optionnel)
    constraint?: any, // Contraintes qui limitent le positionnement de l'événement (optionnel)
    overlap?: boolean // Indique si l'événement peut se chevaucher avec d'autres événements (optionnel)
}