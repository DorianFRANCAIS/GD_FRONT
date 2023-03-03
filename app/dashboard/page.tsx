import Link from "next/link";

export default function Page() {
    return (
        <div>
            <Link href={`/dashboard/${id}`}>aller à dashboard / id</Link>
        </div>
    )
}