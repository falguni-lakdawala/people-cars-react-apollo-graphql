import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import RemoveCar from '../components/buttons/RemoveCar'
import UpdateCar from '../components/forms/UpdateCar';
import { NumberFormat } from '../NumberFormat';

const getStyles = () => ({
  innercard: {
    width: '500px',
    margin: 'auto',
    marginBottom: '10px'
  },
  innercardDiv:{
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const Car = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()


  const updateStateVariable = (variable, value) => {
    switch (variable) {
        case 'year':
            setYear(value)
            break
        case 'make':
        setMake(value)
            break
        case 'model':
            setModel(value)
            break
        case 'price':
            setPrice(value)
            break
        case 'personId':
            setPersonId(value)
            break
        default:
            break
    }
  }

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {
      editMode ? (
        <UpdateCar
            key={props.id}
            id={props.id}
            year={props.year}
            make={props.make}
            model={props.model}
            price={props.price}
            personId={props.personId}
            onButtonClick={handleButtonClick}
            updateStateVariable={updateStateVariable}
        />
      ) : (

        <Card key={id} type="inner" style={styles.innercard}
            title={make +" " + model}
            actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} year={year} make={make} model={model} 
              price={price} personId={personId} />
        ]}>

        <div style={styles.innercardDiv}>
            <div> <b> Year: </b> {year}</div>
            <div> <b> Price: </b> {NumberFormat(price)}</div>
        </div>
        
        </Card>
        )
      }
    </div>
  )
}

export default Car
