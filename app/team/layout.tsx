import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="mx-8">{children}</div>
}