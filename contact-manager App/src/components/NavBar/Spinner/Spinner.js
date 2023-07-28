import React from 'react';
import spinnerImg from '../../../assets/img/loading.gif';

let Spinner = () => {
	return (
		<React.Fragment>
				<img src={spinnerImg} alt="" className="d-block m-auto" style={{width : '200px'}}/>
		</React.Fragment>
	)
};

export default Spinner;


