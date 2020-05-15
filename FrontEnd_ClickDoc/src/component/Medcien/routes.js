
import Calendrier from '../../views/medecin/calandrier'
import DateDisponible from '../../views/medecin/listJourHeure'
import Patient from '../../views/medecin/patient';

import { MdCardTravel} from 'react-icons/md';

import { FaRegCalendarAlt, FaUserCheck} from 'react-icons/fa';



const dashboardRoutes = [

    {
        path: "/calandrier",
        name: "Calendrier",
        icon: FaRegCalendarAlt,
        component: Calendrier,
        layout: "/medecin"
    },
    {
        path: "/heure-disponibilite",
        name: "Heurs Travail",
        icon: MdCardTravel,
        component: DateDisponible,
        layout: "/medecin"
    },
    {
        path: "/patient",
        name: "Patient",
        icon: FaUserCheck,
        component: Patient,
        layout: "/medecin"
    }

];

export default dashboardRoutes;
