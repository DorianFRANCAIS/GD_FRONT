import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="m-4 px-12">{children}</div>
}