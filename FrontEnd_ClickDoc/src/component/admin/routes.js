 
import Medecin from '../../views/admin/listMedecin'
import Specialite from '../../views/admin/listePatient.js'
import Patient from '../../views/admin/listePatient'


import { FaUserMd, FaUserCheck, FaFileSignature} from 'react-icons/fa';



const dashboardRoutes = [

    {
        path: "/medecins",
        name: "Medecin",
        icon: FaUserMd,
        component: Medecin,
        layout: "/admin"
    },
    {
        path: "/specialite",
        name: "Spécialité",
        icon: FaFileSignature,
        component: Specialite,
        layout: "/admin"
    },
    {
        path: "/patient",
        name: "patient",
        icon: FaUserCheck,
        component: Patient,
        layout: "/admin"
    }
    
];

export default dashboardRoutes;
