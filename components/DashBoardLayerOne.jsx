import React from 'react'
import SalesStatisticOne from './child/SalesStatisticOne';
import TotalSubscriberOne from './child/TotalSubscriberOne';
import UsersOverviewOne from './child/UsersOverviewOne';
import LatestRegisteredOne from './child/LatestRegisteredOne';
import TopPerformerOne from './child/TopPerformerOne';
import TopCountries from './child/TopCountries';
import GeneratedContent from './child/GeneratedContent';
import UnitCountOne from './child/UnitCountOne';
import AmphereChart from './child/AmphereChart';

const DashBoardLayerOne = () => {

    return (
        <>
       
            <UnitCountOne />

            <section className="row gy-4 mt-1">

           
                <LatestRegisteredOne />
                <TopPerformerOne />
            

            </section>
        </>


    )
}

export default DashBoardLayerOne