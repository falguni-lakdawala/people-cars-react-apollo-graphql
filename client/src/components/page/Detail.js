import React from 'react'

import Title from '../layout/Title'
import PersonWithCarsPage from '../../listItems/PersonWithCarsPage'
import { useParams } from 'react-router';

const Detail = () => {

    let { id } = useParams();

    return (
    <div className='Detail'>
        <Title value="Person and its car details"/>
        <PersonWithCarsPage id={id}/>
    </div>
  )
    

};
export default Detail
