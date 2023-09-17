'use client';
import { IUser } from "@/types/IUser";
import ProfilePage from "./ProfilePage";
import ClientDogPage from "./ClientDogsPage";
import { Tabs } from "flowbite-react";
import { IEstablishments } from "@/types/IEstablishments";
import { IDogs } from "@/types/IDogs";
import ClientSessionsPage from "./ClientSessionsPage";
import { ISession } from "@/types/ISession";

function ClientByIdPage(props: { client: IUser, dogs: IDogs[], establishments: IEstablishments[], clientSessions: ISession[] }) {
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <Tabs.Group
                    aria-label="Default tabs"
                    style="default"
                >
                    <Tabs.Item
                        active
                        title="Profile"
                    >
                        <ProfilePage client={props.client} />
                    </Tabs.Item>
                    <Tabs.Item
                        title="Chien(s)"
                    >
                        <ClientDogPage establishments={props.establishments} dogs={props.dogs} client={props.client} />
                    </Tabs.Item>
                    <Tabs.Item
                        title="Sessions"
                    >
                        <ClientSessionsPage clientSessions={props.clientSessions} />
                    </Tabs.Item>

                </Tabs.Group>

            </div>
        </div >
    )
};

export default ClientByIdPage;