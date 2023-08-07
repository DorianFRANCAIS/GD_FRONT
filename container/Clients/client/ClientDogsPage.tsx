'use client';

import NewDogModal from "@/components/modal/NewDogModal";
import { IEstablishments } from "@/types/IEstablishments";

function ClientDogPage(props: { establishments: IEstablishments[] }) {
    return (
        <div>
            <div className="flex justify-between">
                <h1>Chien(s)</h1>
                <button data-modal-target="new-dog-modal" data-modal-toggle="new-dog-modal" className="btn text-white px-4 py-2" type="button">
                    Ajouter un chien
                </button>
            </div>
            <NewDogModal establishments={props.establishments} />
        </div>
    )
};

export default ClientDogPage;