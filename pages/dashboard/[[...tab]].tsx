import { useRouter } from "next/router"
import Link from 'next/link';

const Dashboard = () => {

    const router = useRouter();
    const { query } = router;

    const displayComponent = () => {
        switch (query.tab && query.tab[0] && !query.tab[1]) {
          case "":
            return;
          case "":
            return;
          case "":
            return;
          case "":
            return;
          case "":
            return;
          default:
            return;
        }
    }

  return (
    <div>
        Ici se trouve la page dashboard
    </div>
  )
}

export default Dashboard