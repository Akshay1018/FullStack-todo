
import React, { useContext } from 'react';

import AlertContext from '../context/alert/AlertContext';


function Alert() {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
            <div key={alert.id} className="alertDiv">
                <p style={{ color: alert.type }}> {alert.msg}</p>
            </div>
        ))
    )
}

export default Alert;