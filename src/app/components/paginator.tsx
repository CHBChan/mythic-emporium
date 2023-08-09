import React from "react";

import { Paginator as Pagin } from "primereact/paginator"

import 'primereact/resources/themes/lara-light-indigo/theme.css';

const Paginator : React.FC = () => {
    const [first, setFirst] = React.useState<number>(0);
    const [rows, setRows] = React.useState<number>(7);
    
    return (
        <Pagin className='' first={2} rows={2} totalRecords={62} />
    )
};

export default Paginator;