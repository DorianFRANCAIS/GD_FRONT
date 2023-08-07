'use client';
import { IUser } from "@/types/IUser";
import ProfilePage from "./ProfilePage";
import ClientDogPage from "./ClientDogsPage";
import { Tabs } from "flowbite-react";
import { IEstablishments } from "@/types/IEstablishments";
import { IDogs } from "@/types/IDogs";

function ClientByIdPage(props: { client: IUser, dogs: IDogs[], establishments: IEstablishments[] }) {
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
                        <ClientDogPage establishments={props.establishments} dogs={props.dogs} />
                    </Tabs.Item>
                    <Tabs.Item
                        title="Sessions"
                    >
                        <p>
                            This is
                            <span className="font-medium text-gray-800 dark:text-white">
                                Settings tab's associated content
                            </span>
                            .
                            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                            control the content visibility and styling.
                        </p>
                    </Tabs.Item>

                </Tabs.Group>

            </div>
        </div >
    )
};

export default ClientByIdPage;