import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import OrgChart from '../components/chart/orgChart';
import ServiceOptions from '../components/app/autocomplete';


function Home() {
    const [getOrgChartData, setOrgChartData] = useState([]);
    const [getServiceValues, setServiceValues] = useState([]);
    const [fetchedFromService, setFetchedFromService] = useState('N');
    const [fetched, setFetched] = useState(false);
    const orgSVGRef = useRef();

    useEffect(() => {
        if (fetched === false) {
            trackPromise(getChartData());
            getServicesValues();
        }
    }, [fetched]);

    const getChartData = async () => {
        try {
            
            const [response] = await Promise.all([
                axios.get('/api/getChartData/'),
            ]);
            setFetchedFromService('N');
            setOrgChartData(response.data);
            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    const getServicesValues = async () => {
        try {
            const [response] = await Promise.all([
                axios.get('/api/getServicesValues/'),
            ]);
            setServiceValues(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getTimeSheetDefaulters = async (selectedServiceValue, selectedEmpValue, weekBitVal) => {
        try {
            const [response] = await Promise.all([
                axios.post('/api/getTimeSheetDefaultersList/', {
                    serviceValue: selectedServiceValue,
                    weekValue: weekBitVal,
                    empValue: selectedEmpValue
                })
            ]);
            setFetchedFromService('Y');
            setOrgChartData(response.data);
            setFetched(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            <div className="PatientsDB">                
                <ServiceOptions
                    getServiceValues={getServiceValues}
                    getOrgChartData={getOrgChartData}
                    getTimeSheetDefaulters={getTimeSheetDefaulters}
                />
                {fetched &&
                    <OrgChart
                        orgSVGRef={orgSVGRef}
                        getOrgChartData={getOrgChartData}
                        fetchedFromService={fetchedFromService}
                    />
                }
            </div>
        </React.Fragment>
    );
}

export default Home;