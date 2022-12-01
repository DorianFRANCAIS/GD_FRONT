import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const getSWRData = (API_URL: string | undefined, path: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { locale } = router;
    const token = Cookie.get('token');

    const settings = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }

    async function fetcher(path : string) {
        const res = await fetch(API_URL + path, settings);

        if (!res.ok) throw res

        const json = await res.json();

        return json;
    }

    return fetcher;
}

export default getSWRData;