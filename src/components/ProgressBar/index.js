import React from 'react';

function ProgressBar(props) {

    return (
        <>
        <div className='percentage'>
            <div className='progressPercent'>Question:{props.stateId+1}/10</div>
            <div className='progressPercent'>Progression:{(props.stateId+1)*10}%</div>
        </div>
        <div className='progressBar'>
            <div className='progressBarChange' style={{width:(props.stateId+1)*10+'%'}}>

            </div>
        </div>
        </>
    );
}

export default React.memo(ProgressBar);