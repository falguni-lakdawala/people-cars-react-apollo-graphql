import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { List } from 'antd'

import RemovePerson from '../components/buttons/RemovePerson'
import UpdatePerson from '../components/forms/UpdatePerson'
import Car from './Car';

const getStyles = () => ({
  card: {
    width: '800px',
  }
})

const Person = props => {
  const [pid] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)
  const styles = getStyles()


  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
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
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          title={firstName +" " + lastName}
          actions={[
            <Link to={`/people/${pid}`}>Learn More</Link>,
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={pid} firstName={firstName} lastName={lastName} />
          ]}
        >
            {
              props.cars !== undefined &&
              props.cars.map(({ id, year, make, model, price, personId }) => (
              
              <List.Item key={id}>
                <Car key={id} id={id} year={year} make={make} model={model}
                  price={price} personId={personId} />
              </List.Item>
            ))}
        </Card>
      )}
    </div>
  )
}

export default Person
